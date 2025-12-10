import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft, 
  User, 
  Phone, 
  AtSign, 
  CreditCard, 
  Shield,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  LogOut,
  CheckCircle2,
  Building2
} from 'lucide-react';
import { mockUser, mockBanks } from '../mockDataPalmPay';
import { motion } from 'framer-motion';
import HoverCard3D from '../components/premium/HoverCard3D';
import StatusBadge from '../components/StatusBadge';
import { logoutUser } from '../utils/auth';

const PalmProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user session but keep onboarding flag
    logoutUser();
    // Redirect to auth page
    navigate('/auth');
  };

  const menuItems = [
    { icon: CreditCard, label: 'Auto-Pay / Mandates', color: 'text-[#586BFF]', bg: 'bg-[#586BFF]/10', path: '/autopay' },
    { icon: Shield, label: 'Limit Settings', color: 'text-[#9B62FF]', bg: 'bg-[#9B62FF]/10', path: '/limit-settings' },
    { icon: Bell, label: 'Offline Queue', color: 'text-orange-600', bg: 'bg-orange-100', path: '/offline-queue' },
    { icon: HelpCircle, label: 'Cashback & Rewards', color: 'text-green-600', bg: 'bg-green-100', path: '/cashback' },
    { icon: Settings, label: 'Language', color: 'text-blue-600', bg: 'bg-blue-100', path: '/language' },
    { icon: Settings, label: 'Settings', color: 'text-gray-600', bg: 'bg-gray-100', path: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate('/home')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">My Profile</h1>
          </div>

          {/* Profile Info */}
          <Card className="bg-gradient-to-r from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border border-white/20 p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-20 h-20 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                {mockUser.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                
                {/* Palm Status Badge */}
                <button 
                  onClick={() => navigate('/device-center')}
                  className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20"
                >
                  <div className={`w-2 h-2 rounded-full ${mockUser.palmEnabled ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
                  <span className="text-xs font-medium">
                    {mockUser.palmEnabled 
                      ? `Palm Registered` 
                      : 'Palm Not Registered'}
                  </span>
                  <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
            <Button className="w-full bg-white text-[#0A0F1F] hover:bg-gray-100 font-semibold">
              Edit Profile
            </Button>
          </Card>
        </div>
      </div>

      <div className="px-5 mt-6">
        {/* Role Switcher for Testing */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200">
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-bold text-gray-800">Switch Dashboard (Testing)</h3>
          </div>
          <p className="text-xs text-gray-600 mb-4">Quick access to different dashboards for testing</p>
          
          <div className="grid grid-cols-1 gap-3">
            {/* User Dashboard */}
            <button
              onClick={() => navigate('/home')}
              className="p-4 bg-white rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">User Dashboard</p>
                    <p className="text-xs text-gray-600">Main PalmPay app (Current)</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </button>

            {/* Admin Dashboard */}
            <button
              onClick={() => navigate('/admin')}
              className="p-4 bg-white rounded-xl border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Admin Dashboard</p>
                    <p className="text-xs text-gray-600">Manage users, devices & merchants</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
              </div>
            </button>

            {/* Merchant Dashboard */}
            <button
              onClick={() => navigate('/merchant')}
              className="p-4 bg-white rounded-xl border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all text-left group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">Merchant Dashboard</p>
                    <p className="text-xs text-gray-600">Accept payments & track sales</p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </div>
            </button>
          </div>

          <Card className="p-3 bg-blue-50 border-blue-200 mt-4">
            <p className="text-xs text-gray-700">
              <strong>💡 Testing Mode:</strong> These buttons allow you to quickly switch between different role dashboards. In production, access would be controlled by authentication.
            </p>
          </Card>
        </Card>

        {/* Account Details */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Account Details</h3>
          <Card className="divide-y">
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#586BFF]/10 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-[#586BFF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{mockUser.name}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#9B62FF]/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-[#9B62FF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">{mockUser.phone}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#64E8FF]/10 rounded-full flex items-center justify-center">
                <AtSign className="w-5 h-5 text-[#64E8FF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">UPI ID</p>
                <p className="font-medium text-gray-800">{mockUser.upiId}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-[#586BFF]/10 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#586BFF]" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Palm ID</p>
                <p className="font-medium text-gray-800 font-mono">{mockUser.palmId}</p>
              </div>
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            </div>
          </Card>
        </div>

        {/* PalmPe Device Authentication */}
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">PalmPe Device Authentication</h3>
          <Card className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Device Status</p>
                <p className="text-sm text-gray-500">Authentication enabled</p>
              </div>
              <div className="text-green-600 text-sm font-semibold bg-green-100 px-3 py-1 rounded-full">Active</div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Last Used Device</p>
                <p className="text-sm text-gray-500">PalmPe Terminal - MG Road</p>
              </div>
              <button className="text-sm text-[#586BFF] font-medium">View</button>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-800">Linked Merchant</p>
                <p className="text-sm text-gray-500">No merchant linked</p>
              </div>
              <button className="text-sm text-[#586BFF] font-medium">Link</button>
            </div>
            <Button 
              onClick={() => navigate('/device-locator')}
              className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] text-white mt-2"
            >
              View PalmPe Usage History
            </Button>
          </Card>
        </div>

        {/* Linked Banks */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-6"
        >
          <h3 className="text-lg font-bold text-gray-800 mb-3">Linked Bank Accounts</h3>
          <HoverCard3D>
            <Card className="divide-y">
              {mockBanks.map((bank, index) => (
                <motion.div 
                  key={bank.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: '#f9fafb' }}
                  className="p-4 flex items-center gap-4 group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                  >
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 group-hover:text-[#586BFF] transition-colors">{bank.name}</p>
                    <p className="text-sm text-gray-500">{bank.accountNumber}</p>
                  </div>
                  {bank.isPrimary && (
                    <motion.div 
                      whileHover={{ scale: 1.1 }}
                      className="text-xs bg-[#586BFF]/10 text-[#586BFF] px-2 py-1 rounded-full font-medium"
                    >
                      Primary
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </Card>
          </HoverCard3D>
        </motion.div>

        {/* Menu Items */}
        <div className="mb-6">
          <Card className="divide-y">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => item.path && navigate(item.path)}
                className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <span className="flex-1 text-left font-medium text-gray-800">{item.label}</span>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            ))}
          </Card>
        </div>

        {/* Logout Button */}
        <Button 
          variant="outline" 
          className="w-full border-red-500 text-red-500 hover:bg-red-50 font-semibold h-12"
        >
          <LogOut className="w-5 h-5 mr-2" />
          Logout
        </Button>

        <div className="mt-6 text-center space-y-1">
          <p className="text-xs text-gray-600 font-medium">PalmPe™ | PalmPay™</p>
          <p className="text-xs text-gray-500">© 2025 Lumioria Innovations Pvt. Ltd. All Rights Reserved.</p>
          <p className="text-xs text-gray-400">RBI Compliant • UPI Enabled</p>
          <p className="text-xs text-gray-400 mt-2">v1.0.0</p>
        </div>
      </div>
    </div>
  );
};

export default PalmProfile;