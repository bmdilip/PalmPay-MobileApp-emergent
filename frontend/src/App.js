import React, { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Transfer from "./pages/Transfer";
import History from "./pages/History";
import Profile from "./pages/Profile";
import { Toaster } from "./components/ui/toaster";
import { Home as HomeIcon, Store, ArrowLeftRight, Clock, User } from "lucide-react";

const BottomNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon, path: '/' },
    { id: 'stores', label: 'Stores', icon: Store, path: '/stores' },
    { id: 'transfer', label: 'Transfer', icon: ArrowLeftRight, path: '/transfer' },
    { id: 'history', label: 'History', icon: Clock, path: '/history' },
    { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-md mx-auto flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                isActive ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
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

const StoresPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20 px-4 pt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Stores</h1>
      <div className="grid grid-cols-2 gap-4">
        {['Amazon', 'Flipkart', 'Swiggy', 'Zomato', 'Uber', 'Ola', 'BookMyShow', 'MakeMyTrip'].map((store) => (
          <div key={store} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg mb-3">
              {store.charAt(0)}
            </div>
            <p className="font-semibold text-gray-800">{store}</p>
            <p className="text-sm text-gray-500 mt-1">Shop & Pay</p>
          </div>
        ))}
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
            <Route path="/" element={<Home />} />
            <Route path="/stores" element={<StoresPage />} />
            <Route path="/transfer" element={<Transfer />} />
            <Route path="/history" element={<History />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <BottomNavigation />
        </div>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;
