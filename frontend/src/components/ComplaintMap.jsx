import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MapPin } from 'lucide-react';

// Fix typical Leaflet icon issues in React
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Custom priority-based animated markers
const highPriorityIcon = new L.DivIcon({
  className: "",
  html: '<div class="high-priority-marker"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});

const mediumPriorityIcon = new L.DivIcon({
  className: "",
  html: '<div class="medium-priority-marker"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

const lowPriorityIcon = new L.DivIcon({
  className: "",
  html: '<div class="low-priority-marker"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8]
});

function getPriorityIcon(priority) {
  if (priority === "High") return highPriorityIcon;
  if (priority === "Medium") return mediumPriorityIcon;
  return lowPriorityIcon;
}

L.Marker.prototype.options.icon = DefaultIcon;

export default function ComplaintMap({ complaints }) {
  const defaultPosition = [12.9716, 77.5946]; // Bangalore coords

  // Filter complaints that have coordinates
  const mappedComplaints = complaints.filter(c => c.latitude && c.longitude);

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/40 border border-gray-100 overflow-hidden h-[500px] w-full relative z-0">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 relative z-10">
        <h3 className="font-extrabold text-gray-900 flex items-center tracking-tight">
          <MapPin className="w-5 h-5 mr-2 text-red-600" /> 
          Complaint Hotspots Map
        </h3>
        <span className="bg-red-100 text-red-800 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-tighter">
          {mappedComplaints.length} Geotagged Records
        </span>
      </div>
      
      <div className="h-full w-full">
        <MapContainer 
          center={defaultPosition} 
          zoom={12} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mappedComplaints.map((complaint) => (
            <Marker 
              key={complaint.id} 
              position={[complaint.latitude, complaint.longitude]} 
              icon={getPriorityIcon(complaint.priority)}
            >
              <Popup className="custom-popup">
                <div className="p-1">
                  <p className="font-black text-blue-700 text-sm mb-1">{complaint.id}</p>
                  <p className="text-xs font-bold text-gray-800 mb-2 line-clamp-2">{complaint.description}</p>
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded text-[10px] font-bold uppercase">
                      {complaint.category}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      complaint.priority === 'High' ? 'bg-red-100 text-red-700' : 
                      complaint.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 
                      'bg-green-100 text-green-700'
                    }`}>
                      {complaint.priority}
                    </span>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
