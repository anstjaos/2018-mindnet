const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var Logger = require('./Logger');

var app = express();

// connect mongoDB
mongoose.connect('mongodb://localhost/mindnet')
    .then(function () {
        Logger.log('SERVER', 'Successfully connected to mongodb');
    })
    .catch(function (error) {
        console.error(error);
    });

// open http server
var port = process.env.port || 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'content-type');
    next();
});

var MemberRouter = require('./router/MemberRouter');
var MindmapRouter = require('./router/MindmapRouter');
var IdeaRouter = require('./router/IdeaRouter');
var BranchRouter = require('./router/BranchRouter');
var CaptionRouter = require('./router/CaptionRouter');
var CommentRouter = require('./router/CommentRouter');


app.use(MemberRouter.path, MemberRouter.router);
app.use(MindmapRouter.path, MindmapRouter.router);
app.use(IdeaRouter.path, IdeaRouter.router);
app.use(BranchRouter.path, BranchRouter.router);
app.use(CaptionRouter.path, CaptionRouter.router);
app.use(CommentRouter.path, CommentRouter.router);

// image load
app.use('/api/ideas/image', express.static('uploads'));

app.listen(port, function () {
    Logger.log('SERVER', 'Server is started. Port : ' + port);
});