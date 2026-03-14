import { MapPin, AlertCircle } from "lucide-react";

export default function ComplaintTable({ complaints, onStatusUpdate }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Resolved': return 'bg-emerald-100 text-emerald-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-amber-100 text-amber-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50 p-1';
      case 'Low': return 'text-green-600 bg-green-50 p-1';
      default: return 'text-yellow-600 bg-yellow-50 p-1';
    }
  };

  const getSeverityColor = (score) => {
    if (score >= 8) return 'bg-red-600 text-white';
    if (score >= 4) return 'bg-amber-500 text-white';
    return 'bg-emerald-500 text-white';
  };

  if (!complaints.length) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center text-gray-500 italic">
        No complaints found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Complaint</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Severity</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category & Dept</th>
              <th scope="col" className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th scope="col" className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {complaints.map((complaint) => (
              <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-l-[3px] border-transparent hover:border-blue-500">
                  {complaint.id}
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm font-medium text-gray-900 truncate max-w-xs" title={complaint.description}>
                    {complaint.description}
                  </div>
                  <div className="text-xs text-gray-500 mt-1 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" /> {complaint.location}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 inline-flex text-xs leading-5 font-black rounded-lg shadow-sm ${getSeverityColor(complaint.severity_score)}`}>
                      {complaint.severity_score || 0}
                    </span>
                    {complaint.emergency && (
                      <span className="flex items-center text-[10px] font-black text-red-600 uppercase tracking-tighter animate-pulse">
                        <AlertCircle className="w-3 h-3 mr-0.5" /> Emergency
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1 items-start">
                    <span className="px-2.5 py-0.5 inline-flex text-[10px] leading-4 font-black rounded bg-gray-100 text-gray-800 uppercase tracking-wider">
                      {complaint.category || "General"}
                    </span>
                    <span className="text-[11px] font-bold text-gray-500 italic">
                      {complaint.department}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${getStatusColor(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <select
                    className="ml-auto block w-32 border-gray-300 rounded-lg shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm bg-gray-50 cursor-pointer font-medium p-2 outline-none border"
                    value={complaint.status}
                    onChange={(e) => onStatusUpdate(complaint.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
