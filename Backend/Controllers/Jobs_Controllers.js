// controllers/jobController.js
const JobService = require('../Services/Job_Service');

// ✅ Create Job
const createJob = async (req, res) => {
    try {
        const job = await JobService.Create_Job(req.body, req.file);
        res.status(201).json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ Get All Jobs
const getAllJobs = async (req, res) => {
    try {
        const jobs = await JobService.Get_All_Jobs();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ Get Job by ID
const getJobById = async (req, res) => {
    try {
        const job = await JobService.Get_Job_By_Id(req.params.id);
        res.status(200).json(job);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ✅ Get Jobs by Category
const getJobsByCategory = async (req, res) => {
    try {
        const jobs = await JobService.Get_Jobs_By_Category(req.params.category);
        res.status(200).json(jobs);
    } catch (error) {
        res.status(404).json({ maessage: error.message });
    }
};

// ✅ Get Related Jobs
const getRelatedJobs = async (req, res) => {
    try {
        const { id } = req.params;
        const relatedJobs = await JobService.Get_Related_Jobs(id);
        res.status(200).json(relatedJobs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
// ✅ Update Job
const updateJob = async (req, res) => {
    try {
        const updatedJob = await JobService.Update_Job(req.params.id, req.body, req.file);
        res.status(200).json(updatedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ✅ Delete Job
const deleteJob = async (req, res) => {
    try {
        const deletedJob = await JobService.Delete_Job(req.params.id);
        res.status(200).json(deletedJob);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ✅ Get Job History
const getJobHistory = async (req, res) => {
    try {
        const history = await JobService.Get_Job_History(req.params.userId);
        res.status(200).json(history);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// ✅ Get Applied Jobs
const getAppliedJobs = async (req, res) => {
    try {
        const appliedJobs = await JobService.Get_Applied_Jobs(req.params.userId);
        res.status(200).json(appliedJobs);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createJob,
    getAllJobs,
    getJobById,
    getJobsByCategory,
    getRelatedJobs,
    updateJob,
    deleteJob,
    getJobHistory,
    getAppliedJobs
};
