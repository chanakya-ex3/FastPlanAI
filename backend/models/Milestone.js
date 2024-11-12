const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const Milestone = new Schema({
  milestone: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
  tasks:{
    type: [Schema.Types.ObjectId],
    ref: 'Task',
    default: []
  }
});

module.exports = mongoose.model('Milestone', Milestone);