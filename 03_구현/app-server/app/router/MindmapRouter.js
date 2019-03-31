var express = require('express');
var Authorization = require('../authorization');
var Parser = require('../parser');
var Date = require('../date');
var Logger = require('../Logger');

var MindmapRouter = {
    path: '/api/mindmaps',
    mindmap: require('../model/mindmap'),
    idea: require('../model/idea'),
    router: express.Router()
}

// create
MindmapRouter.router.route('/').post(function (req, res) {
    Logger.log('SERVER', 'A mindmap creates requested.');
    if (!Authorization.isAuthorized(req))
        return;

    req.body.ctime = Date.getDate();
    req.body.mtime = Date.getDate();

    MindmapRouter.mindmap.create(req.body)
        .then((mindmap) => {
            MindmapRouter.idea.create({ 'content': '주 아이디어', 'creator': req.body.owner, 'width': 102.75, 'height': 46, 'mindmap_id': mindmap._id })
                .then((idea) => res.status(201).send(mindmap))
                .catch((err) => res.status(500).send(err));
        })
        .catch((err) => res.status(500).send(err));

});

// update
MindmapRouter.router.route('/:_id').put(function (req, res) {
    Logger.log('SERVER', 'A mindmap updates requested.');
    if (!Authorization.isAuthorized(req))
        return;

    req.body.mtime = Date.getDate();

    MindmapRouter.mindmap.updateByFilter(req.params, req.body)
        .then((mindmap) => res.status(200).send(mindmap))
        .catch((err) => res.status(500).send(err));
});

// delete
MindmapRouter.router.route('/:_id').delete(function (req, res) {
    Logger.log('SERVER', 'A mindmap deletes requested.');
    if (!Authorization.isAuthorized(req))
        return;

    MindmapRouter.mindmap.deleteByFilter(req.params)
        .then((mindmap) => res.status(200).send(mindmap))
        .catch((err) => res.status(500).send(err));
});

// read specific mindmaps
MindmapRouter.router.route('/').get(function (req, res) {
    Logger.log('SERVER', 'Specific mindmaps read requested.');
    if (!Authorization.isAuthorized(req))
        return;

    var query = Parser.parseQuery(req.query);
    var field = Parser.parseField(req.query);

    MindmapRouter.mindmap.findByFilter(query, field)
        .then((mindmaps) => res.status(200).send(mindmaps))
        .catch((err) => res.status(500).send(err));
});

module.exports = MindmapRouter;