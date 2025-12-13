import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Train, MapPin, Check, ChevronRight, ArrowLeft, Sparkles, Search } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import HoverCard3D from '../../components/premium/HoverCard3D';
import { LoadingSpinner } from '../../components/StateComponents';

const MetroTransit = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [stations, setStations] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedTransport, setSelectedTransport] = useState('metro');
  const [success, setSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/use-cases/metro/cities`
      );
      const data = await response.json();
      setCities(data.cities);
    } catch (err) {
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStations = async (cityId) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/use-cases/metro/${cityId}/stations?transport_type=${selectedTransport}`
      );
      const data = await response.json();
      setStations(data.stations);
      setStep(3);
    } catch (err) {
      console.error('Error fetching stations:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setStep(2);
  };

  const handleTransportSelect = (type) => {
    setSelectedTransport(type);
    fetchStations(selectedCity.id);
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/use-cases/metro/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            city: selectedCity.id,
            transport_type: selectedTransport,
            palm_id: 'PALM' + Date.now()
          })
        }
      );
      await response.json();
      setSuccess(true);
    } catch (err) {
      console.error('Error registering:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && cities.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-5">
        <LoadingSpinner message="Loading metro services..." />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white p-5 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring' }}
        >
          <Card className="p-8 text-center max-w-md">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
            >
              <Check className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-6">
              Your palm has been registered for {selectedCity.name} {selectedTransport}. You can now tap and go!
            </p>
            <div className="space-y-2 mb-6 text-left">
              {['Tap-and-go entry/exit', 'No cards needed', 'Auto-recharge', 'Journey tracking'].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <Sparkles className="w-4 h-4 text-green-500" />
                  {benefit}
                </motion.div>
              ))}
            </div>
            <Button onClick={() => navigate('/home')} className="w-full bg-blue-600 hover:bg-blue-700">
              Go to Home
            </Button>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Metro & Transit</h1>
            <p className="text-sm text-blue-100">Register your palm for seamless travel</p>
          </div>
        </div>
        {/* Progress */}
        <div className="flex gap-2 mt-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${
              s <= step ? 'bg-white' : 'bg-white/30'
            }`} />
          ))}
        </div>
      </div>

      <div className="p-5">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search cities, stations, or lines..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {/* Step 1: City Selection */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select Your City</h2>
            <div className="grid grid-cols-2 gap-3">
              {cities.filter(city => 
                city.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                city.state.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((city, idx) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleCitySelect(city)}
                >
                  <HoverCard3D>
                    <Card className="p-5 cursor-pointer hover:shadow-xl transition-all">
                      <MapPin className="w-8 h-8 text-blue-600 mb-2" />
                      <h3 className="font-bold text-gray-800">{city.name}</h3>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Transport Type */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select Transport Type</h2>
            <div className="space-y-3">
              {['Metro', 'Bus', 'Local Train'].map((type, idx) => (
                <motion.div
                  key={type}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  onClick={() => handleTransportSelect(type.toLowerCase().replace(' ', '-'))}
                >
                  <HoverCard3D>
                    <Card className="p-5 cursor-pointer hover:shadow-xl transition-all flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Train className="w-8 h-8 text-blue-600" />
                        <div>
                          <h3 className="font-bold text-gray-800">{type}</h3>
                          <p className="text-xs text-gray-500">{selectedCity.name} {type}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 3: Station List & Register */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">PalmPe Enabled Stations</h2>
            <div className="space-y-3 mb-6">
              {stations.filter(station =>
                station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                station.line.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((station, idx) => (
                <motion.div
                  key={station.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className={`p-4 ${
                    station.palmPay_enabled ? 'border-green-300 bg-green-50' : 'opacity-60'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{station.name}</h3>
                        <p className="text-xs text-gray-500">{station.line}</p>
                      </div>
                      {station.palmPay_enabled && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                          <Sparkles className="w-3 h-3" />
                          Live
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <Button
              onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/metro' } })}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-12"
            >
              {loading ? 'Registering...' : 'Register Palm for Transit'}
              {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MetroTransit;