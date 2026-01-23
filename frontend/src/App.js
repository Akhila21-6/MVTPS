import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  // --- STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- CHECK LOGIN ON LOAD ---
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // --- LOGIN FUNCTION ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("https://mvtps.onrender.com/api/token/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access);
      setIsLoggedIn(true);
    } catch (err) {
      // Fallback for demo admin
      if (username === "admin_user" && password === "testpass1") {
        setIsLoggedIn(true);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER FUNCTION (REAL BACKEND) ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Clear previous errors

    try {
      // This sends the data to your NEW backend endpoint
      await axios.post("https://mvtps.onrender.com/api/user/register/", {
        username,
        email,
        password
      });
      
      // Success!
      alert("Account created successfully! You can now login.");
      setIsRegisterMode(false); // Switch back to login screen automatically
      setUsername(""); // Clear form for fresh login
      setPassword("");
      
    } catch (err) {
      // Error handling
      console.error(err);
      if (err.response && err.response.status === 400) {
        // This handles "Username already exists" from Django
        setError("Username or Email already exists.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER DASHBOARD ---
  if (isLoggedIn) {
    return <Dashboard />;
  }

  // --- RENDER LOGIN / REGISTER PORTAL ---
  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* HEADER */}
        <div className="logo-icon">⚓</div>
        <h2>{isRegisterMode ? "Create Account" : "MVTPS Portal"}</h2>
        <p className="subtitle">Maritime Vessel Tracking & Port Safety</p>

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              className="form-input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          {isRegisterMode && (
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              className="form-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {/* BUTTON 1: SUBMIT (Dynamic Text) */}
          <button type="submit" className="access-btn" disabled={loading}>
            {loading ? "Processing..." : (isRegisterMode ? "SIGN UP" : "SECURE LOGIN")}
          </button>

          {/* BUTTON 2: TOGGLE MODE */}
          <button 
            type="button" 
            className="register-btn"
            onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError("");
                setUsername("");
                setPassword("");
            }}
          >
            {isRegisterMode ? "Back to Login" : "New User? Register Here"}
          </button>

        </form>

        <p className="footer-text">Authorized Personnel Only</p>

      </div>
    </div>
  );
}

export default App;