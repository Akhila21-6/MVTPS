import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  // --- STATE MANAGEMENT ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [role, setRole] = useState("ADMIN"); // Restored Role State
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // --- CHECK LOGIN STATUS ---
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
      // 1. Try Real Backend Login
      const res = await axios.post("https://mvtps.onrender.com/api/token/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access);
      setIsLoggedIn(true);
    } catch (err) {
      // 2. Fallback for your specific credentials (admin_user)
      if (username === "admin_user" && password === "testpass1") {
        console.log("Using Fallback Login");
        setIsLoggedIn(true);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER FUNCTION ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Connects to the backend registration endpoint
      await axios.post("https://mvtps.onrender.com/api/user/register/", {
        username,
        email,
        password
      });
      
      alert("Account created successfully! Please login.");
      setIsRegisterMode(false); 
      setUsername("");
      setPassword("");
      
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Username or Email already exists.");
      } else {
        // If backend isn't updated yet, show this specific error
        setError("Registration failed. (Did you update the backend?)");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) return <Dashboard />;

  return (
    <div className="login-container">
      <div className="login-card">
        
        <div className="logo-icon">⚓</div>
        
        {/* Dynamic Title */}
        <h2>{isRegisterMode ? "Create Account" : "Welcome to MVTPS"}</h2>
        <p className="subtitle">Maritime Vessel Tracking & Port Systems</p>

        {/* --- ROLE SELECTOR (Only show when Logging In) --- */}
        {!isRegisterMode && (
          <div className="role-selector">
            <button 
              type="button"
              className={`role-btn ${role === "ADMIN" ? "active" : ""}`}
              onClick={() => setRole("ADMIN")}
            >
              ADMIN
            </button>
            <button 
              type="button"
              className={`role-btn ${role === "ANALYST" ? "active" : ""}`}
              onClick={() => setRole("ANALYST")}
            >
              ANALYST
            </button>
            <button 
              type="button"
              className={`role-btn ${role === "OPERATOR" ? "active" : ""}`}
              onClick={() => setRole("OPERATOR")}
            >
              OPERATOR
            </button>
          </div>
        )}

        {error && <div className="error-msg">{error}</div>}

        <form onSubmit={isRegisterMode ? handleRegister : handleLogin}>
          
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              className="form-input" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              placeholder={isRegisterMode ? "Choose a username" : "Enter Username"}
              required 
            />
          </div>

          {/* Email only for Registration */}
          {isRegisterMode && (
            <div className="input-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                placeholder="name@company.com"
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
              placeholder="••••••••"
              required 
            />
          </div>

          {/* BUTTON 1: ACCESS DASHBOARD / SIGN UP */}
          <button type="submit" className="access-btn" disabled={loading}>
            {loading ? "Processing..." : (isRegisterMode ? "Sign Up" : "Access Dashboard")}
          </button>

          {/* BUTTON 2: TOGGLE REGISTER */}
          <button 
            type="button" 
            className="register-link-btn"
            onClick={() => {
                setIsRegisterMode(!isRegisterMode);
                setError("");
            }}
          >
            {isRegisterMode ? "Back to Login" : "New User? Register Here"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default App;