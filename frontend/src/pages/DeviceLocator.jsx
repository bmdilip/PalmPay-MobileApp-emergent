import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, MapPin, Eye, Navigation, Search } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';

const DeviceLocator = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Bangalore default

  const returnTo = location.state?.returnTo || '/home';

  // Mock nearby devices with real-looking data
  const [devices] = useState([
    {
      id: 1,
      name: 'PalmPe Device - MG Road',
      location: 'MG Road Metro Station, Brigade Road',
      distance: '0.5 km',
      status: 'Online',
      type: 'Metro Station',
      waitTime: '2 mins',
      icon: '🚇'
    },
    {
      id: 2,
      name: 'PalmPe Device - Phoenix Mall',
      location: 'Phoenix Marketcity, Whitefield',
      distance: '3.2 km',
      status: 'Online',
      type: 'Shopping Mall',
      waitTime: '5 mins',
      icon: '🏬'
    },
    {
      id: 3,
      name: 'PalmPe Device - Indiranagar',
      location: '100 Feet Road, Indiranagar',
      distance: '2.8 km',
      status: 'Offline',
      type: 'PalmPe Center',
      waitTime: 'Offline',
      icon: '🏢'
    },
    {
      id: 4,
      name: 'PalmPe Device - Koramangala',
      location: '5th Block, Koramangala',
      distance: '4.1 km',
      status: 'Online',
      type: 'PalmPe Center',
      waitTime: '3 mins',
      icon: '🏢'
    },
    {
      id: 5,
      name: 'PalmPe Device - Bangalore Airport',
      location: 'Terminal 1, Arrival Hall',
      distance: '35.2 km',
      status: 'Online',
      type: 'Airport',
      waitTime: '1 min',
      icon: '✈️'
    }
  ]);

  const filteredDevices = devices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartEnrollment = () => {
    navigate('/palm-enrollment', { state: { returnTo } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-5 sticky top-0 z-10">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white">Find PalmPe Devices</h1>
            <p className="text-sm text-indigo-100">Locate nearby registration terminals</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by location or area"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:bg-white/20 focus:border-white/40"
          />
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="p-4 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30">
            <p className="text-sm text-white leading-relaxed">
              <strong className="text-blue-200">Important:</strong> Palm registration must be completed at a PalmPe terminal. Walk-in or book a slot at any active device below.
            </p>
          </Card>
        </motion.div>

        {/* Start Enrollment Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            onClick={handleStartEnrollment}
            className="w-full h-14 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold text-base rounded-xl shadow-lg"
          >
            <span className="text-2xl mr-2">👋</span>
            Start PalmPe Enrollment
          </Button>
        </motion.div>

        {/* Device List */}
        <div className="space-y-3">
          {filteredDevices.map((device, idx) => (
            <motion.div
              key={device.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + idx * 0.05 }}
            >
              <Card 
                className={`p-4 bg-white/10 backdrop-blur-sm border transition-all hover:bg-white/20 cursor-pointer ${
                  device.status === 'Online' 
                    ? 'border-green-400/30 hover:border-green-400/50' 
                    : 'border-gray-500/30 opacity-60'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/30 flex items-center justify-center text-3xl flex-shrink-0">
                    {device.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-bold text-white">{device.name}</h3>
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4 text-white/60" />
                        <span className={`text-xs font-semibold ${
                          device.status === 'Online' ? 'text-green-400' : 'text-gray-400'
                        }`}>
                          {device.status}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-white/70 mb-2">{device.location}</p>

                    <div className="flex items-center gap-3 text-xs text-white/60">
                      <span className="flex items-center gap-1">
                        <Navigation className="w-3 h-3" />
                        {device.distance}
                      </span>
                      <span>•</span>
                      <span>{device.type}</span>
                      {device.status === 'Online' && (
                        <>
                          <span>•</span>
                          <span className="text-green-400">Wait: {device.waitTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredDevices.length === 0 && (
          <Card className="p-8 text-center bg-white/10 backdrop-blur-sm border-white/20">
            <MapPin className="w-12 h-12 text-white/40 mx-auto mb-3" />
            <p className="text-white/70">No devices found matching "{searchQuery}"</p>
            <p className="text-sm text-white/50 mt-1">Try a different search term</p>
          </Card>
        )}

        {/* Help Text */}
        <Card className="p-4 bg-purple-500/20 backdrop-blur-sm border border-purple-400/30">
          <p className="text-sm text-white leading-relaxed">
            <strong className="text-purple-200">Registration takes only 30 seconds.</strong> Visit any online device, follow the on-screen instructions, and you're ready to use all PalmPe services.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DeviceLocator;
