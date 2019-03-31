const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schemes
const Comment = new Schema({
    content: { type: String, required: true },
    ctime: { type: Date, required: true },
    mindmap_id: { type: Schema.Types.ObjectId, required: true },
    writer: { type: String, required: true }
}, {
        versionKey: false
    });

Comment.statics.create = function (_comment) {
    const comment = new this(_comment);
    return comment.save();
};

Comment.statics.updateByFilter = function (filter, _comment) {
    return this.findOneAndUpdate(filter, _comment);
};

Comment.statics.deleteByFilter = function (filter) {
    return this.remove(filter);
};

Comment.statics.findByFilter = function (filter, field) {
    return this.find(filter, field);
};

// create model & export
module.exports = mongoose.model('comment', Comment);