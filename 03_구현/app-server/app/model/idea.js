const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schemes
const Idea = new Schema({
    content: { type: String, default: ' ' },
    keywords: { type: [String] },
    image: { type: String, default: null },
    video: { type: String, default: null },
    font: { type: String, required: true, default: 'batang' },
    fsize: { type: Number, required: true, default: 12 },
    fcolor: { type: String, required: true, default: '#000000' },
    bold: { type: String, required: true, default: 'normal' },
    tilt: { type: String, required: true, default: 'normal' },
    crossline: { type: String, required: true, default: 'none' },
    bgstyle: { type: Number, required: true, default: 1 },
    bgcolor: { type: String, required: true, default: '#ffffff' },
    position: {
        x: { type: Number, required: true, default: 5000 },
        y: { type: Number, required: true, default: 3000 }
    },
    width: { type: Number, required: true, default: 52 },
    height: { type: Number, required: true, default: 46 },
    creator: { type: String, required: true },
    mindmap_id: { type: Schema.Types.ObjectId, required: true },
    isDeleted: { type: Boolean, required: true, default: false }
}, {
        versionKey: false
    });

Idea.statics.create = function (_idea) {
    const idea = new this(_idea);
    return idea.save();
};

Idea.statics.updateByFilter = function (filter, _idea) {
    return this.findOneAndUpdate(filter, _idea);
};

Idea.statics.deleteByFilter = function (filter) {
    return this.remove(filter);
};

Idea.statics.findByFilter = function (filter, field) {
    return this.find(filter, field);
};

// create model & export
module.exports = mongoose.model('idea', Idea);