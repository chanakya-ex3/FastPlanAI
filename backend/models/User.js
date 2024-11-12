const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    skills :[
        {
            type: String,
            default: []
        }
    ],
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'TM', 'PM']
    },
    team :{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
});
module.exports = mongoose.model('User', User);  