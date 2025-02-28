import React, { useState, useEffect } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaRegUser, FaBriefcase } from "react-icons/fa";
import { RiLogoutBoxRLine } from "react-icons/ri";
import Auth_Modal from "../components/Auth/Auth_Model";
import Menu from "@mui/material/Menu";
import "../Styles/Navbar.css";
import axios from "axios";

const Navbar = () => {
  const [openAuthModel, setAuthModel] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Fetch user profile if token exists
  const fetchUserProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:7866/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User Profile Response:", response.data); // Debugging log
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data)); // Store user data
    } catch (error) {
      console.error("Invalid token, logging out...");
      handleLogout();
    }
  };

  useEffect(() => {
    // Try loading the user from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      fetchUserProfile(); // Fetch from API if not found in localStorage
    }
  }, []);

  useEffect(() => {
    console.log("Updated User:", user); // Log updated user state
  }, [user]);

  const handleUserClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorEl(null);
  };

  const handleOpen = () => {
    setAuthModel(true);
  };

  const handleClose = () => {
    setAuthModel(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:7866/api/user/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        localStorage.removeItem("authToken"); // Remove token
        localStorage.removeItem("user"); // Remove user data
        setUser(null); // Clear user state
        navigate("/"); // Redirect to homepage
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <div className="container px-4 2xl:px-2 mx-auto h-[90px] shadow-xl flex justify-between items-center">
        {/* Logo */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo01}
          alt="Logo"
          className="logo cursor-pointer"
        />

        {/* Profile Section */}
        <div className="profile">
          {user ? (
            <div>
              <div
                className="open-btn"
                onClick={handleUserClick}
                aria-controls={anchorEl ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorEl) ? "true" : undefined}
              >
                <img
                  src={"https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"}
                  alt="User"
                />
                <div>
                  <p>Welcome</p>
                  <div className="name">{user?.name || "User"}</div>
                </div>
              </div>

              {/* Dropdown Menu */}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseUserMenu}
                MenuListProps={{ "aria-labelledby": "basic-button" }}
                PaperProps={{
                  style: {
                    marginTop: "15px",
                    padding: "0px",
                    width: "200px",
                    borderRadius: "3px",
                    boxShadow: "rgba(0, 0, 0, 0.051) 0px 5px 15px 0px",
                  },
                }}
              >
                <Link to="/profile" className="menu-link" onClick={handleCloseUserMenu}>
                  <p className="menu-item">
                    <FaRegUser className="menu-icon" /> Profile
                  </p>
                </Link>
                <Link to="/post-job" className="menu-link" onClick={handleCloseUserMenu}>
                  <p className="menu-item">
                    <FaBriefcase className="menu-icon" /> Create Jobs
                  </p>
                </Link>
                {user?.role === "ADMIN" && (
                  <Link
                    className="menu-link"
                    onClick={() => (window.location.href = "http://localhost:5174/")}
                  >
                    <p className="menu-item">
                      <FaUser className="menu-icon" /> Admin Dashboard
                    </p>
                  </Link>
                )}
                <div className="hr-line"></div>
                <Link className="menu-link" onClick={handleLogout}>
                  <p className="menu-item">
                    <RiLogoutBoxRLine className="menu-icon" /> Logout
                  </p>
                </Link>
              </Menu>
            </div>
          ) : (
            // Show Login/Signup Button if User is Not Logged In
            <div className="auth-btn" onClick={handleOpen}>
              <FaUser size={20} /> Login / Signup
            </div>
          )}
        </div>
      </div>

      {/* Authentication Modal */}
      <Auth_Modal handleClose={handleClose} open={openAuthModel} setUser={setUser} />
    </div>
  );
};

export default Navbar;
