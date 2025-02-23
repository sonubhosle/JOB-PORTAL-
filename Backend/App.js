const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Serve uploaded files (photos & resumes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import User Routes
const User_Route = require('./Routes/User_Routes');
app.use('/api/user', User_Route);

// Import Jobs Routes
const Jobs_Route = require('./Routes/Jobs_Routes');
app.use('/api/jobs', Jobs_Route);

// Import Apply Routes
const Apply_Route = require('./Routes/Apply_Job_Routes');
app.use('/api/apply', Apply_Route);

// Import Apply Routes
const Resume_Route = require('./Routes/Resume_Routes');
app.use('/api', Resume_Route);


// Global Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: 'Something went wrong!' });
});

module.exports = app;
