import { useState } from "react";
import ComplaintForm from "../components/ComplaintForm";
import MapPicker from "../components/MapPicker";
import { Sparkles, ShieldCheck } from "lucide-react";

export default function SubmitComplaint() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [coords, setCoords] = useState({ lat: null, lng: null });

  const handleLocationSelect = (address, lat, lng) => {
    setSelectedLocation(address);
    setCoords({ lat, lng });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 py-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-10">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-4 border border-blue-100 shadow-sm">
            <Sparkles className="h-3 w-3 mr-2" />
            Official Civic Service Portal
          </div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">
            Report a New Grievance
          </h1>
          <p className="text-slate-500 text-lg mt-2 max-w-2xl">
            Our intelligent system will analyze your complaint and direct it to the appropriate department with proper priority detection.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 hover:shadow-xl transition duration-300 relative overflow-hidden">
              <div className="relative z-10">
                <ComplaintForm externalLocation={selectedLocation} lat={coords.lat} lng={coords.lng} />
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-4 transform transition-all hover:shadow-xl duration-300">
              <MapPicker onLocationSelect={handleLocationSelect} />
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
               <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl"></div>
              
              <div className="flex items-center mb-6 border-b border-white/10 pb-4">
                <ShieldCheck className="h-6 w-6 mr-3 text-blue-200" />
                <h4 className="text-xl font-bold tracking-tight">How it works</h4>
              </div>
              
              <ul className="space-y-5">
                <li className="flex items-center gap-3 text-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-semibold text-xs">1</div>
                  <p className="font-medium leading-relaxed">Submit detailed description of the issue</p>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-semibold text-xs">2</div>
                  <p className="font-medium leading-relaxed">NLP engine extracts Category & Priority automatically</p>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-semibold text-xs">3</div>
                  <p className="font-medium leading-relaxed">Unique Tracking ID is generated instantly</p>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-semibold text-xs">4</div>
                  <p className="font-medium leading-relaxed">Admin receives & resolves issue with real-time updates</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
