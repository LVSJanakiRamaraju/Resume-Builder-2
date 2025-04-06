// models/Resume.js
const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  dob: String,
  gender: String,
  address: String,
  objective: String,
  education: String,
  experience: String,
  skills: [String],
  projects: String,
  achievements: String,
  hobbies: String,
  languages: String,
  certifications: String,
  linkedin: String,
  github: String,
  portfolio: String
});

module.exports = mongoose.model('Resume', resumeSchema);
