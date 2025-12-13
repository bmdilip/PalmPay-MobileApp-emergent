import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Building2, Calendar, Check, ChevronRight, ArrowLeft, Ticket, MapPin, Search, Car, Library, Landmark } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import HoverCard3D from '../../components/premium/HoverCard3D';

const SmartCity = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { id: 'ev-1', title: 'Smart Parking', icon: Car, description: 'Find and pay for parking with palm', color: 'blue', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'ev-2', title: 'Event Ticketing', icon: Ticket, description: 'Concerts, sports, and exhibitions', color: 'purple', gradient: 'from-purple-500 to-violet-500' },
    { id: 'ev-3', title: 'Public Libraries', icon: Library, description: 'Libraries and community resources', color: 'green', gradient: 'from-green-500 to-emerald-500' },
    { id: 'ev-4', title: 'City Services', icon: Calendar, description: 'Municipal payments and bookings', color: 'indigo', gradient: 'from-indigo-500 to-blue-500' },
    { id: 'ev-5', title: 'Museums & Parks', icon: Landmark, description: 'Cultural venues and recreation', color: 'amber', gradient: 'from-amber-500 to-orange-500' },
    { id: 'ev-6', title: 'Community Centers', icon: Building2, description: 'Sports and recreation facilities', color: 'teal', gradient: 'from-teal-500 to-cyan-500' }
  ];

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-5 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connected to Smart City!</h2>
          <p className="text-gray-600 mb-4">Access city services with your palm</p>
          <Button onClick={() => navigate('/home')} className="w-full bg-indigo-600 hover:bg-indigo-700">Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5">
        <div className="flex items-center gap-3">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Smart City Services</h1>
            <p className="text-sm text-indigo-100">Connected urban living</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search city services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Services</h2>
            <div className="grid grid-cols-2 gap-3">
              {services.filter(service =>
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((service, idx) => (
                <motion.div key={service.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} onClick={() => { setSelectedService(service); setStep(2); }}>
                  <HoverCard3D>
                    <Card className={`p-5 cursor-pointer hover:shadow-xl h-32 flex flex-col items-center justify-center text-center bg-gradient-to-br ${service.gradient}`}>
                      <service.icon className="w-10 h-10 text-white mb-2" />
                      <h3 className="text-sm font-bold text-white">{service.title}</h3>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-5 mb-4">
              <h3 className="font-bold text-gray-800 mb-2">{selectedService.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{selectedService.description}</p>
              <div className="space-y-2">
                {['Cashless transactions', 'Skip queues', 'Digital receipts', 'Real-time updates'].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    {benefit}
                  </div>
                ))}
              </div>
            </Card>
            <div className="space-y-3">
              <Button onClick={() => setStep(3)} className="w-full bg-indigo-600 hover:bg-indigo-700 h-12">
                Enable Service (Demo)
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/smart-city' } })} 
                variant="outline"
                className="w-full border-indigo-400 text-indigo-600 hover:bg-indigo-50 h-12"
              >
                Register Palm for Smart City
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SmartCity;