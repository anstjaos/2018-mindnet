var express = require('express');
var Authorization = require('../authorization');
var Parser = require('../parser');
var Logger = require('../Logger');

var key = 'gooddonghwan';

var MemberRouter = {
    path: '/api/members',
    member: require('../model/member'),
    router: express.Router()
}

// create
MemberRouter.router.route('/').post(function (req, res) {
    Logger.log('SERVER', 'A member creates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    MemberRouter.member.create(req.body)
        .then((member) => res.status(201).send(member))
        .catch((err) => res.status(202).send(err));
});

// update
MemberRouter.router.route('/:id').put(function (req, res) {
    Logger.log('SERVER', 'A member updates requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    MemberRouter.member.updateByFilter(req.params, req.body)
        .then((member) => res.status(200).send(member))
        .catch((err) => res.status(500).send(err));
});

// delete
MemberRouter.router.route('/:id').delete(function (req, res) {
    Logger.log('SERVER', 'A member deletes requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    MemberRouter.member.deleteByFilter(req.params)
        .then((member) => res.status(200).send(member))
        .catch((err) => res.status(500).send(err));
});

// read specific members
MemberRouter.router.route('/').get(function (req, res) {
    Logger.log('SERVER', 'Specific members read requested.');
    if (!Authorization.isAuthorized(req)) {
        res.status(401).send();
        return;
    }

    var query = Parser.parseQuery(req.query);
    var field = Parser.parseField(req.query);

    MemberRouter.member.findByFilter(query, field)
        .then((members) => res.status(200).send(members))
        .catch((err) => res.status(500).send(err));
});

module.exports = MemberRouter;