// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true, required: true },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['admin', 'team-lead', 'team-member'], required: true },
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema);

// models/User.js



const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true,unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'team_lead', 'team_member'], required: true },
  workspaces: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workspace' }]
});

exports.getTeamLeads = async (req, res) => {
    try {
        const teamLeads = await User.find({ role: 'team lead' }); // Adjust this based on your user schema
        res.status(200).json(teamLeads);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = mongoose.model('User', userSchema);
