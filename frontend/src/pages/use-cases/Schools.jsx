import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GraduationCap, MapPin, Check, ChevronRight, ArrowLeft, Users, BookOpen, Coffee, CreditCard } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import HoverCard3D from '../../components/premium/HoverCard3D';
import { LoadingSpinner } from '../../components/StateComponents';

const Schools = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
  const [institutions, setInstitutions] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [userType, setUserType] = useState('student');
  const [studentId, setStudentId] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/use-cases/schools/cities`);
      const data = await response.json();
      setCities(data.cities);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstitutions = async (cityId, type) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/use-cases/schools/${cityId}/list?institution_type=${type}`
      );
      const data = await response.json();
      setInstitutions(data.institutions);
      setStep(3);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/use-cases/schools/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: selectedCity.id,
          institution_id: selectedInstitution.id,
          user_type: userType,
          palm_id: 'PALM' + Date.now(),
          student_id: studentId
        })
      });
      setSuccess(true);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const serviceIcons = {
    attendance: Users,
    canteen: Coffee,
    fees: CreditCard,
    library: BookOpen,
    transport: Users
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-white p-5 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-violet-500 flex items-center justify-center"
          >
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Registered Successfully!</h2>
          <p className="text-gray-600 mb-4">Your palm is now linked to {selectedInstitution.name}</p>
          <div className="bg-purple-50 p-4 rounded-xl mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-2">Linked Services:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {selectedInstitution.services.map(service => (
                <span key={service} className="px-3 py-1 bg-purple-200 text-purple-800 text-xs rounded-full">
                  {service}
                </span>
              ))}
            </div>
          </div>
          <Button onClick={() => navigate('/home')} className="w-full bg-purple-600 hover:bg-purple-700">
            Go to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-violet-50 to-white">
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-5">
        <div className="flex items-center gap-3 mb-3">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Schools & Colleges</h1>
            <p className="text-sm text-purple-100">Smart campus payments & authentication</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className={`h-1 flex-1 rounded-full ${s <= step ? 'bg-white' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      <div className="p-5">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select City</h2>
            <div className="grid grid-cols-2 gap-3">
              {cities.map((city, idx) => (
                <motion.div key={city.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }} onClick={() => { setSelectedCity(city); setStep(2); }}>
                  <HoverCard3D>
                    <Card className="p-5 cursor-pointer hover:shadow-xl">
                      <MapPin className="w-8 h-8 text-purple-600 mb-2" />
                      <h3 className="font-bold text-gray-800">{city.name}</h3>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Institution Type</h2>
            <div className="space-y-3">
              {['All', 'School', 'College'].map((type, idx) => (
                <motion.div key={type} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }} onClick={() => { setSelectedType(type.toLowerCase()); fetchInstitutions(selectedCity.id, type.toLowerCase()); }}>
                  <HoverCard3D>
                    <Card className="p-5 cursor-pointer hover:shadow-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="w-8 h-8 text-purple-600" />
                        <h3 className="font-bold text-gray-800">{type}</h3>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Select Institution</h2>
            <div className="space-y-3">
              {institutions.map((inst, idx) => (
                <motion.div key={inst.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => { setSelectedInstitution(inst); setStep(4); }}>
                  <HoverCard3D>
                    <Card className="p-4 cursor-pointer hover:shadow-xl">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-800">{inst.name}</h3>
                          <p className="text-xs text-gray-500">{inst.type} • {inst.students} students</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {inst.services.map(service => (
                          <span key={service} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {service}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Complete Registration</h2>
            <Card className="p-5 mb-4">
              <h3 className="font-bold text-gray-800 mb-3">{selectedInstitution.name}</h3>
              <div className="space-y-4">
                <div>
                  <Label>I am a</Label>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    {['student', 'parent', 'staff'].map(type => (
                      <button key={type} onClick={() => setUserType(type)} className={`py-2 rounded-lg text-sm font-medium ${userType === type ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                {(userType === 'student' || userType === 'parent') && (
                  <div>
                    <Label>Student ID / Roll Number</Label>
                    <Input value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Enter student ID" className="mt-1" />
                  </div>
                )}
              </div>
            </Card>
            <Button onClick={handleRegister} disabled={loading || (userType !== 'staff' && !studentId)} className="w-full bg-purple-600 hover:bg-purple-700 h-12">
              {loading ? 'Registering...' : 'Register Palm'}
              {!loading && <ChevronRight className="w-5 h-5 ml-2" />}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Schools;