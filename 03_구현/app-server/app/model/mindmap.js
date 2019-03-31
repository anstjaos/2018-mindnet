const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schemes
const Mindmap = new Schema({
    name: { type: String, required: true },
    scope: { type: Boolean, required: true },
    ctime: { type: Date, required: true },
    mtime: { type: Date, required: true },
    owner: { type: String, required: true },
    editors: { type: [String], required: true }
}, {
    versionKey: false
});

Mindmap.statics.create = function (_mindmap) {
    const mindmap = new this(_mindmap);
    return mindmap.save();
};

Mindmap.statics.updateByFilter = function (filter, _mindmap) {
    return this.findOneAndUpdate(filter, _mindmap);
};

Mindmap.statics.deleteByFilter = function (filter) {
    return this.remove(filter);
};

Mindmap.statics.findByFilter = function (filter, field) {
    return this.find(filter, field).sort({ mtime: -1 });
};

// create model & export
module.exports = mongoose.model('mindmap', Mindmap);