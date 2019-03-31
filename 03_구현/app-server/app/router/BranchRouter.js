var express = require('express');
var Authorization = require('../authorization');
var Parser = require('../parser');
var Logger = require('../Logger');

var BranchRouter = {
    path: '/api/branches',
    branch: require('../model/branch'),
    router: express.Router()
}

// create
BranchRouter.router.route('/').post(function (req, res) {
    Logger.log('SERVER', 'A branch creates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    BranchRouter.branch.create(req.body)
        .then((branch) => res.status(201).send(branch))
        .catch((err) => res.status(500).send(err));
});

// update
BranchRouter.router.route('/:_id').put(function (req, res) {
    Logger.log('SERVER', 'A branch updates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    BranchRouter.branch.updateByFilter(req.params, req.body)
        .then((branch) => res.status(200).send(branch))
        .catch((err) => res.status(500).send(err));
});

// delete
BranchRouter.router.route('/:_id').delete(function (req, res) {
    Logger.log('SERVER', 'A branch deletes requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    BranchRouter.branch.deleteByFilter(req.params)
        .then((branch) => res.status(200).send(branch))
        .catch((err) => res.status(500).send(err));
});

// read specific branches
BranchRouter.router.route('/').get(function (req, res) {
    Logger.log('SERVER', 'Specific branches read requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    var query = Parser.parseQuery(req.query);
    var field = Parser.parseField(req.query);

    query.isDeleted = false;

    BranchRouter.branch.findByFilter(query, field)
        .then((branches) => res.status(200).send(branches))
        .catch((err) => res.status(500).send(err));
});

module.exports = BranchRouter;