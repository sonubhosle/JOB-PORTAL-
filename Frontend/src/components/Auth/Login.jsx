import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from 'react-router-dom';

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:7866/api/user/login", { email, password });
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setSuccess("Login successful! Redirecting...");

        setTimeout(() => {
          handleClose(); // Close modal
          navigate(user.role === "ADMIN" ? "/admin/dashboard" : "/");
        }, 1500);
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {success && <p className="success-message message">{success}</p>}
      {error && <p className="error-message message">{error}</p>}
      
      <form onSubmit={handleSubmit}>
         <div className="input_box">
          <div className="name">Email</div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
         </div>
         <div className="input_box">
          <div className="name">Password</div>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
         </div>
         <div className="input_box">
         <button type="submit">Login</button>
         </div>
        
      </form>

      <div className="navigate">
       <p>If you have an account</p>  <Link to='/register'>Login</Link>
     </div>
    </div>
  );
};

export default Login;
