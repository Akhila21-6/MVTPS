import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  // --- STATE ---
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [role, setRole] = useState("ADMIN"); // Role Selector
  const [showPassword, setShowPassword] = useState(false); // Toggle Eye Logic

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

    // 1. Check Hardcoded Credentials FIRST (Ensures you can always access)
    if (username === "admin_user" && password === "testpass1") {
      setTimeout(() => { // Small fake delay for realism
        setIsLoggedIn(true);
        setLoading(false);
      }, 500);
      return; 
    }

    // 2. If not hardcoded, try the Real Backend
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

  // --- REGISTER FUNCTION ---
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
      setIsRegisterMode(false); // Go back to login
      setUsername("");
      setPassword("");
      
    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError("Username or Email already exists.");
      } else {
        setError("Registration failed. (Ensure backend is deployed)");
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
        <h2>{isRegisterMode ? "Create Account" : "Welcome to MVTPS"}</h2>
        <p className="subtitle">Maritime Vessel Tracking & Port Systems</p>

        {/* --- ROLE SELECTOR (Hidden in Register Mode) --- */}
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
              placeholder="Enter Username"
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
                placeholder="name@company.com"
                required 
              />
            </div>
          )}

          <div className="input-group">
            <label>Password</label>
            <div className="password-wrapper">
              <input 
                type={showPassword ? "text" : "password"} // Toggles between text and password
                className="form-input password-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              {/* THE EYE ICON */}
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

          {/* REGISTER TOGGLE BUTTON */}
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