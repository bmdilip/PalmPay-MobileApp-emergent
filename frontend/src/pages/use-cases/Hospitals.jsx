import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Hospital, MapPin, Check, ChevronRight, ArrowLeft, Clock, Star, Navigation } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import HoverCard3D from '../../components/premium/HoverCard3D';
import { LoadingSpinner } from '../../components/StateComponents';

const Hospitals = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Bangalore default

  // Mock hospitals with location data
  const hospitals = [
    {
      id: 'hosp-1',
      name: 'Apollo Hospitals',
      address: 'Bannerghatta Road, Bangalore',
      distance: '2.3 km',
      rating: 4.8,
      services: ['OPD', 'Emergency', 'Pharmacy', 'Lab'],
      palmPay: true,
      waitTime: '15 mins',
      lat: 12.9110,
      lng: 77.5985
    },
    {
      id: 'hosp-2',
      name: 'Manipal Hospital',
      address: 'HAL Airport Road, Bangalore',
      distance: '4.1 km',
      rating: 4.7,
      services: ['OPD', 'Emergency', 'ICU', 'Pharmacy'],
      palmPay: true,
      waitTime: '20 mins',
      lat: 12.9579,
      lng: 77.6447
    },
    {
      id: 'hosp-3',
      name: 'Fortis Hospital',
      address: 'Cunningham Road, Bangalore',
      distance: '3.5 km',
      rating: 4.6,
      services: ['OPD', 'Cardiology', 'Neurology', 'Lab'],
      palmPay: true,
      waitTime: '10 mins',
      lat: 12.9991,
      lng: 77.5937
    },
    {
      id: 'hosp-4',
      name: 'Narayana Health',
      address: 'Bommasandra, Bangalore',
      distance: '8.2 km',
      rating: 4.5,
      services: ['OPD', 'Surgery', 'Emergency', 'Pharmacy'],
      palmPay: false,
      waitTime: '25 mins',
      lat: 12.8069,
      lng: 77.6806
    }
  ];

  const handleHospitalSelect = (hospital) => {
    setSelectedHospital(hospital);
    setStep(2);
  };

  const handleRegister = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStep(3);
    setLoading(false);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-white p-5 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: 'spring' }} className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
          <p className="text-gray-600 mb-4">Your palm is now registered at {selectedHospital.name}</p>
          <div className="bg-red-50 p-4 rounded-xl mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Fast-Track Services:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedHospital.services.map(service => (
                <span key={service} className="px-3 py-1 bg-red-200 text-red-800 text-xs rounded-full">{service}</span>
              ))}
            </div>
          </div>
          <Button onClick={() => navigate('/home')} className="w-full bg-red-600 hover:bg-red-700">Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-white">
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-5">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Healthcare</h1>
            <p className="text-sm text-red-100">Fast, secure hospital payments</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {[1, 2].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      <div className="p-5">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-800">Nearby Hospitals</h2>
              <button className="flex items-center gap-1 text-sm text-red-600 font-medium">
                <Navigation className="w-4 h-4" />
                Use GPS
              </button>
            </div>
            <div className="space-y-3">
              {hospitals.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance)).map((hospital, idx) => (
                <motion.div key={hospital.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => handleHospitalSelect(hospital)}>
                  <HoverCard3D>
                    <Card className={`p-4 cursor-pointer hover:shadow-xl transition-all ${!hospital.palmPay ? 'opacity-60' : 'border-green-300'}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-800">{hospital.name}</h3>
                            {hospital.palmPay && <div className="px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">PalmPay</div>}
                          </div>
                          <p className="text-xs text-gray-500 mb-1">{hospital.address}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="flex items-center gap-1 text-gray-600">
                              <MapPin className="w-3 h-3" />
                              {hospital.distance}
                            </span>
                            <span className="flex items-center gap-1 text-yellow-600">
                              <Star className="w-3 h-3 fill-yellow-500" />
                              {hospital.rating}
                            </span>
                            <span className="flex items-center gap-1 text-blue-600">
                              <Clock className="w-3 h-3" />
                              {hospital.waitTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hospital.services.map(service => (
                          <span key={service} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">{service}</span>
                        ))}
                      </div>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedHospital && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Register at Hospital</h2>
            <Card className="p-5 mb-4">
              <h3 className="font-bold text-gray-800 mb-3">{selectedHospital.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Register your palm for fast-track OPD, pharmacy, and lab services. Skip queues and pay instantly.</p>
              <div className="space-y-2 mb-4">
                {['Skip registration queues', 'Instant payments', 'Digital health records', 'Pharmacy access'].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-green-600" />
                    {benefit}
                  </div>
                ))}
              </div>
            </Card>
            <Button onClick={handleRegister} disabled={loading} className="w-full bg-red-600 hover:bg-red-700 h-12">
              {loading ? 'Registering...' : 'Register Palm for Healthcare'}
              {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;