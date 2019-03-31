const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schemes
const Member = new Schema({
    id: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {
        versionKey: false
    });

Member.statics.create = function (_member) {
    const member = new this(_member);
    return member.save();
};

Member.statics.updateByFilter = function (filter, _member) {
    return this.findOneAndUpdate(filter, _member);
};

Member.statics.deleteByFilter = function (filter) {
    return this.remove(filter);
};

Member.statics.findByFilter = function (filter, field) {
    return this.find(filter, field);
};

// create model & export
module.exports = mongoose.model('member', Member);