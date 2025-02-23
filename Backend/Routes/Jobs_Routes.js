
// routes/job_route.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const JobController = require('../Controllers/Jobs_Controllers');

router.post('/create', upload.single('companyLogo'), JobController.createJob);
router.get('/all', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);
router.get('/category/:category', JobController.getJobsByCategory);
router.get('/related/:id', JobController.getRelatedJobs);
router.put('/update/:id', upload.single('companyLogo'), JobController.updateJob);
router.delete('/delete/:id', JobController.deleteJob);
router.get('/history/:userId', JobController.getJobHistory);
router.get('/applied/:userId', JobController.getAppliedJobs);

module.exports = router;
