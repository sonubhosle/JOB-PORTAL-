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
const Get_All_Jobs = async () => {

    try {

        const jobs = await Job.find()
        return jobs;

    } catch (error) {
        throw new Error(error.message);
    }
}

// ✅ Get Job by ID
const Get_Job_By_Id = async (jobId) => {
    try {
        const job = await Job.findById(jobId);
        if (!job) throw new Error('Job not found');
        return job;
    } catch (error) {
        throw new Error(error.message);

    }
}

// ✅ Get Jobs by Category
const Get_Jobs_By_Category = async (category) => {
    try {
        const category = await Job.find({ category });
        if (!category) throw new Error('Category Not Found');
        return category;
    } catch (error) {
        throw new Error(error.message);

    }
};

// ✅ Get Related Jobs (same category, excluding current job)
const Get_Related_Jobs = async (jobId) => {
    try {
        const job = await Job.findById(jobId);
        return await Job.find({ category: job.category, _id: { $ne: jobId } });
    } catch (error) {
        throw new Error(error.message);

    }
};

// ✅ Update Job
const Update_Job = async (jobId, updatedData, companyLogoFile) => {
    try {
        if (companyLogoFile) {
            const logoName = `${Date.now()}_${companyLogoFile.originalname}`;
            const logoPath = path.join(__dirname, '../uploads/', logoName);
            fs.writeFileSync(logoPath, companyLogoFile.buffer);
            updatedData.companyLogo = `/uploads/${logoName}`;
        }
        return await Job.findByIdAndUpdate(jobId, updatedData, { new: true });
    } catch (error) {
        throw new Error(error.message);

    }
};


const Delete_Job = async (jobId) => {
    try {
        const job = await Job.findByIdAndDelete(jobId);
        if (!job) throw new Error('Job Not Found With This Id ')
        return job;
    } catch (error) {
        throw new Error(error.message);

    }
}

// ✅ Get Job History (by user)
const Get_Job_History = async (userId) => {
    try {
        const history = await Job.find({ appliedUsers: userId })
        return history
    } catch (error) {
        throw new Error(error.message);

    }
};

// ✅ Get Applied Jobs (by user)
const Get_Applied_Jobs = async (userId) => {
    try {
        const applied = await Job.find({ 'appliedUsers.userId': userId });
        if (!applied) throw new Error("There is no applied jobs")
    } catch (error) {
        throw new Error(error.message);

    }
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
