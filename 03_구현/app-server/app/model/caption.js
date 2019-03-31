const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schemes
const Caption = new Schema({
    content: { type: String, required: true },
    ctime: { type: Date, required: true },
    idea_id: { type: Schema.Types.ObjectId, required: true },
    writer: { type: String, required: true }
}, {
        versionKey: false
    });

Caption.statics.create = function (_caption) {
    const caption = new this(_caption);
    return caption.save();
};

Caption.statics.updateByFilter = function (filter, _caption) {
    return this.findOneAndUpdate(filter, _caption);
};

Caption.statics.deleteByFilter = function (filter) {
    return this.remove(filter);
};

Caption.statics.findByFilter = function (filter, field) {
    return this.find(filter, field);
};

// create model & export
module.exports = mongoose.model('caption', Caption);