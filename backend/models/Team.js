const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Team = new Schema({
    name: {
        type: String,
        required: true
    },
    project:{
        type: Schema.Types.ObjectId,
        ref:"Project",
        default: null
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref:"User",
        default: []
    },
    manager:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    created_at: {
        type: Date,
        default: Date.now
    }


});

module.exports = mongoose.model('Team', Team);
