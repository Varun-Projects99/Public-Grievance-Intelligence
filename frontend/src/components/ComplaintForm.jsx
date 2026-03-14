import { useState, useEffect } from "react";
import api from "../api/axios";
import { CheckCircle2, RotateCw, ImagePlus, AlertTriangle, MapPin } from "lucide-react";

export default function ComplaintForm({ externalLocation, lat, lng }) {
  const [formData, setFormData] = useState({
    description: "",
    location: "",
    category: "",
  });

  useEffect(() => {
    if (externalLocation) {
      setFormData(prev => ({ ...prev, location: externalLocation }));
    }
  }, [externalLocation]);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear duplicate warning if description changes
    if (e.target.name === "description") setDuplicateWarning(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e, force = false) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      formDataToSend.append("location", formData.location || "Unknown Location");
      formDataToSend.append("ignore_duplicate", force ? "true" : "false");
      
      if (lat) formDataToSend.append("latitude", lat);
      if (lng) formDataToSend.append("longitude", lng);

      if (image) {
        formDataToSend.append("file", image);
      }

      const response = await api.post("/complaints", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.duplicate_found && !force) {
        setDuplicateWarning(response.data.existing_complaint_id);
        setIsLoading(false);
        return;
      }

      setResult(response.data);
      setFormData({ description: "", location: "", category: "" });
      setDuplicateWarning(null);
      setImage(null);
      setPreview(null);
    } catch (err) {
      setError("Failed to submit grievance. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (result) {
    return (
      <div className="text-center animate-in zoom-in-95 duration-500 py-8">
        <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 mb-6 border-4 border-emerald-50 shadow-inner">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h3 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">Grievance Submitted!</h3>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed">
          Your complaint has been automatically categorized and prioritized by our AI system.
        </p>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 border border-gray-200 mb-8 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Your Tracking ID</p>
          <p className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600 tracking-wider font-mono">
            {result.complaint_id}
          </p>
          <p className="text-sm text-gray-500 mt-4 font-medium">
            Please save this ID securely to track your complaint status later.
          </p>
        </div>

        <button
          onClick={() => setResult(null)}
          className="inline-flex justify-center transition-all py-4 px-8 border border-transparent shadow-md shadow-blue-500/20 text-base font-bold rounded-xl text-white bg-blue-600 hover:bg-blue-700 hover:-translate-y-0.5"
        >
          Submit Another Grievance
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      {error && (
        <div className="mb-8 bg-red-50 border-l-4 border-red-500 text-red-700 px-6 py-4 rounded-r-xl text-sm font-medium shadow-sm animate-in fade-in">
          {error}
        </div>
      )}

      {duplicateWarning && (
        <div className="mb-8 bg-amber-50 border-l-4 border-amber-500 text-amber-800 px-6 py-4 rounded-r-xl text-sm font-medium shadow-sm animate-in fade-in flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold mb-1">Potential Duplicate Found</p>
            <p className="mb-3 leading-relaxed">
              A similar complaint already exists with tracking ID: <span className="font-mono font-bold bg-amber-100 px-1 rounded">{duplicateWarning}</span>.
              Please check if your issue is already being addressed.
            </p>
            <button
              type="button"
              onClick={() => handleSubmit(null, true)}
              className="text-amber-900 font-bold underline hover:text-amber-700 transition-colors"
            >
              I'm sure, submit anyway
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            What is the issue? <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            className="block w-full min-h-[120px] rounded-xl border border-slate-300 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 sm:text-base p-4 outline-none resize-none hover:border-slate-400"
            placeholder="E.g., Garbage has not been collected near Whitefield bus stop for 3 days."
            value={formData.description}
            onChange={handleChange}
            required
          />
          <p className="mt-2 text-xs text-slate-500 font-medium flex items-center">
            <SparklesIcon className="w-3 h-3 mr-1.5 text-blue-500" />
            Provide detailed text. Our AI will automatically extract categories.
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Location Details <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="location"
            className="block w-full rounded-xl border border-slate-300 bg-slate-50 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition duration-200 sm:text-base p-4 outline-none hover:border-slate-400"
            placeholder="E.g., 1st Main Rd, Whitefield"
            value={formData.location}
            onChange={handleChange}
            required
          />
          {formData.location && externalLocation === formData.location && (
            <p className="mt-2 text-[10px] font-bold text-emerald-600 flex items-center animate-in fade-in slide-in-from-left-2 uppercase tracking-wider">
              <MapPin className="w-3 h-3 mr-1" />
              Location detected from map
            </p>
          )}
        </div>

        <div>
          <label className="text-sm font-semibold text-slate-700 block mb-2">
            Upload Supporting Image
          </label>

          <div className="mt-1 flex justify-center px-6 pt-6 pb-6 border-2 border-slate-200 border-dashed rounded-xl bg-slate-50 hover:bg-blue-50 hover:border-blue-300 transition-all cursor-pointer group relative overflow-hidden">
            {preview ? (
              <div className="absolute inset-0 z-0 opacity-5 blur-sm scale-110">
                <img src={preview} alt="Background Preview" className="w-full h-full object-cover" />
              </div>
            ) : null}

            <div className="space-y-2 text-center relative z-10">
              {preview ? (
                <div className="mx-auto w-24 h-24 bg-white rounded-lg flex items-center justify-center shadow-md mb-2 border border-blue-200 overflow-hidden group-hover:scale-105 transition-transform duration-300">
                  <img src={preview} alt="Selected" className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="mx-auto w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300">
                  <ImagePlus className="h-6 w-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
              )}

              <div className="flex text-sm justify-center text-slate-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-transparent rounded-md font-semibold text-blue-600 hover:text-blue-700 focus-within:outline-none"
                >
                  <span>{preview ? "Change Photo" : "Click to upload photo"}</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </label>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {image ? image.name : "Maximum file size 5MB"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md transition duration-200 hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <RotateCw className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Processing...
            </>
          ) : (
            "Submit Grievance"
          )}
        </button>
      </div>
    </form>
  );
}

// Simple icon for the hint
function SparklesIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
    </svg>
  )
}
