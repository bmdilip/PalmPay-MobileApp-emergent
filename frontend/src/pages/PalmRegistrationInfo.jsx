import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { Hand, MapPin, CheckCircle, ArrowLeft, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import PalmNFCIcon from '../components/icons/PalmNFCIcon';

const PalmRegistrationInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedCity, setSelectedCity] = useState(null);

  const returnTo = location.state?.returnTo || '/home';

  // Mock device locations
  const cities = [
    {
      id: 'bangalore',
      name: 'Bangalore',
      devices: [
        { id: 1, location: 'MG Road Metro Station', address: 'MG Road, Bangalore', type: 'Metro' },
        { id: 2, location: 'Koramangala PalmPay Center', address: '80 Feet Road, Koramangala', type: 'Center' },
        { id: 3, location: 'Whitefield Tech Park', address: 'ITPL Main Road, Whitefield', type: 'Corporate' }
      ]
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      devices: [
        { id: 4, location: 'Andheri Metro Station', address: 'Western Express Highway', type: 'Metro' },
        { id: 5, location: 'BKC PalmPay Center', address: 'Bandra Kurla Complex', type: 'Center' }
      ]
    },
    {
      id: 'delhi',
      name: 'Delhi',
      devices: [
        { id: 6, location: 'Connaught Place Metro', address: 'Rajiv Chowk', type: 'Metro' },
        { id: 7, location: 'Nehru Place Center', address: 'Nehru Place', type: 'Center' }
      ]
    }
  ];

  const handleContinue = () => {
    // Mock palm registration
    localStorage.setItem('palmRegistered', 'true');
    navigate(returnTo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#586BFF] to-[#9B62FF] text-white p-5">
        <div className="flex items-center gap-3 mb-4">
          <button 
            onClick={() => navigate(-1)} 
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Palm Registration Required</h1>
            <p className="text-sm text-indigo-100">One-time setup for secure access</p>
          </div>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Explanation Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-6 bg-white border-indigo-200">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center"
              >
                <PalmNFCIcon className="w-16 h-16" />
              </motion.div>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-800 text-center mb-2">
              How PalmPay Works
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6 leading-relaxed">
              PalmPay uses your unique palm vein pattern for secure, touchless authentication. 
              Register once at any PalmPay device to access all services.
            </p>

            {/* Benefits */}
            <div className="space-y-3 mb-6">
              {[
                'No cards, no phones needed',
                'Secure biometric authentication',
                'Works across all touchpoints',
                'One-time registration'
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-700">{benefit}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Device Locations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-3">
            Find Nearest PalmPay Device
          </h3>

          {/* City Selection */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {cities.map((city) => (
              <button
                key={city.id}
                onClick={() => setSelectedCity(city.id)}
                className={`
                  py-2 px-3 rounded-xl text-sm font-medium transition-all
                  ${selectedCity === city.id 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-white text-gray-700 border border-gray-200'
                  }
                `}
              >
                {city.name}
              </button>
            ))}
          </div>

          {/* Device List */}
          {selectedCity && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-2"
            >
              {cities.find(c => c.id === selectedCity)?.devices.map((device, idx) => (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-indigo-500">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">
                          {device.location}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {device.address}
                        </p>
                        <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-700 text-[10px] font-semibold rounded-full">
                          {device.type}
                        </span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.div>

        {/* Info Box */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            <strong>Registration takes only 30 seconds.</strong> Visit any PalmPay device, 
            follow the on-screen instructions, and you're ready to use all PalmPay services.
          </p>
        </Card>

        {/* CTA Buttons */}
        <div className="space-y-3 pt-2">
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white h-12 font-semibold"
          >
            I've Already Registered
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
          <Button
            onClick={() => navigate('/home')}
            variant="outline"
            className="w-full h-12"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PalmRegistrationInfo;
