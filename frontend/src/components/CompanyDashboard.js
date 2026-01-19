import React from 'react';
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaArrowLeft } from 'react-icons/fa';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const fleetStatusData = [{ name: 'Active (On Route)', value: 12 }, { name: 'Docked (Loading)', value: 5 }, { name: 'Maintenance', value: 3 }];
  const fuelData = [{ name: 'Vessel A', fuel: 4000, efficiency: 2400 }, { name: 'Vessel B', fuel: 3000, efficiency: 1398 }, { name: 'Vessel C', fuel: 2000, efficiency: 9800 }, { name: 'Vessel D', fuel: 2780, efficiency: 3908 }];
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ padding: "30px", background: "#f1f5f9", minHeight: "100vh", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* UPDATED BACK BUTTON: Sends you straight to the dashboard view */}
      <button 
        onClick={() => navigate('/', { state: { view: 'dashboard' } })} 
        style={{ background: "white", border: "1px solid #cbd5e1", padding: "10px 20px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px", fontWeight: "bold", color: "#475569" }}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>

      <h1 style={{ fontSize: "2rem", color: "#0f172a", marginBottom: "20px" }}>🚢 Company Logistics Dashboard</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", marginBottom: "30px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #3b82f6", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Total Fleet</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>20 Vessels</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #10b981", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>On-Time Deliveries</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>94.5%</p>
        </div>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", borderLeft: "5px solid #f59e0b", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h3 style={{ margin: 0, color: "#64748b", fontSize: "0.9rem" }}>Active Alerts</h3>
          <p style={{ margin: "10px 0 0 0", fontSize: "1.8rem", fontWeight: "bold", color: "#0f172a" }}>2 Minor</p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1.2rem", color: "#334155", marginBottom: "20px" }}>Fleet Status Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={fleetStatusData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value" label>
                {fleetStatusData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div style={{ background: "white", padding: "25px", borderRadius: "12px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: "1.2rem", color: "#334155", marginBottom: "20px" }}>Fuel Consumption by Vessel</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fuelData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="fuel" fill="#8884d8" name="Fuel Consumed (L)" />
              <Bar dataKey="efficiency" fill="#82ca9d" name="Efficiency Score" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
export default CompanyDashboard;