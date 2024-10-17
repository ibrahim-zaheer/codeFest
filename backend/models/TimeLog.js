const mongoose = require('mongoose');

const timeLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
});

module.exports = mongoose.model('TimeLog', timeLogSchema);