// routes/timeLogs.js
const express = require('express');
const TimeLog = require('../models/TimeLog');
const router = express.Router();

// Start timer
router.post('/start', async (req, res) => {
    try {
        const timeLog = new TimeLog({ ...req.body, startTime: new Date() });
        await timeLog.save();
        res.status(201).json(timeLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Stop timer
router.patch('/stop/:id', async (req, res) => {
    try {
        const timeLog = await TimeLog.findByIdAndUpdate(
            req.params.id,
            { endTime: new Date() },
            { new: true }
        );
        res.json(timeLog);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Fetch all time logs for a user
router.get('/user/:userId', async (req, res) => {
    try {
        const timeLogs = await TimeLog.find({ userId: req.params.userId });
        res.json(timeLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch all time logs (for admins and team leads)
router.get('/', async (req, res) => {
    try {
        const timeLogs = await TimeLog.find().populate('userId').populate('taskId');
        res.json(timeLogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
