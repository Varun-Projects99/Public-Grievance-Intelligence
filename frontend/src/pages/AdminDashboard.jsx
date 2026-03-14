import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { LogOut, Grid, RefreshCw, AlertTriangle } from "lucide-react";

import StatsCards from "../components/StatsCards";
import ComplaintTable from "../components/ComplaintTable";
import CategoryPieChart from "../charts/CategoryPieChart";
import ComplaintMap from "../components/ComplaintMap";

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Basic auth check for hackathon purposes
    const auth = localStorage.getItem("adminAuth");
    if (!auth) {
      navigate("/login");
      return;
    }
    fetchComplaints();
  }, [navigate]);

  const fetchComplaints = async (showRefresh = false) => {
    if (showRefresh) setIsRefreshing(true);
    else setIsLoading(true);
    
    try {
      const response = await api.get("/complaints");
      setComplaints(response.data);
    } catch (err) {
      console.error("Failed to fetch complaints", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await api.put(`/complaints/${id}/status`, null, { params: { status: newStatus } });
      fetchComplaints(true); // Soft refresh
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update status");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[60vh] w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mb-4"></div>
        <p className="text-gray-500 font-medium">Loading Dashboard Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 w-full max-w-7xl mx-auto py-8">
      
      {/* Dashboard Header Header */}
      <div className="flex justify-between items-center sm:flex-row flex-col gap-6 bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-50 to-transparent rounded-full -mr-20 -mt-20 z-0"></div>
        
        <div className="flex items-center relative z-10 w-full sm:w-auto justify-center sm:justify-start">
           <div className="h-16 w-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-indigo-500/30">
            <Grid className="text-white w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">Admin Portal</h1>
            <p className="text-gray-500 font-semibold tracking-wide mt-1">Manage and resolve city grievances</p>
          </div>
        </div>
        
        <div className="flex gap-4 relative z-10 w-full sm:w-auto justify-center">
          <button
            onClick={() => fetchComplaints(true)}
            disabled={isRefreshing}
            className="inline-flex items-center px-4 py-3 border border-gray-200 shadow-sm text-sm font-bold rounded-xl text-gray-700 bg-white hover:bg-gray-50 hover:text-blue-600 transition-colors focus:ring-4 focus:ring-gray-100 outline-none"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin text-blue-500' : ''}`} />
            Refresh
          </button>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-5 py-3 border border-transparent shadow-md shadow-red-500/20 text-sm font-bold rounded-xl text-white bg-red-600 hover:bg-red-700 transition-all focus:ring-4 focus:ring-red-500/30 outline-none"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      </div>

      <StatsCards complaints={complaints} />

      <div className="animate-in slide-in-from-bottom-6 duration-700 delay-200">
        <div className="flex items-center justify-between mb-6">
           <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Geographic Distribution</h2>
        </div>
        <ComplaintMap complaints={complaints} />
      </div>

      {complaints.some(c => c.emergency && c.status === "Pending") && (
        <div className="bg-red-50 border-2 border-red-200 rounded-3xl p-6 flex items-center gap-6 animate-pulse shadow-lg shadow-red-500/10">
          <div className="bg-red-600 p-4 rounded-2xl shadow-lg shadow-red-600/40">
            <AlertTriangle className="text-white w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-black text-red-900 tracking-tight">⚠ Critical infrastructure issue detected.</h3>
            <p className="text-red-700 font-bold text-sm mt-1 uppercase tracking-wider">Multiple high-severity complaints require immediate department dispatch</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2">
          <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Recent Grievances</h2>
             <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{complaints.length} Records</span>
          </div>
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 overflow-hidden">
            <ComplaintTable 
              complaints={complaints}
              onStatusUpdate={handleStatusUpdate}
            />
          </div>
        </div>
        
        <div className="xl:col-span-1">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/40 p-8">
            <h3 className="text-xl font-extrabold text-gray-900 mb-8 border-b border-gray-100 pb-4">Complaints by Category</h3>
            <div className="h-72">
               <CategoryPieChart complaints={complaints} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
