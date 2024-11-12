const mongoose = require('mongoose');
const Milestone = require('./Milestone');
const Schema = mongoose.Schema;

const Project = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tech_stack: {
    type: [String], // Array of tech stack items suggested by AI
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  roadmap:{
    type:[Schema.Types.ObjectId],
    ref: 'Milestone',
    default: []
  }, // Array of milestones with tasks
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', Project);