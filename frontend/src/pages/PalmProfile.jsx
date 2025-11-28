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

const PalmProfile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: CreditCard, label: 'Payment Methods', color: 'text-[#586BFF]', bg: 'bg-[#586BFF]/10' },
    { icon: Shield, label: 'Security & Privacy', color: 'text-[#9B62FF]', bg: 'bg-[#9B62FF]/10' },
    { icon: Bell, label: 'Notifications', color: 'text-[#64E8FF]', bg: 'bg-[#64E8FF]/10' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-[#586BFF]', bg: 'bg-[#586BFF]/10' },
    { icon: Settings, label: 'Settings', color: 'text-gray-600', bg: 'bg-gray-100' },
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
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-[#64E8FF]/20 px-3 py-1 rounded-full border border-[#64E8FF]/30">
                    <span className="text-xs text-[#64E8FF] font-medium">Palm Verified</span>
                  </div>
                </div>
              </div>
            </div>
            <Button className="w-full bg-white text-[#0A0F1F] hover:bg-gray-100 font-semibold">
              Edit Profile
            </Button>
          </Card>
        </div>
      </div>

      <div className="px-5 mt-6">
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
        <div className="mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-3">Linked Bank Accounts</h3>
          <Card className="divide-y">
            {mockBanks.map((bank) => (
              <div key={bank.id} className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{bank.name}</p>
                  <p className="text-sm text-gray-500">{bank.accountNumber}</p>
                </div>
                {bank.isPrimary && (
                  <div className="text-xs bg-[#586BFF]/10 text-[#586BFF] px-2 py-1 rounded-full font-medium">Primary</div>
                )}
              </div>
            ))}
          </Card>
        </div>

        {/* Menu Items */}
        <div className="mb-6">
          <Card className="divide-y">
            {menuItems.map((item, index) => (
              <button
                key={index}
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

        <div className="mt-6 text-center space-y-2">
          <p className="text-xs text-gray-400">PalmPay v1.0.0</p>
          <p className="text-xs text-gray-400">By Lumioria Innovations Pvt. Ltd.</p>
          <p className="text-xs text-gray-400">RBI Compliant • UPI Enabled</p>
        </div>
      </div>
    </div>
  );
};

export default PalmProfile;