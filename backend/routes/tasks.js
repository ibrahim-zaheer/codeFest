// routes/tasks.js
const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create a new task
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get tasks by team member ID
router.get('/:userId', async (req, res) => {
    try {
        const tasks = await Task.find({ assignedTo: req.params.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update task status
router.patch('/:taskId', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all time logs (assuming you have a TimeLog model)
router.get('/time-logs', async (req, res) => {
    try {
        const timeLogs = await TimeLog.find();
        res.json(timeLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
