import { FileText, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

export default function StatsCards({ complaints }) {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === "Pending").length;
  const resolved = complaints.filter(c => c.status === "Resolved").length;
  const highPriority = complaints.filter(c => c.priority === "High" && c.status !== "Resolved").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total</p>
          <p className="text-3xl font-extrabold text-gray-900">{total}</p>
        </div>
        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
          <FileText className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Pending</p>
          <p className="text-3xl font-extrabold text-gray-900">{pending}</p>
        </div>
        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
          <Clock className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Resolved</p>
          <p className="text-3xl font-extrabold text-gray-900">{resolved}</p>
        </div>
        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
          <CheckCircle2 className="w-6 h-6" />
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">High Priority Active</p>
          <p className="text-3xl font-extrabold text-gray-900">{highPriority}</p>
        </div>
        <div className="p-3 bg-red-50 text-red-600 rounded-xl">
          <AlertTriangle className="w-6 h-6" />
        </div>
      </div>

    </div>
  );
}
