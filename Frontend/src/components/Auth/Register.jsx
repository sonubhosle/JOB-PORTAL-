import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

const Register = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState(null);
  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("photo", photo);
    formData.append("resume", resume);

    try {
      await axios.post("http://localhost:7866/api/user/register", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccess("Registration successful! Redirecting...");
      setTimeout(() => {
        handleClose(); // Close modal
        navigate("/");
      }, 1500);
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {success && <p className="success-message">{success}</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleRegister}>
        <div className="input_box">
          <div className="name">Email</div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="input_box">
          <div className="name">Password</div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        </div>
        <div className="input_box ">
          <div className="name">Upload Photo</div>
          <input type="file" onChange={(e) => setPhoto(e.target.files[0])} required />

        </div>
        <div className="input_box">
          <div className="name">Upload Resume</div>
          <input type="file" onChange={(e) => setResume(e.target.files[0])} required />

        </div>
        <div className="input_box">
          <button type="submit">Register</button>
        </div>
      </form>


     <div className="navigate">
       <p>If you have an account</p>  <Link to='/login'>Login</Link>
     </div>
     
    </div>
  );
}

export default Register;
