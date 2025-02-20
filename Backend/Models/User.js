const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  photo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['CANDIDATE', 'EMPLOYER', 'ADMIN'],
    default: 'CANDIDATE',
  },
  appliedJobs: [
    {
      job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
      },
      appliedAt: {
        type: Date,
        default: Date.now,
      },
      status: {
        type: String,
        enum: ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'],
        default: 'APPLIED',
      },
    },
  ],
  history: {
    viewedJobs: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Jobs',
        },
        viewedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    applications: [
      {
        job: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Jobs',
        },
        status: {
          type: String,
          enum: ['APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED'],
          default: 'APPLIED',
        },
        appliedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  resume: {
    uploaded: {
      type: String, // Store file URL or path
    },

  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', UserSchema);
module.exports = User
