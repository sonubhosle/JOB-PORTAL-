const Job = require('../Models/Job');
const path = require('path');
const fs = require('fs');

// ✅ Create Job
const Create_Job = async (jobData, companyLogoFile) => {
    if (companyLogoFile) {
        const logoName = `${Date.now()}_${companyLogoFile.originalname}`;
        const logoPath = path.join(__dirname, '../uploads/', logoName);
        fs.writeFileSync(logoPath, companyLogoFile.buffer);
        jobData.companyLogo = `/uploads/${logoName}`;
    }
    const job = new Job(jobData);
    return await job.save();
};

// ✅ Get All Jobs
const Get_All_Jobs = async () => await Job.find();

// ✅ Get Job by ID
const Get_Job_By_Id = async (jobId) => await Job.findById(jobId);

// ✅ Get Jobs by Category
const Get_Jobs_By_Category = async (category) => await Job.find({ category });

// ✅ Get Related Jobs (same category, excluding current job)
const Get_Related_Jobs = async (jobId) => {
    const job = await Job.findById(jobId);
    return await Job.find({ category: job.category, _id: { $ne: jobId } });
};

// ✅ Update Job
const Update_Job = async (jobId, updatedData, companyLogoFile) => {
    if (companyLogoFile) {
        const logoName = `${Date.now()}_${companyLogoFile.originalname}`;
        const logoPath = path.join(__dirname, '../uploads/', logoName);
        fs.writeFileSync(logoPath, companyLogoFile.buffer);
        updatedData.companyLogo = `/uploads/${logoName}`;
    }
    return await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
};

// ✅ Delete Job
const Delete_Job = async (jobId) => await Job.findByIdAndDelete(jobId);

// ✅ Get Job History (by user)
const Get_Job_History = async (userId) => {
    return await Job.find({ appliedUsers: userId });
};

// ✅ Get Applied Jobs (by user)
const Get_Applied_Jobs = async (userId) => {
    return await Job.find({ 'appliedUsers.userId': userId });
};

module.exports = {
    Create_Job,
    Get_All_Jobs,
    Get_Job_By_Id,
    Get_Jobs_By_Category,
    Get_Related_Jobs,
    Update_Job,
    Delete_Job,
    Get_Job_History,
    Get_Applied_Jobs,
};
