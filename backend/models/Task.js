// models/Task.js
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  workspace: { type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'] }
});

module.exports = mongoose.model('Task', taskSchema);
