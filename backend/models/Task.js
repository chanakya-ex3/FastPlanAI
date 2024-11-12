const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    assigned_to:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status:{
        type: String,
        default: 'pending',
        enum: ['pending', 'in_progress', 'completed']
    },
    flags :{
        type:String,
        enum: ['L','I','A']
    },
    start_time :{
        type: Date,
    },
    end_time:{
        type: Date,
    },
    estimated_time :{
        type: Number,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Task', Task);