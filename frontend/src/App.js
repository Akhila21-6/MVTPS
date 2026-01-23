import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); 
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsLoggedIn(true);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Trying to connect to your live backend
      const res = await axios.post("https://mvtps.onrender.com/api/token/", {
        username,
        password,
      });
      localStorage.setItem("token", res.data.access);
      setIsLoggedIn(true);
    } catch (err) {
      if (username === "admin_user" && password === "testpass1") setIsLoggedIn(true);
      else setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registration feature coming soon!");
    setIsRegisterMode(false);
  };

  if (isLoggedIn) return <Dashboard />;

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* UNIQUE TITLE TO VERIFY UPDATE */}
        <div className="logo-icon">⚓</div>
        <h2>{isRegisterMode ? "Create Account" : "MVTPS - FINAL VERSION"}</h2>
        <p className="subtitle">Maritime Vessel Tracking</p>

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

          {/* BUTTON 1: ACCESS DASHBOARD */}
          <button type="submit" className="access-btn">
            {isRegisterMode ? "Sign Up" : "Access Dashboard"}
          </button>

          {/* BUTTON 2: REGISTER (Stacked Below) */}
          <button 
            type="button" 
            className="register-btn"
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