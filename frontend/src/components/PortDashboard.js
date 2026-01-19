import React from 'react';
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaArrowLeft } from 'react-icons/fa';

const PortDashboard = () => {
  const navigate = useNavigate();
  const trafficData = [{ time: '06:00', incoming: 2, outgoing: 1 }, { time: '09:00', incoming: 5, outgoing: 3 }, { time: '12:00', incoming: 8, outgoing: 6 }, { time: '15:00', incoming: 6, outgoing: 8 }, { time: '18:00', incoming: 3, outgoing: 4 }];

  return (
    <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* UPDATED BACK BUTTON */}
      <button 
        onClick={() => navigate('/', { state: { view: 'dashboard' } })} 
        style={{ background: "white", border: "1px solid #cbd5e1", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", fontWeight: "bold", color: "#475569" }}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <h1 style={{ fontSize: "2rem", color: "#0f172a", marginBottom: "20px" }}>⚓ Port Authority Dashboard</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #4f46e5", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Ships in Port</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>14 Vessels</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #ef4444", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Avg. Wait Time</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>45 Mins</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #14b8a6", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Scheduled Arrivals</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>8 Today</p>
        </div>
      </div>

      <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.2rem", color: "#334155", marginBottom: "20px" }}>Daily Port Traffic (Incoming vs Outgoing)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={trafficData}>
            <defs>
              <linearGradient id="colorIn" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/><stop offset="95%" stopColor="#8884d8" stopOpacity={0}/></linearGradient>
              <linearGradient id="colorOut" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/><stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/></linearGradient>
            </defs>
            <XAxis dataKey="time" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="incoming" stroke="#8884d8" fillOpacity={1} fill="url(#colorIn)" />
            <Area type="monotone" dataKey="outgoing" stroke="#82ca9d" fillOpacity={1} fill="url(#colorOut)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default PortDashboard;