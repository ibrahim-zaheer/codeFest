
const express = require('express');
const router = express.Router();


const exampleData = [
  { id: 1, name: 'Project 1', status: 'In Progress' },
  { id: 2, name: 'Project 2', status: 'Completed' },
];


router.get('/data', (req, res) => {
  res.json(exampleData);
});

module.exports = router;
