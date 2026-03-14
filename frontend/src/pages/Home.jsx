import { Link } from "react-router-dom";
import { ArrowRight, FileText, CheckCircle, BarChart3, Search, ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center flex-grow space-y-20 pb-20 animate-in fade-in zoom-in-95 duration-700">
      
      {/* Dynamic Hero Section with Gradient Background */}
      <div className="relative w-full overflow-hidden bg-white">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden z-0">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-20 -left-20 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-emerald-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-8 border border-blue-200 shadow-sm backdrop-blur-sm">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-600 mr-2.5 animate-pulse"></span>
            AI-Powered Resolution Platform
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
            Report Issues, <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
              Get Results.
            </span>
          </h1>
          
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 font-medium leading-relaxed">
            The fastest way to connect with city officials, report local grievances, and track the progress of your requests in real-time.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/submit"
              className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-bold rounded-2xl text-white bg-blue-600 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-1"
            >
              Submit Grievance
              <ArrowRight className="ml-2 -mr-1 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/track"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-gray-200 text-lg font-bold rounded-2xl text-gray-700 bg-white hover:bg-gray-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-300"
            >
              Track Status
              <Search className="ml-2 -mr-1 h-5 w-5 text-gray-400 group-hover:text-blue-500" />
            </Link>
          </div>
        </div>
      </div>

      {/* Modern Features Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 inline-flex items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
              <FileText className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Easy Submission</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Report problems quickly with our streamlined form. Upload photos and provide location details effortlessly.
            </p>
             <Link to="/submit" className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800">
              Try it now <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 inline-flex items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
              <CheckCircle className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Smart Ticketing</h3>
            <p className="text-gray-500 leading-relaxed">
              Our NLP AI automatically categorizes and prioritizes your grievance to ensure it reaches the right department instantly.
            </p>
          </div>
          
          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
            <div className="w-14 h-14 inline-flex items-center justify-center rounded-2xl bg-amber-50 text-amber-600 mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
              <BarChart3 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 mb-3">Live Tracking</h3>
            <p className="text-gray-500 leading-relaxed mb-6">
              Stay informed with real-time status updates. Track your complaint from submission to resolution directly on our portal.
            </p>
            <Link to="/track" className="inline-flex items-center text-amber-600 font-semibold hover:text-amber-800">
              Track an issue <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}