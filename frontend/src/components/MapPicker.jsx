import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LocateFixed, MapPin, Navigation, Loader2 } from 'lucide-react';
import axios from 'axios';

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

// Custom priority-based animated markers for consistency
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

L.Marker.prototype.options.icon = DefaultIcon;

// Helper component to update map view (zoom/center) when position changes externally
function MapViewUpdater({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 16, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

function LocationMarker({ position, setPosition, address, setAddress, loading, setLoading, onLocationSelect }) {
  useMapEvents({
    click: async (e) => {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setLoading(true);
      setAddress("Fetching address...");

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
        );
        const displayAddress = response.data.display_name;
        setAddress(displayAddress);
        onLocationSelect(displayAddress, lat, lng);
      } catch (error) {
        console.error("Error fetching address:", error);
        setAddress("Error fetching address");
      } finally {
        setLoading(false);
      }
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={mediumPriorityIcon}>
      <Popup>
        <div className="text-xs font-medium">
          {loading ? "Loading..." : address}
        </div>
      </Popup>
    </Marker>
  );
}

export default function MapPicker({ onLocationSelect }) {
  const [position, setPosition] = useState(null);
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");

  const defaultPosition = [12.9716, 77.5946]; // Bangalore coords

  const handleUseCurrentLocation = () => {
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }

    setLocating(true);
    setLocError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const newPos = { lat: latitude, lng: longitude };
        setPosition(newPos);
        setLoading(true);
        setAddress("Fetching current address...");

        try {
          const response = await axios.get(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const displayAddress = response.data.display_name;
          setAddress(displayAddress);
          onLocationSelect(displayAddress, latitude, longitude);
        } catch (error) {
          console.error("Error fetching address:", error);
          setAddress("Error fetching address");
        } finally {
          setLoading(false);
          setLocating(false);
        }
      },
      (error) => {
        setLocating(false);
        if (error.code === error.PERMISSION_DENIED) {
          setLocError("Location access denied. Please allow location access.");
        } else {
          setLocError("Unable to retrieve your location.");
        }
      },
      { enableHighAccuracy: true }
    );
  };

  return (
    <div className="bg-white overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide flex items-center">
          <LocateFixed className="w-4 h-4 mr-2 text-blue-600" />
          Pin Issue Location
        </h3>

        <button
          onClick={handleUseCurrentLocation}
          disabled={locating}
          className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow-sm transition duration-200 active:scale-95 disabled:opacity-70"
        >
          {locating ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Navigation className="w-4 h-4 mr-2" />
          )}
          Use Current Location
        </button>
      </div>

      {locError && (
        <div className="mb-4 px-4 py-2 bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-tight border border-red-100 rounded-lg animate-in fade-in slide-in-from-top-1">
          {locError}
        </div>
      )}

      <div className="h-[280px] w-full relative z-0 p-1 border border-slate-200 rounded-xl overflow-hidden">
        <MapContainer
          center={defaultPosition}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker
            position={position}
            setPosition={setPosition}
            address={address}
            setAddress={setAddress}
            loading={loading}
            setLoading={setLoading}
            onLocationSelect={onLocationSelect}
          />
          <MapViewUpdater position={position} />
        </MapContainer>

        <div className="absolute bottom-4 left-4 right-4 z-[1000] pointer-events-none">
          <div className="bg-white/90 backdrop-blur rounded-lg shadow-md border border-slate-200 px-3 py-2 flex items-center gap-3">
            <div className="bg-blue-50 p-1.5 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase leading-none mb-1">Location Status</p>
              <p className="text-xs font-medium text-slate-600 leading-none truncate max-w-[180px]">
                {address || "Tap map to pinpoint"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
