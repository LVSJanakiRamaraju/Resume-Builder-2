const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();

// Add a new resume
router.post('/add', async (req, res) => {
  try {
    const newResume = new Resume(req.body);
    await newResume.save();
    res.status(201).json(newResume);
    console.log("Received data:", req.body);  // Debugging log
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all resumes
router.get('/list', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.json(resumes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get resume by email
router.get('/list/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const resume = await Resume.findOne({email: { $regex: new RegExp(`^${email}$`, 'i') }});
    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }
    res.json(resume);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/all', async (req, res) => {
  const resumes = await Resume.find();
  res.json(resumes);
});


module.exports = router;
