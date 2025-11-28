import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import PalmRegister from "./pages/PalmRegister";
import PalmHome from "./pages/PalmHome";
import Services from "./pages/Services";
import Palm2QR from "./pages/Palm2QR";
import POSMode from "./pages/POSMode";
import PalmTransfer from "./pages/PalmTransfer";
import PalmHistory from "./pages/PalmHistory";
import PalmProfile from "./pages/PalmProfile";
import { Toaster } from "./components/ui/toaster";
import { Home as HomeIcon, Grid3x3, ArrowLeftRight, Clock, User } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide navigation on certain pages
  const hideNavPages = ['/', '/onboarding', '/palm-register', '/palm2qr', '/pos-mode'];
  if (hideNavPages.includes(location.pathname)) {
    return null;
  }

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, path: '/home' },
    { id: 'services', label: 'Services', icon: Grid3x3, path: '/services' },
    { id: 'transfer', label: 'Transfer', icon: ArrowLeftRight, path: '/transfer' },
    { id: 'history', label: 'History', icon: Clock, path: '/history' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className=\"fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50\">
      <div className=\"max-w-md mx-auto flex items-center justify-around py-2\">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-[#586BFF]' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs ${isActive ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="max-w-md mx-auto bg-white min-h-screen relative">
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/palm-register" element={<PalmRegister />} />
            <Route path="/home" element={<PalmHome />} />
            <Route path="/services" element={<Services />} />
            <Route path="/palm2qr" element={<Palm2QR />} />
            <Route path="/pos-mode" element={<POSMode />} />
            <Route path="/transfer" element={<PalmTransfer />} />
            <Route path="/history" element={<PalmHistory />} />
            <Route path="/profile" element={<PalmProfile />} />
          </Routes>
          <BottomNavigation />
        </div>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
