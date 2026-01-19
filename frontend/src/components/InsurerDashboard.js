import React from 'react';
import { useNavigate } from "react-router-dom";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaArrowLeft } from 'react-icons/fa';

const InsurerDashboard = () => {
  const navigate = useNavigate();
  const riskData = [{ month: 'Jan', incidents: 4, riskScore: 85 }, { month: 'Feb', incidents: 3, riskScore: 88 }, { month: 'Mar', incidents: 1, riskScore: 92 }, { month: 'Apr', incidents: 5, riskScore: 78 }, { month: 'May', incidents: 2, riskScore: 90 }];

  return (
    <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* UPDATED BACK BUTTON */}
      <button 
        onClick={() => navigate('/', { state: { view: 'dashboard' } })} 
        style={{ background: "white", border: "1px solid #cbd5e1", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", fontWeight: "bold", color: "#475569" }}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <h1 style={{ fontSize: "2rem", color: "#0f172a", marginBottom: "20px" }}>🛡️ Insurer Risk Analysis</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #9333ea", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Fleet Safety Score</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>92/100</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #f97316", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Compliance Breaches</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>3 This Month</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #475569", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Pending Claims</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>1</p>
        </div>
      </div>

      <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
        <h2 style={{ fontSize: "1.2rem", color: "#334155", marginBottom: "20px" }}>Risk Score vs Incidents Trend</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={riskData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="riskScore" stroke="#8884d8" activeDot={{ r: 8 }} name="Safety Score" />
            <Line yAxisId="right" type="monotone" dataKey="incidents" stroke="#FF5733" name="Incidents Reported" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default InsurerDashboard;