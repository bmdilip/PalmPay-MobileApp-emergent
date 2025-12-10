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
import { motion } from 'framer-motion';
import HoverCard3D from '../components/premium/HoverCard3D';
import StatusBadge from '../components/StatusBadge';
import MeshGradientBackground from '../components/animated/MeshGradientBackground';
import DotGridBackground from '../components/animated/DotGridBackground';
import ParticleField from '../components/animated/ParticleField';
import { SpotlightCard } from '../components/premium';

const Profile = () => {
  const menuItems = [
    { icon: CreditCard, label: 'Payment Methods', color: 'text-blue-600', bg: 'bg-blue-100' },
    { icon: Shield, label: 'Security & Privacy', color: 'text-green-600', bg: 'bg-green-100' },
    { icon: Bell, label: 'Notifications', color: 'text-orange-600', bg: 'bg-orange-100' },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-purple-600', bg: 'bg-purple-100' },
    { icon: Settings, label: 'Settings', color: 'text-gray-600', bg: 'bg-gray-100' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20 relative overflow-x-hidden">
      {/* SAME Background Layers from Home Page */}
      <MeshGradientBackground />
      <DotGridBackground />
      <ParticleField count={20} />
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-6 rounded-b-3xl shadow-lg"
      >
        <div className="flex items-center gap-4 mb-6">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-purple-500 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </motion.button>
          <h1 className="text-xl font-semibold">My Profile</h1>
        </div>

        {/* Profile Info */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
            <div className="flex items-center gap-4 mb-4">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-3xl shadow-lg"
              >
                {mockUser.name.charAt(0)}
              </motion.div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                <div className="mt-2">
                  <StatusBadge status="success" text="Gold Member" size="sm" />
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold">
                Edit Profile
              </Button>
            </motion.div>
          </Card>
        </motion.div>
      </motion.div>

      <div className="px-4 mt-6">
        {/* Account Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Account Details</h3>
          <SpotlightCard>
            <Card className="divide-y">
              <motion.div 
                whileHover={{ x: 5 }}
                className="p-4 flex items-center gap-4"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
                >
                  <User className="w-5 h-5 text-purple-600" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Full Name</p>
                  <p className="font-medium text-gray-800">{mockUser.name}</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="p-4 flex items-center gap-4"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <Phone className="w-5 h-5 text-blue-600" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">Phone Number</p>
                  <p className="font-medium text-gray-800">{mockUser.phone}</p>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="p-4 flex items-center gap-4"
              >
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"
                >
                  <AtSign className="w-5 h-5 text-green-600" />
                </motion.div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">UPI ID</p>
                  <p className="font-medium text-gray-800">{mockUser.upiId}</p>
                </div>
              </motion.div>
            </Card>
          </SpotlightCard>
        </motion.div>

        {/* Menu Items */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <SpotlightCard>
            <Card className="divide-y">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: '#f9fafb' }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full p-4 flex items-center gap-4 transition-colors text-left group"
                >
                  <motion.div 
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-10 h-10 ${item.bg} rounded-full flex items-center justify-center`}
                  >
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </motion.div>
                  <span className="flex-1 font-medium text-gray-800 group-hover:text-purple-600 transition-colors">{item.label}</span>
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                  </motion.div>
                </motion.button>
              ))}
            </Card>
          </SpotlightCard>
        </motion.div>

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="w-full border-red-500 text-red-500 hover:bg-red-50 font-semibold h-12"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </motion.div>

        <p className="text-center text-gray-400 text-sm mt-6">Version 25.01.28.0</p>
      </div>
    </div>
  );
};

export default Profile;