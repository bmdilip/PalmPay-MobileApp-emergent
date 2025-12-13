import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Train, MapPin, Check, ChevronRight, ArrowLeft, Search,
  CreditCard, QrCode, Clock, Route, Wallet, RefreshCw,
  ChevronDown, Ticket, History, Star, Lock
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import PalmNFCIcon from '../../components/icons/PalmNFCIcon';

const MetroTransit = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeTab, setActiveTab] = useState('book');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [fromStation, setFromStation] = useState(null);
  const [toStation, setToStation] = useState(null);
  const [ticketType, setTicketType] = useState('single');
  const [passengers, setPassengers] = useState(1);
  const [showStationPicker, setShowStationPicker] = useState(null);
  const [smartCardBalance, setSmartCardBalance] = useState(245);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('palm');

  // Cities with metro
  const cities = {
    active: [
      { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', lines: 2, stations: 55, palmPeStations: 12 },
      { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', lines: 9, stations: 250, palmPeStations: 45 },
      { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', lines: 3, stations: 46, palmPeStations: 15 },
      { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', lines: 2, stations: 32, palmPeStations: 8 }
    ],
    upcoming: [
      { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', expected: 'Q1 2025' },
      { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', expected: 'Q2 2025' },
      { id: 'pune', name: 'Pune', state: 'Maharashtra', expected: 'Q3 2025' }
    ]
  };

  // Metro data per city
  const metroData = {
    bangalore: {
      name: 'Namma Metro',
      lines: [
        {
          id: 'purple',
          name: 'Purple Line',
          color: '#9B59B6',
          stations: [
            { id: 'ws', name: 'Whitefield', palmPe: true },
            { id: 'kd', name: 'Kadugodi', palmPe: false },
            { id: 'in', name: 'Indiranagar', palmPe: true },
            { id: 'mg', name: 'MG Road', palmPe: true },
            { id: 'cb', name: 'Cubbon Park', palmPe: true },
            { id: 'kp', name: 'Kempegowda (Majestic)', palmPe: true, interchange: true },
            { id: 'vs', name: 'Vijayanagar', palmPe: false },
            { id: 'rr', name: 'RR Nagar', palmPe: false },
            { id: 'kg', name: 'Kengeri', palmPe: true }
          ]
        },
        {
          id: 'green',
          name: 'Green Line',
          color: '#27AE60',
          stations: [
            { id: 'ng', name: 'Nagasandra', palmPe: false },
            { id: 'yp', name: 'Yeshwanthpur', palmPe: true },
            { id: 'sm', name: 'Sampige Road', palmPe: false },
            { id: 'kp2', name: 'Kempegowda (Majestic)', palmPe: true, interchange: true },
            { id: 'jy', name: 'Jayanagar', palmPe: true },
            { id: 'bn', name: 'Banashankari', palmPe: false },
            { id: 'sc', name: 'Silk Institute', palmPe: true }
          ]
        }
      ]
    }
  };

  const currentMetro = selectedCity ? metroData[selectedCity.id] : null;

  const calculatedFare = useMemo(() => {
    if (!fromStation || !toStation) return null;
    const baseFare = 20 + Math.abs(fromStation.name.length - toStation.name.length) * 2;
    let total = baseFare * passengers;
    if (ticketType === 'return') total = Math.round(total * 1.9);
    const palmDiscount = paymentMethod === 'palm' ? Math.round(total * 0.05) : 0;
    return { baseFare, total, palmDiscount, finalTotal: total - palmDiscount };
  }, [fromStation, toStation, ticketType, passengers, paymentMethod]);

  const handleBookTicket = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3);
    }, 2000);
  };

  // CITY SELECTION SCREEN
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Metro & Transit</h1>
              <p className="text-sm text-blue-100">Contactless travel with PalmPe</p>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* PalmPe Benefits Banner */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <PalmNFCIcon className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Travel Phone-Free</h3>
                <p className="text-sm text-cyan-100">Wave your palm at gates • No tickets needed • 5% off fares</p>
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
                  className="p-4 cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🚇</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{city.name}</h3>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{city.stations} stations</span>
                    <span className="flex items-center gap-1 text-cyan-600 font-semibold">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg) brightness(99%) contrast(101%)' }} />
                      {city.palmPeStations}
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
            {cities.upcoming.map((city, idx) => (
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
              <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg) brightness(99%) contrast(101%)' }} />
              How PalmPe Works at Metro
            </h3>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Register Once', desc: 'Enroll your palm at any PalmPe station' },
                { step: '2', title: 'Wave & Enter', desc: 'No tickets, cards, or phone needed' },
                { step: '3', title: 'Auto Deduct', desc: 'Fare deducted from linked wallet automatically' }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold text-sm">
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
            onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/metro' } })}
            className="w-full mt-4 h-12 bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            <PalmNFCIcon className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
            Register Palm for Metro
          </Button>
        </div>
      </div>
    );
  }

  // MAIN METRO INTERFACE (after city selection)
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedCity(null)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{currentMetro?.name || 'Metro'}</h1>
            <p className="text-sm text-blue-100">{selectedCity.name} • {selectedCity.lines} Lines</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
            <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) invert(1)' }} />
            {selectedCity.palmPeStations} stations
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/10 rounded-xl p-1">
          {[
            { id: 'book', label: 'Book', icon: Ticket },
            { id: 'smartcard', label: 'Card', icon: CreditCard },
            { id: 'history', label: 'History', icon: History }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setStep(1); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-blue-600' : 'text-white/80'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 -mt-14">
        {/* BOOK TICKET TAB */}
        {activeTab === 'book' && step === 1 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Journey Card */}
            <Card className="p-5 mb-4 shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <Route className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-gray-800">Plan Journey</h3>
              </div>

              {/* From Station */}
              <div className="mb-3">
                <Label className="text-xs text-gray-500">FROM</Label>
                <button
                  onClick={() => setShowStationPicker('from')}
                  className="w-full p-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 text-left flex items-center justify-between"
                >
                  {fromStation ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{fromStation.name}</span>
                      {fromStation.palmPe && (
                        <PalmNFCIcon className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' }} />
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">Select station</span>
                  )}
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Swap */}
              <div className="flex justify-center -my-1 relative z-10">
                <button
                  onClick={() => { const t = fromStation; setFromStation(toStation); setToStation(t); }}
                  className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <RefreshCw className="w-4 h-4 text-blue-600" />
                </button>
              </div>

              {/* To Station */}
              <div className="mb-4">
                <Label className="text-xs text-gray-500">TO</Label>
                <button
                  onClick={() => setShowStationPicker('to')}
                  className="w-full p-3 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 text-left flex items-center justify-between"
                >
                  {toStation ? (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{toStation.name}</span>
                      {toStation.palmPe && (
                        <PalmNFCIcon className="w-4 h-4" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' }} />
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">Select station</span>
                  )}
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Ticket Type */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { id: 'single', label: 'Single' },
                  { id: 'return', label: 'Return', badge: '5% off' },
                  { id: 'group', label: 'Group' }
                ].map(type => (
                  <button
                    key={type.id}
                    onClick={() => setTicketType(type.id)}
                    className={`p-2 rounded-xl text-center text-sm font-medium transition-all ${
                      ticketType === type.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {type.label}
                    {type.badge && <span className="block text-xs opacity-75">{type.badge}</span>}
                  </button>
                ))}
              </div>

              {/* Fare Display */}
              {calculatedFare && (
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Base Fare</span>
                    <span className="font-medium">₹{calculatedFare.total}</span>
                  </div>
                  {paymentMethod === 'palm' && calculatedFare.palmDiscount > 0 && (
                    <div className="flex justify-between mb-1 text-green-600">
                      <span className="text-sm flex items-center gap-1">
                        <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
                        PalmPe Discount
                      </span>
                      <span className="font-medium">-₹{calculatedFare.palmDiscount}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-blue-200">
                    <span className="font-semibold">Total</span>
                    <span className="text-xl font-bold text-blue-600">₹{calculatedFare.finalTotal}</span>
                  </div>
                </div>
              )}
            </Card>

            {/* Payment Method - PalmPe First */}
            <Card className="p-5 mb-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Pay With</h3>
              <div className="space-y-2">
                {[
                  { id: 'palm', label: 'PalmPe', desc: 'Wave & Go • 5% off', icon: PalmNFCIcon, recommended: true, iconStyle: { filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' } },
                  { id: 'smartcard', label: 'Metro Card', desc: `Balance: ₹${smartCardBalance}`, icon: CreditCard },
                  { id: 'upi', label: 'UPI', desc: 'GPay, PhonePe', icon: QrCode }
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-all ${
                      paymentMethod === method.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      method.id === 'palm' ? 'bg-cyan-100' : 'bg-gray-100'
                    }`}>
                      {method.id === 'palm' ? (
                        <PalmNFCIcon className="w-6 h-6" style={method.iconStyle} />
                      ) : (
                        <method.icon className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-gray-800">{method.label}</p>
                      <p className="text-xs text-gray-500">{method.desc}</p>
                    </div>
                    {method.recommended && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                        Recommended
                      </span>
                    )}
                    {paymentMethod === method.id && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>
            </Card>

            <Button
              onClick={handleBookTicket}
              disabled={!fromStation || !toStation || loading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 text-lg font-semibold"
            >
              {loading ? 'Processing...' : `Book Ticket • ₹${calculatedFare?.finalTotal || 0}`}
            </Button>

            {/* Not registered CTA */}
            <Card className="p-4 mt-4 bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-100 flex items-center justify-center">
                  <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">Enable Phone-Free Travel</p>
                  <p className="text-xs text-gray-600">Register palm for instant entry</p>
                </div>
                <Button
                  onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/metro' } })}
                  size="sm"
                  variant="outline"
                  className="border-cyan-400 text-cyan-600"
                >
                  Register
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* SUCCESS SCREEN */}
        {activeTab === 'book' && step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="p-6 text-center shadow-lg">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket Booked!</h2>
              
              {paymentMethod === 'palm' ? (
                <div className="bg-cyan-50 p-4 rounded-xl mb-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <PalmNFCIcon className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' }} />
                    <span className="font-semibold text-cyan-700">PalmPe Activated</span>
                  </div>
                  <p className="text-sm text-cyan-600">Just wave your palm at the gate to enter!</p>
                </div>
              ) : (
                <div className="w-40 h-40 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <QrCode className="w-24 h-24 text-gray-400" />
                </div>
              )}

              <div className="bg-gray-50 p-4 rounded-xl mb-4 text-left text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">From</span>
                  <span className="font-semibold">{fromStation?.name}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">To</span>
                  <span className="font-semibold">{toStation?.name}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-gray-600">Paid</span>
                  <span className="font-bold text-green-600">₹{calculatedFare?.finalTotal}</span>
                </div>
              </div>

              <Button onClick={() => { setStep(1); setFromStation(null); setToStation(null); }} className="w-full">
                Book Another
              </Button>
            </Card>
          </motion.div>
        )}

        {/* SMART CARD TAB */}
        {activeTab === 'smartcard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-blue-100">Smart Card Balance</p>
                  <p className="text-4xl font-bold">₹{smartCardBalance}</p>
                </div>
                <CreditCard className="w-12 h-12 text-white/50" />
              </div>
              <p className="text-sm text-blue-100">**** **** **** 4521</p>
            </Card>

            {/* Link to PalmPe */}
            <Card className="p-4 mb-4 bg-cyan-50 border-cyan-200">
              <div className="flex items-center gap-3">
                <PalmNFCIcon className="w-8 h-8" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' }} />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Link Card to PalmPe</p>
                  <p className="text-xs text-gray-600">Travel without carrying your card</p>
                </div>
                <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">Link</Button>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 cursor-pointer hover:shadow-lg" onClick={() => setShowRechargeModal(true)}>
                <Wallet className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-semibold text-gray-800">Recharge</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:shadow-lg">
                <RefreshCw className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-semibold text-gray-800">Auto Top-up</p>
              </Card>
            </div>
          </motion.div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Journeys</h3>
              <div className="space-y-3">
                {[
                  { from: 'MG Road', to: 'Majestic', date: 'Today, 9:30 AM', fare: 25, method: 'palm' },
                  { from: 'Indiranagar', to: 'Whitefield', date: 'Yesterday', fare: 35, method: 'card' },
                  { from: 'Jayanagar', to: 'Cubbon Park', date: '10 Dec', fare: 30, method: 'palm' }
                ].map((trip, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-gray-800">{trip.from} → {trip.to}</p>
                      <p className="text-xs text-gray-500">{trip.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{trip.fare}</p>
                      {trip.method === 'palm' && (
                        <PalmNFCIcon className="w-4 h-4 ml-auto" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' }} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Station Picker Modal */}
      <AnimatePresence>
        {showStationPicker && currentMetro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
            onClick={() => setShowStationPicker(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="bg-white rounded-t-3xl w-full max-h-[80vh] overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <div className="p-4 border-b sticky top-0 bg-white z-10">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-3">
                  Select {showStationPicker === 'from' ? 'Origin' : 'Destination'}
                </h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search stations..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="overflow-y-auto max-h-[60vh] p-4">
                {currentMetro.lines.map(line => (
                  <div key={line.id} className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: line.color }} />
                      <span className="text-sm font-semibold text-gray-600">{line.name}</span>
                    </div>
                    <div className="space-y-1">
                      {line.stations
                        .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                        .map(station => (
                          <button
                            key={station.id}
                            onClick={() => {
                              if (showStationPicker === 'from') setFromStation(station);
                              else setToStation(station);
                              setShowStationPicker(null);
                              setSearchQuery('');
                            }}
                            className="w-full p-3 rounded-xl text-left hover:bg-gray-50 flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full" style={{ background: line.color }} />
                              <span className="font-medium text-gray-800">{station.name}</span>
                            </div>
                            {station.palmPe && (
                              <span className="flex items-center gap-1 text-xs bg-cyan-100 text-cyan-600 px-2 py-0.5 rounded-full">
                                <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(166deg)' }} />
                                PalmPe
                              </span>
                            )}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Recharge Modal */}
      <AnimatePresence>
        {showRechargeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-5"
            onClick={() => setShowRechargeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-4">Recharge Card</h3>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[100, 200, 500, 1000].map(amt => (
                  <button
                    key={amt}
                    onClick={() => setRechargeAmount(amt.toString())}
                    className={`p-3 rounded-xl ${rechargeAmount === amt.toString() ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <Input
                type="number"
                value={rechargeAmount}
                onChange={e => setRechargeAmount(e.target.value)}
                placeholder="Or enter amount"
                className="mb-4"
              />
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowRechargeModal(false)} className="flex-1">Cancel</Button>
                <Button
                  onClick={() => {
                    setSmartCardBalance(prev => prev + parseInt(rechargeAmount || 0));
                    setShowRechargeModal(false);
                    setRechargeAmount('');
                  }}
                  className="flex-1 bg-blue-600"
                >
                  Pay ₹{rechargeAmount || 0}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MetroTransit;
