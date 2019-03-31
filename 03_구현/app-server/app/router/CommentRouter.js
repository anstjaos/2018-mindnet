var express = require('express');
var Authorization = require('../authorization');
var Parser = require('../parser');
var Date = require('../date');
var Logger = require('../Logger');

var CommentRouter = {
    path: '/api/comments',
    comment: require('../model/comment'),
    router: express.Router()
}

// create
CommentRouter.router.route('/').post(function (req, res) {
    Logger.log('SERVER', 'A comment creates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    req.body.ctime = Date.getDate();

    CommentRouter.comment.create(req.body)
        .then((comment) => res.status(201).send(comment))
        .catch((err) => res.status(500).send(err));
});

// update
CommentRouter.router.route('/:_id').put(function (req, res) {
    Logger.log('SERVER', 'A comment updates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    CommentRouter.comment.updateByFilter(req.params, req.body)
        .then((comment) => res.status(200).send(comment))
        .catch((err) => res.status(500).send(err));
});

// delete
CommentRouter.router.route('/:_id').delete(function (req, res) {
    Logger.log('SERVER', 'A comment deletes requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    CommentRouter.comment.deleteByFilter(req.params)
        .then((comment) => res.status(200).send(comment))
        .catch((err) => res.status(500).send(err));
});

// read specific comments
CommentRouter.router.route('/').get(function (req, res) {
    Logger.log('SERVER', 'Specific comments read requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    var query = Parser.parseQuery(req.query);
    var field = Parser.parseField(req.query);

    CommentRouter.comment.findByFilter(query, field)
        .then((comments) => res.status(200).send(comments))
        .catch((err) => res.status(500).send(err));
});

module.exports = CommentRouter;