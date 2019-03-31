var express = require('express');
var Authorization = require('../authorization');
var Parser = require('../parser');
var Date = require('../date');
var Logger = require('../Logger');

var CaptionRouter = {
    path: '/api/captions',
    caption: require('../model/caption'),
    router: express.Router()
}

// create
CaptionRouter.router.route('/').post(function (req, res) {
    Logger.log('SERVER', 'A caption creates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }
    
    req.body.ctime = Date.getDate();

    CaptionRouter.caption.create(req.body)
        .then((caption) => res.status(201).send(caption))
        .catch((err) => res.status(500).send(err));
});

// update
CaptionRouter.router.route('/:_id').put(function (req, res) {
    Logger.log('SERVER', 'A caption updates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    CaptionRouter.caption.updateByFilter(req.params, req.body)
        .then((caption) => res.status(200).send(caption))
        .catch((err) => res.status(500).send(err));
});

// delete
CaptionRouter.router.route('/:_id').delete(function (req, res) {
    Logger.log('SERVER', 'A caption deletes requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    CaptionRouter.caption.deleteByFilter(req.params)
        .then((caption) => res.status(200).send(caption))
        .catch((err) => res.status(500).send(err));
});

// read specific captions
CaptionRouter.router.route('/').get(function (req, res) {
    Logger.log('SERVER', 'Specific captions read requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }
    
    var query = Parser.parseQuery(req.query);
    var field = Parser.parseField(req.query);
    
    CaptionRouter.caption.findByFilter(query, field)
        .then((captions) => res.status(200).send(captions))
        .catch((err) => res.status(500).send(err));
});

module.exports = CaptionRouter;