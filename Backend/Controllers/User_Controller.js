const User_Service = require('../Services/User_Service');
const JWT_PROVIDER = require('../Config/JWT');
const bcrypt = require('bcrypt')

// 📋 Register User
const Register_User = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).send({ error: 'Name, email, and password are required.' });
        }

        const photoFile = req.files?.photo?.[0];
        const resumeFile = req.files?.resume?.[0];

        // ✅ Create user and get user._id
        const user = await User_Service.Create_User({ name, email, password }, photoFile, resumeFile);

        // 🔑 Correct usage of user._id
        const token = JWT_PROVIDER.generateToken(user._id);

        return res.status(201).send({ token, message: 'User registered successfully', user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};


// 🔑 Login User
const Login_User = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_Service.Find_User_By_Email(email);
        if (!user) return res.status(404).send({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send({ message: 'Invalid password' });

        const token = JWT_PROVIDER.generateToken(user._id);
        return res.status(200).send({ token, message: 'Login successful', user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// 🚪 Logout User
const Logout_User = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(400).send({ message: 'Token not provided' });

        const result = await User_Service.Logout_User(token);
        return res.status(200).send(result);
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
}

// ✏️ Update User Profile
const Update_User = async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const photoFile = req.files?.photo;
        const resumeFile = req.files?.resume;

        const updatedUser = await User_Service.Update_User(userId, updatedData, photoFile, resumeFile);
        return res.status(200).send({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// 🆔 Get User Profile by Token
const Get_User_Profile = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const user = await User_Service.Get_User_Profile_By_Token(token);
        return res.status(200).send({ user });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

// 📋 Get All Users
const Get_All_Users = async (req, res) => {
    try {
        const users = await User_Service.Get_All_Users();
        return res.status(200).send({ users });
    } catch (error) {
        return res.status(500).send({ error: error.message });
    }
};

module.exports = {
    Register_User,
    Login_User,
    Logout_User,
    Get_All_Users,
    Get_User_Profile,
    Update_User
};
