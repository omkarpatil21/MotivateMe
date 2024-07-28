// routes/cohorts.js

const express = require('express');
const router = express.Router();
const {Cohort} = require('../db');

// Create a new cohort
router.post('/', async (req, res) => {
  try {
    const { name, description, usernames } = req.body;

    // Check if the cohort name is provided
    if (!name) {
      return res.status(400).json({ error: 'Cohort name is required' });
    }

    // Check if at least one username is provided
    if (!usernames || usernames.length === 0) {
      return res.status(400).json({ error: 'At least one username must be provided' });
    }
    const checkAv = await Cohort.findOne({name : req.body.name});
    if(checkAv)
    {
        return res.status(400).json({ error: 'Cohort name already taken' });
    }
    // Create a new cohort
    const cohort = await Cohort.create(req.body);

    // Respond with the created cohort
    res.status(201).json(cohort);
  } catch (error) {
    console.error('Error creating cohort:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
