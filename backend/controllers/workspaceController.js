// backend/controllers/workspaceController.js
const Workspace = require('../models/Workspace');

exports.createWorkspace = async (req, res) => {
  try {
    const { name, teamLead } = req.body;
    const workspace = new Workspace({ name, teamLead });
    await workspace.save();
    res.status(201).json(workspace);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserWorkspaces = async (req, res) => {
  try {
    const userId = req.user.userId; // Assuming you have middleware to attach user info
    const workspaces = await Workspace.find({
      $or: [{ teamLead: userId }, { members: userId }],
    }).populate('teamLead members');
    res.status(200).json(workspaces);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
