var express = require('express');
var multer = require('multer');
var Authorization = require('../authorization');
var Parser = require('../parser');
var Date = require('../date');
var Logger = require('../Logger');

// 형태소분석 API 용
var openApiURL = 'http://aiopen.etri.re.kr:8000/WiseNLU';
var access_key = '695f13bf-e473-4175-a225-e88fb55b543b';
var analysisCode = 'dparse'; // 형태소 분석 : morp 개체 분석 : ner

// image upload
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, Date.getImageDate() + '-' + file.originalname)
    }
});
var upload = multer({ storage: storage });

var IdeaRouter = {
    path: '/api/ideas',
    idea: require('../model/idea'),
    branch: require('../model/branch'),
    router: express.Router()
}

// create
IdeaRouter.router.route('/').post(function (req, res) {
    Logger.log('SERVER', 'A idea creates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    IdeaRouter.idea.create(req.body)
        .then((idea) => res.status(201).send(idea))
        .catch((err) => res.status(500).send(err));
});

// update
IdeaRouter.router.route('/:_id').put(function (req, res) {
    Logger.log('SERVER', 'A idea updates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    if (req.body.content != req.body.keywords[0]) {
        analysis(req.body.content, function (result) {
            if (result != -1) req.body.keywords = result; //형태소 분석한거 집어넣기
            IdeaRouter.idea.updateByFilter(req.params, req.body)
                .then((idea) => res.status(200).send(idea))
                .catch((err) => res.status(500).send(err));
        });
    }
    else {
        IdeaRouter.idea.updateByFilter(req.params, req.body)
            .then((idea) => res.status(200).send(idea))
            .catch((err) => res.status(500).send(err));
    }
});

// delete
IdeaRouter.router.route('/:_id').delete(function (req, res) {
    Logger.log('SERVER', 'A idea deletes requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    deleteIdea(req.params, res);
});

// read specific ideas
IdeaRouter.router.route('/').get(function (req, res) {
    Logger.log('SERVER', 'Specific ideas read requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    var query = Parser.parseQuery(req.query);
    var field = Parser.parseField(req.query);

    query.isDeleted = false;

    IdeaRouter.idea.findByFilter(query, field)
        .then((ideas) => res.status(200).send(ideas))
        .catch((err) => res.status(500).send(err));
});

IdeaRouter.router.post('/upload/:_id', upload.single('image'), function (req, res, next) {
    Logger.log('SERVER', 'idea image upload requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    IdeaRouter.idea.updateByFilter(req.params, { image: 'http://218.233.209.78:8000/api/ideas/image/' + req.file.filename })
        .then(() => res.status(200).send('http://218.233.209.78:8000/api/ideas/image/' + req.file.filename))
        .catch((err) => res.status(500).send(err));
});

// get recommend idea
IdeaRouter.router.route('/recommend').get(function (req, res) {
    // 추천 알고리즘
    Logger.log('SERVER', 'Idea recommend requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }
    var query = Parser.parseQuery(req.query);
    console.log(query._id);

    IdeaRouter.idea.findByFilter({ '_id': query._id }) // id를 바탕으로 해당 아이디어의 키워드를 가져옴
        .then((idea) => {
            console.log(idea);
            //IdeaRouter.idea.findByFilter({ 'keywords': { $in: idea[0].keywords } }, { _id: 1 }) // 키워드가 일치하는 다른 아이디어의 _id를 가져옴
            IdeaRouter.idea.aggregate([{ $match: { 'keywords': { $in: idea[0].keywords } } }, { $project: { _id: 1 } }])
                .then((ideas) => {
                    let idList = Array(0);
                    ideas.forEach(idea => {
                        if (idea._id != query._id) idList.push(idea._id)
                    })
                    console.log(ideas);
                    console.log(idList);
                    IdeaRouter.branch.aggregate([{ $match: { 'source': { $in: idList } } }, { $project: { destination: 1, _id: 0 } }]) // 해당 id의 자식 idea를 찾음
                        .then((destinations) => {
                            let dstList = Array(0);
                            destinations.forEach(destination => dstList.push(destination.destination))
                            IdeaRouter.idea.aggregate([{ $match: { '_id': { $in: dstList }, 'content': { $ne: " " } } }, { $group: { _id: "$content", count: { $sum: 1 } } }, { $sort: { count: -1 } }])
                                .then((recommend) => {
                                    console.log(recommend);
                                    res.status(200).send(recommend);
                                })
                                .catch((err) => console.log(err));
                        })
                        .catch((err) => console.log(err));

                })
                .catch((err) => console.log(err));

        })
        .catch((err) => console.log(err));
});

// delete all chianed ideas and branches
var deleteIdea = function (query, res) {
    // set idea 'isDeleted' true
    IdeaRouter.idea.updateByFilter(query, { 'isDeleted': true })
        .then((idea) => {
            // find idea which branch's destination idea 
            IdeaRouter.branch.findByFilter({ 'destination': query._id })
                .then((branches) => {
                    branches.forEach(branch => {
                        // set branch 'isDeleted' true
                        IdeaRouter.branch.updateByFilter({ '_id': branch._id }, { 'isDeleted': true })
                            .then((branch) => {
                                // find idea which branch's source idea
                                IdeaRouter.branch.findByFilter({ 'source': query._id })
                                    .then((branches) => {
                                        res.status(200).send();

                                        // recursive for child ideas
                                        branches.forEach(branch => {
                                            deleteIdea({ '_id': branch.destination }, res);
                                        });
                                    })
                                    .catch((err) => res.status(500).send(err));
                            })
                            .catch((err) => res.status(500).send(err));
                    });
                })
                .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));
}

analysis = function (content, analysisContent) {
    var requestJson = {
        'access_key': access_key,
        'argument': {
            'text': content,
            'analysis_code': analysisCode
        }
    };
    var request = require('request');
    var options = {
        url: openApiURL,
        body: JSON.stringify(requestJson),
        headers: { 'Content-Type': 'application/json; charset=UTF-8' }
    };

    request.post(options, function (error, response, body) {
        var json = JSON.parse(body);
        if (json.result == -1) {
            return analysisContent(json.result);
        }
        var obj = json.return_object.sentence;
        var items = Array(0);
        items.push(content);
        if (obj[0].morp.length != 1) {
            for (var i = 0; i < obj[0].morp.length; i++) {
                if(obj[0].morp[i].type == "NNG" || obj[0].morp[i].type == "NNP" || obj[0].morp[i].type == "NNB")
                    items.push(obj[0].morp[i].lemma);
            }
        }

        analysisContent(items);
    });
}

module.exports = IdeaRouter;

