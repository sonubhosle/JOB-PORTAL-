const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  photo: { type: String },
  role: { type: String, enum: ['CANDIDATE', 'RECRUITER', 'ADMIN'], default: 'CANDIDATE' },
  resume: {
    uploaded: {
      type: String, 
    },
    created: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resume', 
    },
  },
  history: {
    viewedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
    applications: [
      {
        job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
        appliedDate: Date,
        status: {
          type: String,
          enum: ['APPLIED', 'REVIEWED', 'INTERVIEW_SCHEDULED', 'OFFERED', 'REJECTED', 'CANCELLED'],
          default: 'APPLIED',
        },
      },
    ],
  },
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
