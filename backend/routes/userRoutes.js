const express = require('express');
const { getTeamLeads } = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/team-leads', verifyToken, getTeamLeads);

module.exports = router;
