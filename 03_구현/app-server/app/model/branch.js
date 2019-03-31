const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// define schemes
const Branch = new Schema({
    source: { type: Schema.Types.ObjectId, required: true },
    destination: { type: Schema.Types.ObjectId, required: true },
    P1: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    P2: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    C1: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    C2: {
        x: { type: Number, required: true },
        y: { type: Number, required: true }
    },
    style: { type: String, required: true, default: ' '},
    color: { type: String, required: true, default: 'black' },
    mindmap_id: { type: Schema.Types.ObjectId, required: true },
    isDeleted: { type: Boolean, required: true, default: false }
}, {
        versionKey: false
    });

Branch.statics.create = function (_branch) {
    const branch = new this(_branch);
    return branch.save();
};

Branch.statics.updateByFilter = function (filter, _branch) {
    return this.findOneAndUpdate(filter, _branch);
};

Branch.statics.deleteByFilter = function (filter) {
    return this.remove(filter);
};

Branch.statics.findByFilter = function (filter, field) {
    return this.find(filter, field);
};

// create model & export
module.exports = mongoose.model('branch', Branch);