// routes/chat.js
const express = require('express');
const Chat = require('../models/Chat');
const Message = require('../models/Message');
const router = express.Router();

// Post a new message
router.post('/:workspaceId', async (req, res) => {
    try {
        const message = new Message(req.body);
        await message.save();

        const chat = await Chat.findOneAndUpdate(
            { workspaceId: req.params.workspaceId },
            { $push: { messages: message._id } },
            { new: true, upsert: true }
        );

        res.status(201).json(message);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Get all messages in a workspace
router.get('/:workspaceId', async (req, res) => {
    try {
        const chat = await Chat.findOne({ workspaceId: req.params.workspaceId }).populate('messages');
        res.json(chat ? chat.messages : []);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
