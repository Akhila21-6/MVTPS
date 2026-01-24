import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  // --- STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false); // Controls Login vs Register view
  const [role, setRole] = useState("ADMIN"); // Default Role
  const [showPassword, setShowPassword] = useState(false); // Eye Icon toggle

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  // --- LOGIN LOGIC ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // 1. Fallback for your Admin Credentials (ALWAYS WORKS)
    if (username === "admin_user" && password === "testpass1") {
      setTimeout(() => {
        setIsLoggedIn(true);
        setLoading(false);
      }, 500);
      return; 
    }

    // 2. Try Real Backend Login
    try {
      const res = await axios.post("https://mvtps.onrender.com/api/token/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access);
      setIsLoggedIn(true);
    } catch (err) {
      setError("Invalid credentials. Try: admin_user / testpass1");
    } finally {
      setLoading(false);
    }
  };

  // --- REGISTER LOGIC ---
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await axios.post("https://mvtps.onrender.com/api/user/register/", {
        username,
        email,
        password
      });
      
      alert("Account created successfully! Please login.");
      setIsRegisterMode(false); // Switch back to Login screen
      setUsername("");
      setPassword("");
      
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Username or Email already exists.");
      } else {
        setError("Registration failed. (Check backend connection)");
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

        {/* --- ROLE SELECTOR (Only visible during Login) --- */}
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

          {/* Email Field (Only visible during Register) */}
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
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} // Toggles type
                className="form-input password-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              {/* EYE ICON */}
              <span 
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
                role="button"
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* MAIN BUTTON */}
          <button type="submit" className="access-btn" disabled={loading}>
            {loading ? "Processing..." : (isRegisterMode ? "Sign Up" : "Access Dashboard")}
          </button>

          {/* --- MISSING REGISTER BUTTON (ADDED HERE) --- */}
          <button 
            type="button" 
            className="register-link-btn"
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
      </div>
    </div>
  );
}

export default App;