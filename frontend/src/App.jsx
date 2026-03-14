import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ShieldAlert, Home as HomeIcon, LayoutDashboard, PlusCircle, Search } from "lucide-react";

import Home from "./pages/Home";
import SubmitComplaint from "./pages/SubmitComplaint";
import TrackComplaint from "./pages/TrackComplaint";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function Navigation() {
  const location = useLocation();
  const getLinkClass = (path) => {
    return location.pathname === path
      ? "inline-flex items-center px-3 py-2 rounded-xl bg-blue-50 text-blue-700 text-sm font-bold transition-all duration-200"
      : "inline-flex items-center px-3 py-2 rounded-xl text-gray-500 hover:bg-gray-50 hover:text-blue-600 text-sm font-semibold transition-all duration-200";
  };

  return (
    <nav className="bg-white/90 backdrop-blur-xl shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center justify-between w-full">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2.5 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl group-hover:scale-105 transition-transform shadow-md shadow-blue-500/20">
                <ShieldAlert className="h-6 w-6 text-white" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 hidden sm:block">
                PGIR Platform
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-2 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
              <Link to="/" className={getLinkClass("/")}>
                <HomeIcon className="w-4 h-4 mr-2" /> Home
              </Link>
              <Link to="/submit" className={getLinkClass("/submit")}>
                <PlusCircle className="w-4 h-4 mr-2" /> Submit
              </Link>
              <Link to="/track" className={getLinkClass("/track")}>
                <Search className="w-4 h-4 mr-2" /> Track
              </Link>
              <Link to="/admin" className={getLinkClass("/admin")}>
                <LayoutDashboard className="w-4 h-4 mr-2" /> Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 flex flex-col font-sans selection:bg-blue-200 to-blue-50/30">
        <Navigation />

        <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex flex-col relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/submit" element={<SubmitComplaint />} />
            <Route path="/track" element={<TrackComplaint />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<AdminLogin />} />
          </Routes>
        </main>
        
        <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-100 mt-auto py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
               <ShieldAlert className="h-5 w-5 text-gray-400" />
               <p className="text-center font-semibold text-sm text-gray-500">
                © {new Date().getFullYear()} PGIR Platform.
              </p>
            </div>
            <p className="text-sm font-medium text-gray-400">Streamlining Municipal Issue Resolution</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;