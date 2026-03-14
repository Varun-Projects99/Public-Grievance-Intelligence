import { useState } from "react";
import api from "../api/axios";
import { Search, MapPin, Tag, AlertTriangle, Clock, FastForward, CheckCircle2, QrCode } from "lucide-react";

export default function TrackComplaint() {
  const [complaintId, setComplaintId] = useState("");
  const [complaint, setComplaint] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!complaintId.trim()) return;

    setIsLoading(true);
    setError("");
    setComplaint(null);

    try {
      const response = await api.get(`/complaints/${complaintId}`);
      if (response.data) {
        setComplaint(response.data);
      } else {
        setError("Complaint not found. Please check your tracking ID.");
      }
    } catch (err) {
      setError("Complaint not found. Please verify the ID and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const StatusIcon = ({ status }) => {
    switch(status) {
      case 'Resolved': return <CheckCircle2 className="w-10 h-10 text-emerald-500" />;
      case 'In Progress': return <FastForward className="w-10 h-10 text-blue-500" />;
      default: return <Clock className="w-10 h-10 text-amber-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-amber-100 text-amber-800 border-amber-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'bg-red-50 text-red-700 border-red-200 shadow-sm';
      case 'Low': return 'bg-emerald-50 text-emerald-700 border-emerald-200 shadow-sm';
      default: return 'bg-amber-50 text-amber-700 border-amber-200 shadow-sm';
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-6 shadow-inner border border-blue-100">
           <QrCode className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
          Track Your Request
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl mx-auto">
          Enter your unique Tracking ID to see the real-time status and assignment of your request.
        </p>
      </div>

      {/* Modern Search Bar */}
      <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 sm:p-10 mb-12 relative overflow-hidden">
        {/* Decorative corner blur */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto relative z-10">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-14 pr-4 py-5 text-lg rounded-2xl border-2 border-gray-200 shadow-sm focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-gray-50 outline-none font-bold tracking-widest text-gray-800 uppercase placeholder-gray-400 transition-all duration-200 hover:bg-white"
              placeholder="E.G. CMP1023"
              value={complaintId}
              onChange={(e) => setComplaintId(e.target.value.toUpperCase())}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !complaintId.trim()}
            className="px-10 py-5 border border-transparent rounded-2xl shadow-lg shadow-blue-500/30 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 disabled:opacity-70 disabled:transform-none disabled:shadow-none whitespace-nowrap"
          >
            {isLoading ? "Searching..." : "Track Status"}
          </button>
        </form>

        {error && (
          <div className="mt-8 text-center text-red-700 font-bold bg-red-50 py-4 px-6 rounded-xl border-l-4 border-red-500 shadow-sm max-w-2xl mx-auto animate-in slide-in-from-top-4">
            {error}
          </div>
        )}
      </div>

      {/* Results Card */}
      {complaint && (
        <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-200 overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
          
          <div className="px-8 sm:px-10 py-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">Tracking Reference ID</p>
              </div>
              <h2 className="text-3xl font-black text-gray-900 tracking-tight font-mono">{complaint.id}</h2>
            </div>
            
            <div className={`px-6 py-2.5 rounded-2xl border ${getStatusColor(complaint.status)} shadow-sm`}>
               <span className="text-sm font-black uppercase tracking-wider">
                {complaint.status}
              </span>
            </div>
          </div>
          
          <div className="p-8 sm:p-10">
            
            {/* Status Visualizer */}
            <div className="flex items-center bg-gray-50 rounded-2xl p-6 border border-gray-100 shadow-inner mb-10">
               <div className="w-20 h-20 rounded-2xl bg-white shadow-md flex items-center justify-center mr-6 border border-gray-100">
                  <StatusIcon status={complaint.status} />
               </div>
               <div>
                 <h3 className="text-xl font-extrabold text-gray-900 mb-1">Status: {complaint.status}</h3>
                 <p className="text-gray-600 font-medium">
                   {complaint.status === "Pending" ? "Your grievance has been logged and is awaiting review." : 
                    complaint.status === "In Progress" ? "A field team has been assigned and is working on this issue." :
                    "This issue has been successfully resolved by the municipal corporation."}
                 </p>
               </div>
            </div>

            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 px-1 border-b border-gray-100 pb-2">Complaint Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 px-1">
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-center text-sm font-bold text-gray-500 mb-2">
                    <MapPin className="w-5 h-5 mr-2 text-blue-500" /> Map Location
                  </div>
                  <p className="text-gray-900 font-bold text-lg leading-snug bg-gray-50 p-4 rounded-xl border border-gray-100">{complaint.location}</p>
                </div>
                
                <div>
                  <div className="flex items-center text-sm font-bold text-gray-500 mb-2">
                    <Tag className="w-5 h-5 mr-2 text-indigo-500" /> Extracted Category
                  </div>
                  <div className="inline-flex items-center px-4 py-2 mt-1 rounded-xl text-sm font-bold bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">
                    {complaint.category || "General"}
                  </div>
                </div>
              </div>
              
              <div className="space-y-8">
                 <div>
                  <div className="flex items-center text-sm font-bold text-gray-500 mb-2">
                    Description Provided
                  </div>
                  <p className="text-gray-700 bg-blue-50 p-5 rounded-xl border border-blue-100 italic font-medium leading-relaxed">
                    "{complaint.description}"
                  </p>
                </div>

                <div>
                  <div className="flex items-center text-sm font-bold text-gray-500 mb-2">
                    <AlertTriangle className="w-5 h-5 mr-2 text-amber-500" /> Resolution Priority
                  </div>
                  <div className="mt-1">
                     <span className={`inline-flex items-center px-4 py-2 border text-xs font-black uppercase tracking-wider rounded-xl ${getPriorityColor(complaint.priority)}`}>
                       {complaint.priority || "Medium"} Priority
                     </span>
                  </div>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
