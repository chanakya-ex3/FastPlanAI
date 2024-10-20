const mongoose = require('mongoose');
const Task = require('./Task');


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
  tasks: [Task], // Array of tasks
});

module.exports = mongoose.model('Milestone', Milestone);