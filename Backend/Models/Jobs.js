const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  skills: [
    {
      type: String,
      required: true,
    },
  ],
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  salary: {
    type: String, // e.g., "50,000 - 70,000 per month" or "Negotiable"
    required: true,
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  jobStatus: {
    type: String,
    enum: [
      'APPLIED',
      'RECRUITER_VIEWED',
      'INTERVIEW_SCHEDULED',
      'OFFER_SENT',
      'REJECTED',
    ],
    default: 'APPLIED',
  },
  keyResponsibilities: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Job', JobSchema);
