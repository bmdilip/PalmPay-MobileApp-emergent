import React from 'react';
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
  LogOut
} from 'lucide-react';
import { mockUser } from '../mockData';

const Profile = () => {
  const menuItems = [
    { icon: CreditCard, label: 'Payment Methods', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Shield, label: 'Security & Privacy', color: 'text-green-600', bg: 'bg-green-100' },
    { icon: Bell, label: 'Notifications', color: 'text-orange-600', bg: 'bg-orange-100' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: Settings, label: 'Settings', color: 'text-gray-600', bg: 'bg-gray-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <button className="p-2 hover:bg-purple-500 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">My Profile</h1>
        </div>

        {/* Profile Info */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-3xl">
              {mockUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{mockUser.name}</h2>
              <p className="text-purple-200 text-sm mt-1">Gold Member</p>
            </div>
          </div>
          <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold">
            Edit Profile
          </Button>
        </Card>
      </div>

      <div className="px-4 mt-6">
        {/* Account Details */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Details</h3>
          <Card className="divide-y">
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Full Name</p>
                <p className="font-medium text-gray-800">{mockUser.name}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Phone Number</p>
                <p className="font-medium text-gray-800">{mockUser.phone}</p>
              </div>
            </div>
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <AtSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">UPI ID</p>
                <p className="font-medium text-gray-800">{mockUser.upiId}</p>
              </div>
            </div>
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

        <p className="text-center text-gray-400 text-sm mt-6">Version 25.01.28.0</p>
      </div>
    </div>
  );
};

export default Profile;