import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Smartphone, 
  Store, 
  ArrowLeftRight, 
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import Logo from '../components/Logo';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { id: 'users', label: 'Users', icon: Users, path: '/admin/users' },
    { id: 'devices', label: 'Devices', icon: Smartphone, path: '/admin/devices' },
    { id: 'merchants', label: 'Merchants', icon: Store, path: '/admin/merchants' },
    { id: 'transactions', label: 'Transactions', icon: ArrowLeftRight, path: '/admin/transactions' },
  ];

  const handleLogout = () => {
    if (window.confirm('Logout?')) {
      navigate('/profile');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Top Bar - Always Visible */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between flex-shrink-0 z-50 relative">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
          </button>
          <Logo size="sm" />
          <div>
            <h1 className="text-base font-bold text-gray-800">PalmPay Admin</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#586BFF] to-[#8B8FFF] flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Mobile Backdrop - Only show on mobile when sidebar is open */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - HIDE on mobile by default */}
        <div className={`
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 
          fixed lg:static 
          top-14 lg:top-0
          left-0 
          w-64 
          h-[calc(100vh-3.5rem)] lg:h-full
          bg-gradient-to-b from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] 
          text-white 
          transition-transform duration-300 ease-in-out
          flex flex-col 
          z-50 lg:z-auto
          shadow-2xl lg:shadow-none
        `}>
          {/* Menu Items */}
          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    navigate(item.path);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm ${
                    isActive
                      ? 'bg-[#586BFF] text-white shadow-lg'
                      : 'hover:bg-white/10 text-white/70 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-white/10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-all text-sm"
            >
              <LogOut className="w-4 h-4 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 lg:p-6 max-w-7xl mx-auto">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;