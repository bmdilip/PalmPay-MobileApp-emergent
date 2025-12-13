import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, MapPin, Check, ChevronRight, ArrowLeft, Users, 
  Coffee, CreditCard, Search, Calendar, Clock, Bus, FileText, Bell,
  IndianRupee, QrCode, Wallet, Lock
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import PalmNFCIcon from '../../components/icons/PalmNFCIcon';

const Schools = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeTab, setActiveTab] = useState('institutions');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('palm');

  // Cities
  const cities = {
    active: [
      { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', institutions: 45, palmPeEnabled: 28 },
      { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', institutions: 68, palmPeEnabled: 42 },
      { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', institutions: 52, palmPeEnabled: 35 },
      { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', institutions: 38, palmPeEnabled: 22 }
    ],
    upcoming: [
      { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', expected: 'Q1 2025' },
      { id: 'pune', name: 'Pune', state: 'Maharashtra', expected: 'Q2 2025' },
      { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', expected: 'Q2 2025' }
    ]
  };

  // Children data
  const children = [
    { 
      id: 'child-1', 
      name: 'Aryan Sharma', 
      class: 'Class 8-A', 
      school: 'DPS Whitefield',
      rollNo: '2024081042',
      photo: '👦',
      attendance: 94,
      pendingFees: 25000,
      canteenBalance: 850
    },
    { 
      id: 'child-2', 
      name: 'Aanya Sharma', 
      class: 'Class 5-B', 
      school: 'DPS Whitefield',
      rollNo: '2024051023',
      photo: '👧',
      attendance: 97,
      pendingFees: 22000,
      canteenBalance: 420
    }
  ];

  // Institutions by city
  const institutionsData = {
    bangalore: [
      { id: 'dps-wf', name: 'DPS Whitefield', type: 'School', grades: 'Pre-KG to Class 12', students: 2500, palmPe: true, services: ['Fee Payment', 'Canteen', 'Transport', 'Attendance'] },
      { id: 'ryan', name: 'Ryan International', type: 'School', grades: 'LKG to Class 10', students: 1800, palmPe: true, services: ['Fee Payment', 'Canteen', 'Transport'] },
      { id: 'bis', name: 'Bangalore Intl School', type: 'School', grades: 'Nursery to Class 12', students: 1200, palmPe: true, services: ['Fee Payment', 'Canteen', 'Library'] },
      { id: 'iisc', name: 'IISc Bangalore', type: 'University', grades: 'UG, PG, PhD', students: 4500, palmPe: true, services: ['Fee Payment', 'Canteen', 'Library', 'Hostel', 'Gym'] },
      { id: 'christ', name: 'Christ University', type: 'University', grades: 'UG, PG', students: 8000, palmPe: true, services: ['Fee Payment', 'Canteen', 'Library'] },
      { id: 'pes', name: 'PES University', type: 'University', grades: 'B.Tech, M.Tech', students: 6000, palmPe: false, services: ['Fee Payment', 'Canteen'] }
    ]
  };

  // Fee structure
  const feeStructure = [
    { id: 'tuition', name: 'Tuition Fee (Q3)', amount: 18000, dueDate: '15 Dec 2024', status: 'due' },
    { id: 'annual', name: 'Annual Fee', amount: 5000, dueDate: '1 Jan 2025', status: 'upcoming' },
    { id: 'transport', name: 'Transport Fee (Dec)', amount: 2000, dueDate: '10 Dec 2024', status: 'overdue' },
    { id: 'activity', name: 'Activity Fee', amount: 3500, dueDate: '20 Dec 2024', status: 'due' }
  ];

  // Canteen menu
  const canteenMenu = [
    { id: 'meal-1', name: 'South Indian Thali', price: 80, category: 'Meals', available: true },
    { id: 'meal-2', name: 'North Indian Thali', price: 90, category: 'Meals', available: true },
    { id: 'snack-1', name: 'Samosa (2 pcs)', price: 20, category: 'Snacks', available: true },
    { id: 'snack-2', name: 'Sandwich', price: 35, category: 'Snacks', available: true },
    { id: 'drink-1', name: 'Fresh Juice', price: 40, category: 'Beverages', available: true }
  ];

  const currentInstitutions = selectedCity ? institutionsData[selectedCity.id] || [] : [];
  const filteredInstitutions = currentInstitutions.filter(inst =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePayFee = (fee) => {
    setSelectedFee(fee);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowPaymentModal(false);
      setPaymentSuccess(true);
      setTimeout(() => setPaymentSuccess(false), 3000);
    }, 2000);
  };

  // CITY SELECTION SCREEN
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-5 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Education</h1>
              <p className="text-sm text-purple-100">Schools • Colleges • Universities</p>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* PalmPe Benefits */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <PalmNFCIcon className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Campus Goes Phone-Free</h3>
                <p className="text-sm text-purple-100">Attendance • Canteen • Library • Fees - All with Palm</p>
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
                  className="p-4 cursor-pointer hover:shadow-lg hover:border-purple-400 transition-all"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🎓</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{city.name}</h3>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{city.institutions} institutions</span>
                    <span className="flex items-center gap-1 text-purple-600 font-semibold">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(96%) saturate(1231%) hue-rotate(246deg)' }} />
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
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">{city.expected}</span>
                </div>
              </Card>
            ))}
          </div>

          {/* PalmPe Campus Benefits */}
          <Card className="p-5 mt-6 bg-gradient-to-br from-purple-50 to-violet-50">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(96%) saturate(1231%) hue-rotate(246deg)' }} />
              PalmPe on Campus
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '✓', title: 'Attendance', desc: 'Auto mark with palm' },
                { icon: '🍽️', title: 'Canteen', desc: 'No cash needed' },
                { icon: '📚', title: 'Library', desc: 'Instant access' },
                { icon: '💳', title: 'Fee Payment', desc: '2% cashback' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg">
                  <span className="text-lg">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Button
            onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/schools' } })}
            className="w-full mt-4 h-12 bg-gradient-to-r from-purple-500 to-violet-600"
          >
            <PalmNFCIcon className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
            Register Palm for Campus
          </Button>
        </div>
      </div>
    );
  }

  // MAIN INTERFACE (after city selection)
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-5 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedCity(null)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Education</h1>
            <p className="text-sm text-purple-100">{selectedCity.name} • {selectedCity.institutions} Institutions</p>
          </div>
        </div>

        <div className="flex gap-1 bg-white/10 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'institutions', label: 'Find', icon: GraduationCap },
            { id: 'fees', label: 'Fees', icon: IndianRupee },
            { id: 'canteen', label: 'Canteen', icon: Coffee },
            { id: 'transport', label: 'Transport', icon: Bus }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium ${
                activeTab === tab.id ? 'bg-white text-purple-600' : 'text-white/80'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 -mt-14">
        {/* INSTITUTIONS TAB */}
        {activeTab === 'institutions' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-4 mb-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search schools, colleges..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            <div className="space-y-3">
              {filteredInstitutions.map((inst, idx) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card className="p-4 cursor-pointer hover:shadow-lg">
                    <div className="flex gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                        inst.type === 'School' ? 'bg-purple-100' : 'bg-blue-100'
                      }`}>
                        {inst.type === 'School' ? '🏫' : '🎓'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <h3 className="font-bold text-gray-800">{inst.name}</h3>
                            <p className="text-xs text-gray-500">{inst.grades}</p>
                          </div>
                          {inst.palmPe && (
                            <span className="flex items-center gap-1 px-2 py-0.5 bg-purple-100 text-purple-600 text-[10px] font-bold rounded-full">
                              <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(96%) saturate(1231%) hue-rotate(246deg)' }} />
                              PalmPe
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {inst.students.toLocaleString()}
                          </span>
                          <span>{inst.type}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {inst.services.slice(0, 3).map(service => (
                            <span key={service} className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] rounded-full">
                              {service}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-4 mt-4 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(96%) saturate(1231%) hue-rotate(246deg)' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">Enable PalmPe for Campus</p>
                  <p className="text-xs text-gray-600">Attendance, canteen, library - one palm</p>
                </div>
                <Button
                  onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/schools' } })}
                  size="sm"
                  className="bg-purple-600"
                >
                  Register
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* FEES TAB */}
        {activeTab === 'fees' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-4 mb-4 shadow-lg">
              <Label className="text-xs text-gray-500 mb-2 block">SELECT CHILD</Label>
              <div className="grid grid-cols-2 gap-2">
                {children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChild(child)}
                    className={`p-3 rounded-xl text-left ${
                      selectedChild?.id === child.id ? 'bg-purple-100 border-2 border-purple-600' : 'bg-gray-50 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{child.photo}</span>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{child.name}</p>
                        <p className="text-xs text-gray-500">{child.class}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            {selectedChild && (
              <>
                <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-purple-600 to-violet-600 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-purple-100">Pending Fees</p>
                      <p className="text-3xl font-bold">₹{selectedChild.pendingFees.toLocaleString()}</p>
                    </div>
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                      <IndianRupee className="w-7 h-7" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                    <PalmNFCIcon className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                    <span className="text-sm">Pay with PalmPe • Get 2% cashback</span>
                  </div>
                </Card>

                <Card className="p-5 shadow-lg">
                  <h3 className="font-semibold text-gray-800 mb-4">Fee Details</h3>
                  <div className="space-y-3">
                    {feeStructure.map(fee => (
                      <div key={fee.id} className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-semibold text-gray-800">{fee.name}</p>
                            <p className="text-xs text-gray-500">Due: {fee.dueDate}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            fee.status === 'overdue' ? 'bg-red-100 text-red-600' :
                            fee.status === 'due' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                          }`}>
                            {fee.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-800">₹{fee.amount.toLocaleString()}</span>
                          <Button onClick={() => handlePayFee(fee)} size="sm" className="bg-purple-600">Pay Now</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}
          </motion.div>
        )}

        {/* CANTEEN TAB */}
        {activeTab === 'canteen' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-orange-100">Canteen Balance</p>
                  <p className="text-3xl font-bold">₹{children[0]?.canteenBalance || 0}</p>
                </div>
                <Button variant="outline" className="bg-white/20 border-white/30 text-white">+ Recharge</Button>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                <PalmNFCIcon className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                <span className="text-sm">Wave palm at counter to pay</span>
              </div>
            </Card>

            {/* PalmPe Pay Instructions */}
            <Card className="p-4 mb-4 bg-orange-50 border-orange-200">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(17deg)' }} />
                How to Pay at Canteen
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>1. Collect your food from the counter</p>
                <p>2. Wave your palm at the PalmPe device</p>
                <p>3. Amount auto-deducted from balance</p>
              </div>
            </Card>

            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Today&apos;s Menu</h3>
              <div className="space-y-3">
                {['Meals', 'Snacks', 'Beverages'].map(category => (
                  <div key={category}>
                    <p className="text-xs font-semibold text-gray-500 mb-2">{category}</p>
                    <div className="space-y-2">
                      {canteenMenu.filter(item => item.category === category).map(item => (
                        <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                          <div>
                            <p className="font-medium text-gray-800">{item.name}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">₹{item.price}</span>
                            <Button size="sm" className="bg-orange-500">Add</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* TRANSPORT TAB */}
        {activeTab === 'transport' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Bus className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-sm text-blue-100">Next Pickup</p>
                  <p className="text-2xl font-bold">7:15 AM</p>
                  <p className="text-sm text-blue-100">Route A - Whitefield</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/10 rounded-lg p-2">
                <PalmNFCIcon className="w-4 h-4" style={{ filter: 'brightness(0) invert(1)' }} />
                <span className="text-sm">Palm scan for boarding verification</span>
              </div>
            </Card>

            <Card className="p-5 mb-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Live Tracking</h3>
              <div className="relative py-4">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
                {['Home', 'Stop 3 - MG Road', 'Stop 5 - Indiranagar', 'School'].map((stop, idx) => (
                  <div key={stop} className="relative flex items-center gap-4 mb-4 last:mb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      idx === 0 ? 'bg-green-500' : idx === 3 ? 'bg-blue-600' : 'bg-blue-200'
                    }`}>
                      {idx === 0 ? '🏠' : idx === 3 ? '🏫' : <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{stop}</p>
                      <p className="text-xs text-gray-500">
                        {idx === 0 ? 'Pickup: 7:15 AM' : idx === 3 ? 'Arrival: 8:00 AM' : `ETA: ${7 + idx}:${20 + idx * 5} AM`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Button
              onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/schools' } })}
              variant="outline"
              className="w-full border-blue-400 text-blue-600"
            >
              <PalmNFCIcon className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(199deg)' }} />
              Register Palm for Transport
            </Button>
          </motion.div>
        )}
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedFee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Pay Fee</h3>
              
              <div className="bg-purple-50 p-4 rounded-xl mb-4">
                <p className="text-sm text-gray-600">{selectedFee.name}</p>
                <p className="text-3xl font-bold text-purple-600">₹{selectedFee.amount.toLocaleString()}</p>
              </div>

              <div className="space-y-2 mb-4">
                {[
                  { id: 'palm', label: 'PalmPe', desc: '2% cashback', recommended: true },
                  { id: 'upi', label: 'UPI', desc: 'GPay, PhonePe' },
                  { id: 'card', label: 'Card', desc: 'Credit/Debit' }
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-3 rounded-xl border-2 flex items-center gap-3 ${
                      paymentMethod === method.id ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                    }`}
                  >
                    {method.id === 'palm' ? (
                      <PalmNFCIcon className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(96%) saturate(1231%) hue-rotate(246deg)' }} />
                    ) : (
                      <CreditCard className="w-6 h-6 text-gray-600" />
                    )}
                    <div className="text-left flex-1">
                      <p className="font-medium">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.desc}</p>
                    </div>
                    {method.recommended && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full">Best</span>
                    )}
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">Cancel</Button>
                <Button onClick={processPayment} disabled={loading} className="flex-1 bg-purple-600">
                  {loading ? 'Processing...' : `Pay ₹${selectedFee.amount.toLocaleString()}`}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success Toast */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 left-5 right-5 bg-green-600 text-white p-4 rounded-xl flex items-center gap-3"
          >
            <Check className="w-6 h-6" />
            <div>
              <p className="font-semibold">Payment Successful!</p>
              <p className="text-sm text-green-100">Receipt sent to your email</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schools;
