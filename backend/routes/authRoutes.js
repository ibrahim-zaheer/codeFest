const express = require('express');
const { signup, login } = require('../controllers/authController');
const { verifyToken, authorizeRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);


router.get('/admin', verifyToken, authorizeRole(['admin']), (req, res) => {
    res.json({ message: 'Welcome, admin!' });
});

module.exports = router;
