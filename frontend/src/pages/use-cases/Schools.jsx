import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, MapPin, Check, ChevronRight, ArrowLeft, Users, BookOpen, 
  Coffee, CreditCard, Search, Calendar, Clock, Bus, FileText, Bell,
  IndianRupee, QrCode, Wallet, TrendingUp, AlertCircle, ChevronDown
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import HoverCard3D from '../../components/premium/HoverCard3D';

const Schools = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('schools'); // schools, fees, canteen, transport
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedFee, setSelectedFee] = useState(null);

  // Mock children data (for logged-in parent)
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

  // Institutions data
  const institutions = [
    {
      id: 'dps-wf',
      name: 'DPS Whitefield',
      type: 'School',
      address: 'Whitefield, Bangalore',
      students: 2500,
      rating: 4.8,
      palmPe: true,
      services: ['Fee Payment', 'Canteen', 'Transport', 'Library', 'Sports'],
      grades: 'Pre-KG to Class 12'
    },
    {
      id: 'ryan-int',
      name: 'Ryan International School',
      type: 'School',
      address: 'Kundalahalli, Bangalore',
      students: 1800,
      rating: 4.6,
      palmPe: true,
      services: ['Fee Payment', 'Canteen', 'Transport'],
      grades: 'LKG to Class 10'
    },
    {
      id: 'bis',
      name: 'Bangalore International School',
      type: 'School',
      address: 'Hennur, Bangalore',
      students: 1200,
      rating: 4.7,
      palmPe: true,
      services: ['Fee Payment', 'Canteen', 'Library'],
      grades: 'Nursery to Class 12'
    },
    {
      id: 'iisc',
      name: 'IISc Bangalore',
      type: 'University',
      address: 'Malleswaram, Bangalore',
      students: 4500,
      rating: 4.9,
      palmPe: true,
      services: ['Fee Payment', 'Canteen', 'Library', 'Hostel', 'Gym'],
      grades: 'UG, PG, PhD'
    },
    {
      id: 'christ',
      name: 'Christ University',
      type: 'University',
      address: 'Hosur Road, Bangalore',
      students: 8000,
      rating: 4.5,
      palmPe: true,
      services: ['Fee Payment', 'Canteen', 'Library', 'Sports'],
      grades: 'UG, PG'
    },
    {
      id: 'pes',
      name: 'PES University',
      type: 'University',
      address: 'Banashankari, Bangalore',
      students: 6000,
      rating: 4.4,
      palmPe: true,
      services: ['Fee Payment', 'Canteen', 'Hostel'],
      grades: 'B.Tech, M.Tech, MBA'
    }
  ];

  // Fee structure
  const feeStructure = [
    { id: 'tuition', name: 'Tuition Fee (Q3)', amount: 18000, dueDate: '15 Dec 2024', status: 'due', type: 'quarterly' },
    { id: 'annual', name: 'Annual Fee', amount: 5000, dueDate: '1 Jan 2025', status: 'upcoming', type: 'annual' },
    { id: 'transport', name: 'Transport Fee (Dec)', amount: 2000, dueDate: '10 Dec 2024', status: 'overdue', type: 'monthly' },
    { id: 'activity', name: 'Activity Fee', amount: 3500, dueDate: '20 Dec 2024', status: 'due', type: 'semester' }
  ];

  // Canteen menu
  const canteenMenu = [
    { id: 'meal-1', name: 'South Indian Thali', price: 80, category: 'Meals', available: true },
    { id: 'meal-2', name: 'North Indian Thali', price: 90, category: 'Meals', available: true },
    { id: 'snack-1', name: 'Samosa (2 pcs)', price: 20, category: 'Snacks', available: true },
    { id: 'snack-2', name: 'Sandwich', price: 35, category: 'Snacks', available: true },
    { id: 'drink-1', name: 'Fresh Juice', price: 40, category: 'Beverages', available: true },
    { id: 'drink-2', name: 'Milkshake', price: 50, category: 'Beverages', available: false }
  ];

  // Transport routes
  const transportRoutes = [
    { id: 'route-1', name: 'Route A - Whitefield', stops: 12, fee: 2000, nextPickup: '7:15 AM' },
    { id: 'route-2', name: 'Route B - Marathahalli', stops: 8, fee: 1800, nextPickup: '7:30 AM' },
    { id: 'route-3', name: 'Route C - Indiranagar', stops: 10, fee: 2200, nextPickup: '7:00 AM' }
  ];

  // Recent transactions
  const transactions = [
    { id: 1, type: 'fee', desc: 'Tuition Fee (Q2)', amount: -18000, date: '15 Sep 2024' },
    { id: 2, type: 'canteen', desc: 'Canteen Recharge', amount: 1000, date: '10 Dec 2024' },
    { id: 3, type: 'transport', desc: 'Transport Fee (Nov)', amount: -2000, date: '1 Nov 2024' }
  ];

  const filteredInstitutions = institutions.filter(inst =>
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.address.toLowerCase().includes(searchQuery.toLowerCase())
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

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-600 text-white p-5 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Education</h1>
            <p className="text-sm text-purple-100">Schools • Colleges • Universities</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'schools', label: 'Institutions', icon: GraduationCap },
            { id: 'fees', label: 'Fee Payment', icon: IndianRupee },
            { id: 'canteen', label: 'Canteen', icon: Coffee },
            { id: 'transport', label: 'Transport', icon: Bus }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white text-purple-600' : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-5 -mt-14">
        {/* INSTITUTIONS TAB */}
        {activeTab === 'schools' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Search */}
            <Card className="p-4 mb-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search schools, colleges, universities..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">{institutions.filter(i => i.type === 'School').length}</p>
                <p className="text-xs text-gray-500">Schools</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-purple-600">{institutions.filter(i => i.type === 'University').length}</p>
                <p className="text-xs text-gray-500">Universities</p>
              </Card>
              <Card className="p-3 text-center">
                <p className="text-2xl font-bold text-green-600">{institutions.filter(i => i.palmPe).length}</p>
                <p className="text-xs text-gray-500">PalmPe</p>
              </Card>
            </div>

            {/* Institutions List */}
            <div className="space-y-3">
              {filteredInstitutions.map((inst, idx) => (
                <motion.div
                  key={inst.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <HoverCard3D>
                    <Card className="p-4 cursor-pointer hover:shadow-xl transition-all">
                      <div className="flex gap-4">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                          inst.type === 'School' ? 'bg-purple-100' : 'bg-blue-100'
                        }`}>
                          {inst.type === 'School' ? '🏫' : '🎓'}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-bold text-gray-800">{inst.name}</h3>
                              <p className="text-xs text-gray-500">{inst.grades}</p>
                            </div>
                            {inst.palmPe && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">
                                PalmPe
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {inst.address}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {inst.students.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {inst.services.slice(0, 3).map(service => (
                              <span key={service} className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] rounded-full">
                                {service}
                              </span>
                            ))}
                            {inst.services.length > 3 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full">
                                +{inst.services.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>

            {/* Register Palm CTA */}
            <Card className="p-4 mt-4 bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                  👋
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">PalmPe for Campus</p>
                  <p className="text-xs text-gray-600">Attendance, canteen, library - all with palm</p>
                </div>
                <Button
                  onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/schools' } })}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Enable
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* FEE PAYMENT TAB */}
        {activeTab === 'fees' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Child Selector */}
            <Card className="p-4 mb-4 shadow-lg">
              <Label className="text-xs text-gray-500 mb-2 block">SELECT CHILD</Label>
              <div className="grid grid-cols-2 gap-2">
                {children.map(child => (
                  <button
                    key={child.id}
                    onClick={() => setSelectedChild(child)}
                    className={`p-3 rounded-xl text-left transition-all ${
                      selectedChild?.id === child.id
                        ? 'bg-purple-100 border-2 border-purple-600'
                        : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
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
                {/* Fee Summary */}
                <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-purple-600 to-violet-600 text-white">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-purple-100">Total Pending Fees</p>
                      <p className="text-3xl font-bold">₹{selectedChild.pendingFees.toLocaleString()}</p>
                    </div>
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                      <IndianRupee className="w-8 h-8" />
                    </div>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <div>
                      <p className="text-purple-100">Roll No</p>
                      <p className="font-semibold">{selectedChild.rollNo}</p>
                    </div>
                    <div>
                      <p className="text-purple-100">Attendance</p>
                      <p className="font-semibold">{selectedChild.attendance}%</p>
                    </div>
                  </div>
                </Card>

                {/* Fee Breakdown */}
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
                            fee.status === 'due' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {fee.status.charAt(0).toUpperCase() + fee.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xl font-bold text-gray-800">₹{fee.amount.toLocaleString()}</span>
                          <Button
                            onClick={() => handlePayFee(fee)}
                            size="sm"
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            Pay Now
                          </Button>
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
            {/* Canteen Balance */}
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-orange-500 to-amber-500 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-orange-100">Canteen Balance</p>
                  <p className="text-3xl font-bold">₹{children[0]?.canteenBalance || 0}</p>
                </div>
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  + Recharge
                </Button>
              </div>
              <p className="text-xs text-orange-100">
                {children[0]?.name} • {children[0]?.school}
              </p>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-4 cursor-pointer hover:shadow-lg">
                <QrCode className="w-8 h-8 text-purple-600 mb-2" />
                <p className="font-semibold text-gray-800">Scan & Pay</p>
                <p className="text-xs text-gray-500">At canteen counter</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:shadow-lg">
                <Clock className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-semibold text-gray-800">Pre-order</p>
                <p className="text-xs text-gray-500">Skip the queue</p>
              </Card>
            </div>

            {/* Menu */}
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
                            {!item.available && (
                              <span className="text-xs text-red-500">Not available</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="font-semibold text-gray-800">₹{item.price}</span>
                            <Button
                              size="sm"
                              disabled={!item.available}
                              className="bg-orange-500 hover:bg-orange-600"
                            >
                              Add
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Spending History */}
            <Card className="p-5 mt-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Spending</h3>
              <div className="space-y-3">
                {[
                  { item: 'South Indian Thali', date: 'Today, 1:00 PM', amount: 80 },
                  { item: 'Fresh Juice', date: 'Today, 11:30 AM', amount: 40 },
                  { item: 'Samosa', date: 'Yesterday', amount: 20 }
                ].map((txn, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{txn.item}</p>
                      <p className="text-xs text-gray-500">{txn.date}</p>
                    </div>
                    <span className="font-semibold text-gray-800">-₹{txn.amount}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* TRANSPORT TAB */}
        {activeTab === 'transport' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Transport Status */}
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
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-blue-100">Bus is on time</span>
              </div>
            </Card>

            {/* Live Tracking */}
            <Card className="p-5 mb-4 shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Live Tracking</h3>
                <Button size="sm" variant="outline" className="border-blue-400 text-blue-600">
                  <MapPin className="w-4 h-4 mr-1" />
                  Track Bus
                </Button>
              </div>
              
              {/* Simple Route Visualization */}
              <div className="relative py-4">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200" />
                {['Home', 'Stop 3 - MG Road', 'Stop 5 - Indiranagar', 'School'].map((stop, idx) => (
                  <div key={stop} className="relative flex items-center gap-4 mb-4 last:mb-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                      idx === 0 ? 'bg-green-500' :
                      idx === 3 ? 'bg-blue-600' :
                      'bg-blue-200'
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

            {/* Transport Fee */}
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Transport Fee</h3>
              <div className="space-y-3">
                {transportRoutes.slice(0, 1).map(route => (
                  <div key={route.id} className="p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{route.name}</p>
                        <p className="text-xs text-gray-500">{route.stops} stops</p>
                      </div>
                      <span className="text-xl font-bold text-blue-600">₹{route.fee}/month</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">December 2024</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Pay Now
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Emergency Contact */}
            <Card className="p-4 mt-4 bg-red-50 border-red-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Emergency Contact</p>
                  <p className="text-xs text-gray-600">Driver: +91 98765 43210</p>
                </div>
                <Button size="sm" variant="outline" className="border-red-400 text-red-600">
                  Call
                </Button>
              </div>
            </Card>
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            onClick={() => setShowPaymentModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Pay Fee</h3>
              
              <div className="bg-purple-50 p-4 rounded-xl mb-4">
                <p className="text-sm text-gray-600 mb-1">{selectedFee.name}</p>
                <p className="text-3xl font-bold text-purple-600">₹{selectedFee.amount.toLocaleString()}</p>
                <p className="text-xs text-gray-500 mt-1">Due: {selectedFee.dueDate}</p>
              </div>

              {/* Payment Methods */}
              <div className="space-y-2 mb-4">
                {[
                  { id: 'palm', label: 'PalmPe', icon: '👋', desc: 'Instant payment' },
                  { id: 'upi', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe' },
                  { id: 'card', label: 'Card/Netbanking', icon: '💳', desc: 'All banks' }
                ].map(method => (
                  <button
                    key={method.id}
                    className="w-full p-3 rounded-xl border border-gray-200 hover:border-purple-400 flex items-center gap-3 transition-colors"
                  >
                    <span className="text-xl">{method.icon}</span>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowPaymentModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={processPayment}
                  disabled={loading}
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                >
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
