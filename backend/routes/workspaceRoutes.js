// // routes/workspaceRoutes.js
// const express = require('express');
// const router = express.Router();
// const Workspace = require('../models/Workspace');
// const User = require('../models/User');
// const { verifyToken, verifyRole } = require('../middleware/authMiddleware');

// // Admin: Create Workspace and Assign Team Lead
// router.post('/create', verifyToken, verifyRole('admin'), async (req, res) => {
//   try {
//     const { name, teamLeadId } = req.body;
//     const workspace = new Workspace({ name, teamLead: teamLeadId });
//     await workspace.save();
//     await User.findByIdAndUpdate(teamLeadId, { $push: { workspaces: workspace._id } });
//     res.status(201).json(workspace);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating workspace' });
//   }
// });

// // Team Lead: Add Members to Workspace
// router.post('/:workspaceId/add-member', verifyToken, verifyRole('team_lead'), async (req, res) => {
//   try {
//     const { workspaceId } = req.params;
//     const { memberId } = req.body;
//     await Workspace.findByIdAndUpdate(workspaceId, { $push: { members: memberId } });
//     await User.findByIdAndUpdate(memberId, { $push: { workspaces: workspaceId } });
//     res.status(200).json({ message: 'Member added successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Error adding member to workspace' });
//   }
// });


// backend/routes/workspaceRoutes.js
// backend/routes/workspaceRoutes.js
const express = require('express');
const { createWorkspace, getUserWorkspaces } = require('../controllers/workspaceController');
// const { authenticate } = require('../middleware/authMiddleware'); // Assuming you have auth middleware
const { verifyToken } = require('../middleware/authMiddleware');


const router = express.Router();

router.post('/workspaces', verifyToken, createWorkspace);
router.get('/workspaces', verifyToken, getUserWorkspaces);


module.exports = router;

