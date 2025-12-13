import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, Calendar, Check, ChevronRight, ArrowLeft, Ticket, MapPin, 
  Search, Car, Library, Landmark, Lock, Wifi, Bus, Droplet
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import HoverCard3D from '../../components/premium/HoverCard3D';
import PalmNFCIcon from '../../components/icons/PalmNFCIcon';

const SmartCity = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cities with Smart City integration
  const cities = {
    active: [
      { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', services: 12, palmPeEnabled: 8 },
      { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', services: 15, palmPeEnabled: 10 },
      { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', services: 18, palmPeEnabled: 12 },
      { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', services: 10, palmPeEnabled: 6 }
    ],
    upcoming: [
      { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', expected: 'Q1 2025' },
      { id: 'pune', name: 'Pune', state: 'Maharashtra', expected: 'Q2 2025' },
      { id: 'ahmedabad', name: 'Ahmedabad', state: 'Gujarat', expected: 'Q3 2025' }
    ]
  };

  const services = [
    { id: 'ev-1', title: 'Smart Parking', icon: Car, description: 'Find and pay for parking with palm', color: 'blue', gradient: 'from-blue-500 to-cyan-500', palmPe: true },
    { id: 'ev-2', title: 'Event Ticketing', icon: Ticket, description: 'Concerts, sports, and exhibitions', color: 'purple', gradient: 'from-purple-500 to-violet-500', palmPe: true },
    { id: 'ev-3', title: 'Public Libraries', icon: Library, description: 'Libraries and community resources', color: 'green', gradient: 'from-green-500 to-emerald-500', palmPe: true },
    { id: 'ev-4', title: 'City Services', icon: Calendar, description: 'Municipal payments and bookings', color: 'indigo', gradient: 'from-indigo-500 to-blue-500', palmPe: true },
    { id: 'ev-5', title: 'Museums & Parks', icon: Landmark, description: 'Cultural venues and recreation', color: 'amber', gradient: 'from-amber-500 to-orange-500', palmPe: true },
    { id: 'ev-6', title: 'Community Centers', icon: Building2, description: 'Sports and recreation facilities', color: 'teal', gradient: 'from-teal-500 to-cyan-500', palmPe: true },
    { id: 'ev-7', title: 'Public WiFi', icon: Wifi, description: 'Free WiFi with palm authentication', color: 'sky', gradient: 'from-sky-500 to-blue-500', palmPe: true },
    { id: 'ev-8', title: 'Public Transport', icon: Bus, description: 'Bus and tram services', color: 'rose', gradient: 'from-rose-500 to-pink-500', palmPe: true },
    { id: 'ev-9', title: 'Water Services', icon: Droplet, description: 'Water bill and usage tracking', color: 'cyan', gradient: 'from-cyan-500 to-teal-500', palmPe: false }
  ];

  // CITY SELECTION SCREEN
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Smart City Services</h1>
              <p className="text-sm text-indigo-100">Connected urban living</p>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* PalmPe Benefits Banner */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-indigo-500 to-blue-600 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <PalmNFCIcon className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">One Palm, All City Services</h3>
                <p className="text-sm text-indigo-100">Parking • Events • Libraries • Museums • Public WiFi</p>
              </div>
            </div>
          </Card>

          {/* Active Cities */}
          <h2 className="text-lg font-bold text-gray-800 mb-3">Select Your City</h2>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {cities.active.map((city, idx) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card 
                  className="p-4 cursor-pointer hover:shadow-lg hover:border-indigo-400 transition-all"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏙️</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{city.name}</h3>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{city.services} services</span>
                    <span className="flex items-center gap-1 text-indigo-600 font-semibold">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(4912%) hue-rotate(243deg)' }} />
                      {city.palmPeEnabled}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Upcoming Cities */}
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            Coming Soon
            <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Upcoming</span>
          </h2>
          <div className="space-y-2">
            {cities.upcoming.map((city) => (
              <Card key={city.id} className="p-3 bg-gray-50 border-dashed opacity-75">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-semibold text-gray-600">{city.name}</h3>
                      <p className="text-xs text-gray-400">{city.state}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {city.expected}
                  </span>
                </div>
              </Card>
            ))}
          </div>

          {/* How PalmPe Works */}
          <Card className="p-5 mt-6 bg-gradient-to-br from-gray-50 to-white">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(4912%) hue-rotate(243deg)' }} />
              How PalmPe Works in Smart Cities
            </h3>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Register Once', desc: 'Enroll at any city service kiosk' },
                { step: '2', title: 'Access Everywhere', desc: 'All city services recognize your palm' },
                { step: '3', title: 'Auto Pay', desc: 'Fees deducted from linked wallet' }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Register CTA */}
          <Button
            onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/smart-city' } })}
            className="w-full mt-4 h-12 bg-gradient-to-r from-indigo-500 to-blue-600"
          >
            <PalmNFCIcon className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
            Register Palm for Smart City
          </Button>
        </div>
      </div>
    );
  }

  // SUCCESS SCREEN
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white p-5 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1, rotate: 360 }} 
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-400 to-blue-500 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Connected to {selectedService?.title}!</h2>
          <p className="text-gray-600 mb-2">Access city services with your palm</p>
          
          <div className="bg-indigo-50 p-3 rounded-xl mb-4">
            <div className="flex items-center justify-center gap-2 text-indigo-700">
              <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(4912%) hue-rotate(243deg)' }} />
              <span className="text-sm font-semibold">PalmPe Enabled</span>
            </div>
            <p className="text-xs text-indigo-600 mt-1">Wave your palm at any {selectedService?.title} kiosk</p>
          </div>
          
          <Button onClick={() => { setStep(1); setSelectedService(null); }} className="w-full bg-indigo-600 hover:bg-indigo-700">
            Explore More Services
          </Button>
          <Button onClick={() => navigate('/home')} variant="outline" className="w-full mt-2">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  // MAIN SMART CITY INTERFACE (after city selection)
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-white pb-20">
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-5 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => step === 1 ? setSelectedCity(null) : setStep(step - 1)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Smart City Services</h1>
            <p className="text-sm text-indigo-100">{selectedCity.name} • {selectedCity.services} Services</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
            <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) invert(1)' }} />
            {selectedCity.palmPeEnabled} enabled
          </div>
        </div>
      </div>

      <div className="px-5 -mt-4">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Search Bar */}
            <Card className="p-4 mb-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search city services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            <h2 className="text-xl font-bold text-gray-800 mb-4">Available Services</h2>
            <div className="grid grid-cols-2 gap-3">
              {services.filter(service =>
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((service, idx) => (
                <motion.div 
                  key={service.id} 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ delay: idx * 0.05 }} 
                  onClick={() => { setSelectedService(service); setStep(2); }}
                >
                  <HoverCard3D>
                    <Card className={`p-5 cursor-pointer hover:shadow-xl h-32 flex flex-col items-center justify-center text-center bg-gradient-to-br ${service.gradient} relative overflow-hidden`}>
                      <service.icon className="w-10 h-10 text-white mb-2" />
                      <h3 className="text-sm font-bold text-white">{service.title}</h3>
                      {service.palmPe && (
                        <span className="absolute top-2 right-2 px-1.5 py-0.5 bg-white/20 text-white text-[9px] rounded-full flex items-center gap-0.5">
                          <PalmNFCIcon className="w-2.5 h-2.5" style={{ filter: 'brightness(0) invert(1)' }} />
                          PalmPe
                        </span>
                      )}
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>

            {/* Register Palm CTA */}
            <Card className="p-4 mt-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <PalmNFCIcon className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(4912%) hue-rotate(243deg)' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Enable All Services</p>
                  <p className="text-xs text-gray-600">Register palm for seamless access</p>
                </div>
                <Button
                  onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/smart-city' } })}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  Register
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 2 && selectedService && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Service Header */}
            <Card className={`p-5 mb-4 shadow-lg bg-gradient-to-br ${selectedService.gradient} text-white`}>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <selectedService.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedService.title}</h3>
                  <p className="text-sm text-white/80">{selectedService.description}</p>
                  {selectedService.palmPe && (
                    <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) invert(1)' }} />
                      PalmPe Enabled
                    </span>
                  )}
                </div>
              </div>
            </Card>
            
            {/* Benefits */}
            <Card className="p-5 mb-4 shadow-lg">
              <h4 className="font-bold text-gray-800 mb-3">Benefits with PalmPe</h4>
              <div className="space-y-2">
                {['Cashless transactions', 'Skip queues', 'Digital receipts', 'Real-time updates'].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    {benefit}
                  </div>
                ))}
              </div>
            </Card>

            {/* Nearby Locations */}
            <Card className="p-5 mb-4 shadow-lg">
              <h4 className="font-bold text-gray-800 mb-3">Nearby Locations</h4>
              <div className="space-y-3">
                {[
                  { name: `${selectedService.title} - Central`, distance: '0.5 km', status: 'Open' },
                  { name: `${selectedService.title} - North`, distance: '2.1 km', status: 'Open' },
                  { name: `${selectedService.title} - Mall`, distance: '3.5 km', status: 'Closed' }
                ].map((loc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-indigo-600" />
                      <div>
                        <p className="font-medium text-gray-800">{loc.name}</p>
                        <p className="text-xs text-gray-500">{loc.distance}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      loc.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {loc.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            
            <div className="space-y-3">
              <Button onClick={() => setStep(3)} className={`w-full bg-gradient-to-r ${selectedService.gradient} h-12`}>
                Enable Service (Demo)
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/smart-city' } })} 
                variant="outline"
                className="w-full border-indigo-400 text-indigo-600 hover:bg-indigo-50 h-12"
              >
                <PalmNFCIcon className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) saturate(100%) invert(26%) sepia(94%) saturate(4912%) hue-rotate(243deg)' }} />
                Register Palm for {selectedService.title}
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SmartCity;
