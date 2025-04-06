require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Resume = require('./models/Resume'); // Import Resume model

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB error:", err));

// ✅ Route to Fetch All Resumes


app.get('/', (req, res) => {
  res.send("API is working 🚀");
});

app.get('/api/resumes/list', async (req, res) => {
  try {
    const resumes = await Resume.find();
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Route to Add a New Resume
app.post('/api/resumes/add', async (req, res) => {
  try {
    console.log("Received data:", req.body);  // Logs the entire body

    // OPTIONAL: Check for required fields
    const requiredFields = ['name', 'email', 'education', 'skills', 'experience'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // Create resume with all fields in the request
    const newResume = new Resume(req.body);
    await newResume.save();

    res.status(201).json({ message: "Resume added successfully" });
  } catch (error) {
    console.error("Error adding resume:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.get('/api/resumes/list', async (req, res) => {
    try {
      const resumes = await Resume.find();
      res.status(200).json(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      res.status(500).json({ message: "Server error" });
    }
  });


  app.get('/api/resumes/list/:email', async (req, res) => {
    try {
      const emailP = req.params.email.trim().toLowerCase();
      const resume = await Resume.find({
        email: { $regex: new RegExp(`^${emailP}$`, 'i') }  // case-insensitive match
      });
  
      if (!resume) {
        return res.status(404).json({ message: "Resume not found" });
      }
  
      res.status(200).json(resume);
    } catch (error) {
      console.error("Error fetching resume by email:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  app.get('/api/test/emails', async (req, res) => {
    const resumes = await Resume.find();
    const emails = resumes.map(r => r.email);
    res.json(emails);
  });

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
