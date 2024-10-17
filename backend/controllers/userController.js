const User = require('../models/User'); // Adjust the path as necessary to your User model

// Function to get all team leads
exports.getTeamLeads = async (req, res) => {
  try {
    // Assuming 'role' is the field that differentiates team leads from other users
    const teamLeads = await User.find({ role: 'team-lead' }).select('name'); // Adjust the fields as needed
    res.status(200).json(teamLeads);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch team leads', error: error.message });
  }
};

