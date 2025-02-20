const User = require('../Models/User');
const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const JWT_PROVIDER = require('../Config/JWT');
const TokenBlacklist = require('../Models/Token_Blacklist');

// 📤 Upload Helper
const uploadFile = (file, folder) => {
    if (!file || !file.buffer) {
        throw new Error(`No file buffer found for ${file?.originalname || 'unknown file'}`);
    }

    const filePath = path.join(__dirname, `../uploads/${folder}/${file.originalname}`);
    fs.writeFileSync(filePath, file.buffer);
    return `/uploads/${folder}/${file.originalname}`;
};

// ✅ Create User
const Create_User = async (userData, photoFile, resumeFile) => {
    try {
        let { name, photo, email, password } = userData;
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('User already exists with this email');

        const hashedPassword = await bcrypt.hash(password, 10);
        const photoPath = photoFile ? uploadFile(photoFile, 'photos') : photo;
        const resumePath = resumeFile ? uploadFile(resumeFile, 'resumes') : null;

        const newUser = new User({
            name,
            photo: photoPath,
            email,
            password: hashedPassword,
            resume: { uploaded: resumePath },
        });

        await newUser.save();
        return newUser;
    } catch (error) {
        throw new Error(error.message);
    }
};

// ✅ Logout User (With Token Blacklisting)
const Logout_User = async (token) => {
    try {
        if (!token) throw new Error('No token provided');
        await TokenBlacklist.create({ token });
        return { message: 'Logout successful' };
    } catch (error) {
        throw new Error(error.message);
    }
};

// ✏️ Update User
const Update_User = async (userId, updatedData, photoFile, resumeFile) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        if (updatedData.name) user.name = updatedData.name;
        if (updatedData.email) user.email = updatedData.email;

        if (updatedData.password) {
            user.password = await bcrypt.hash(updatedData.password, 10);
        }

        if (photoFile) {
            const newPhotoPath = uploadFile(photoFile, 'photos');
            user.photo = newPhotoPath;
        }

        if (resumeFile) {
            const newResumePath = uploadFile(resumeFile, 'resumes');
            user.resume.uploaded = newResumePath;
        }

        user.updatedAt = Date.now();
        await user.save();
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// 🔍 Find User By ID
const Find_User_By_Id = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// 🔍 Find User By Email
const Find_User_By_Email = async (email) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

// 📋 Get All Users
const Get_All_Users = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw new Error(error.message);
    }
};

// 🆔 Get User Profile By Token
const Get_User_Profile_By_Token = async (token) => {
    try {
        const userId = JWT_PROVIDER.getUserIdFromToken(token);
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');
        return user;
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    Create_User,
    Update_User,
    Find_User_By_Id,
    Find_User_By_Email,
    Get_All_Users,
    Get_User_Profile_By_Token,
    Logout_User
};
