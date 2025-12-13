import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Train, MapPin, Check, ChevronRight, ArrowLeft, Sparkles, Search,
  CreditCard, QrCode, Clock, Route, Wallet, RefreshCw, AlertCircle,
  ChevronDown, Navigation, Ticket, History, Star, IndianRupee
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import HoverCard3D from '../../components/premium/HoverCard3D';

// Station Picker Modal Component (defined outside main component)
const StationPicker = ({ type, onSelect, onClose, metroLines, searchQuery, setSearchQuery }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end"
    onClick={onClose}
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
          Select {type === 'from' ? 'Origin' : 'Destination'} Station
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
        {metroLines.map(line => (
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
                      onSelect({ ...station, line: line.name, lineColor: line.color });
                      setSearchQuery('');
                    }}
                    className="w-full p-3 rounded-xl text-left hover:bg-gray-50 flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: line.color }} />
                      <span className="font-medium text-gray-800">{station.name}</span>
                      {station.interchange && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full">
                          Interchange
                        </span>
                      )}
                    </div>
                    {station.palmPe && (
                      <span className="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> PalmPe
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
);

const MetroTransit = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('book'); // book, smartcard, history
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Booking state
  const [fromStation, setFromStation] = useState(null);
  const [toStation, setToStation] = useState(null);
  const [ticketType, setTicketType] = useState('single'); // single, return, group
  const [passengers, setPassengers] = useState(1);
  const [showStationPicker, setShowStationPicker] = useState(null); // 'from' or 'to'
  
  // Smart card state
  const [smartCardBalance, setSmartCardBalance] = useState(245);
  const [rechargeAmount, setRechargeAmount] = useState('');
  const [showRechargeModal, setShowRechargeModal] = useState(false);
  
  // Fare calculation
  const calculatedFare = useMemo(() => {
    if (!fromStation || !toStation) return null;
    const baseFare = Math.floor(fromStation.name.length + toStation.name.length) + 15;
    let total = baseFare * passengers;
    if (ticketType === 'return') total *= 1.9;
    return { baseFare, total: Math.round(total), distance: Math.floor(baseFare / 3) + 3 };
  // Metro lines and stations (based on Namma Metro Bangalore)
  const metroLines = [
    {
      id: 'purple',
      name: 'Purple Line',
      color: '#9B59B6',
      stations: [
        { id: 'ws', name: 'Whitefield', interchange: false },
        { id: 'kd', name: 'Kadugodi', interchange: false },
        { id: 'bp', name: 'Byappanahalli', interchange: false },
        { id: 'in', name: 'Indiranagar', interchange: false },
        { id: 'hl', name: 'Halasuru', interchange: false },
        { id: 'tr', name: 'Trinity', interchange: false },
        { id: 'mg', name: 'MG Road', interchange: false, palmPe: true },
        { id: 'cb', name: 'Cubbon Park', interchange: false, palmPe: true },
        { id: 'vd', name: 'Vidhana Soudha', interchange: false },
        { id: 'sj', name: 'Sir M Visvesvaraya', interchange: false },
        { id: 'kp', name: 'Kempegowda (Majestic)', interchange: true, palmPe: true },
        { id: 'cs', name: 'City Railway Station', interchange: false },
        { id: 'mg2', name: 'Magadi Road', interchange: false },
        { id: 'hs', name: 'Hosahalli', interchange: false },
        { id: 'vs', name: 'Vijayanagar', interchange: false },
        { id: 'at', name: 'Attiguppe', interchange: false },
        { id: 'dg', name: 'Deepanjali Nagar', interchange: false },
        { id: 'ms', name: 'Mysore Road', interchange: false },
        { id: 'np', name: 'Nayandahalli', interchange: false },
        { id: 'rr', name: 'RR Nagar', interchange: false },
        { id: 'jp', name: 'Jnanabharathi', interchange: false },
        { id: 'pt', name: 'Pattanagere', interchange: false },
        { id: 'kg', name: 'Kengeri', interchange: false, palmPe: true },
        { id: 'ch', name: 'Challaghatta', interchange: false }
      ]
    },
    {
      id: 'green',
      name: 'Green Line',
      color: '#27AE60',
      stations: [
        { id: 'ng', name: 'Nagasandra', interchange: false },
        { id: 'ds', name: 'Dasarahalli', interchange: false },
        { id: 'jn', name: 'Jalahalli', interchange: false },
        { id: 'pc', name: 'Peenya', interchange: false },
        { id: 'pi', name: 'Peenya Industry', interchange: false },
        { id: 'gb', name: 'Goraguntepalya', interchange: false },
        { id: 'yp', name: 'Yeshwanthpur', interchange: false, palmPe: true },
        { id: 'sg', name: 'Sandal Soap Factory', interchange: false },
        { id: 'mh', name: 'Mahalakshmi', interchange: false },
        { id: 'rj', name: 'Rajajinagar', interchange: false },
        { id: 'km', name: 'Kuvempu Road', interchange: false },
        { id: 'sr', name: 'Srirampura', interchange: false },
        { id: 'sm', name: 'Sampige Road', interchange: false },
        { id: 'kp2', name: 'Kempegowda (Majestic)', interchange: true, palmPe: true },
        { id: 'cp', name: 'Chickpete', interchange: false },
        { id: 'kr', name: 'KR Market', interchange: false },
        { id: 'nr', name: 'National College', interchange: false },
        { id: 'lg', name: 'Lalbagh', interchange: false },
        { id: 'sb', name: 'South End Circle', interchange: false },
        { id: 'jy', name: 'Jayanagar', interchange: false, palmPe: true },
        { id: 'rk', name: 'RV Road', interchange: false },
        { id: 'bn', name: 'Banashankari', interchange: false },
        { id: 'jp2', name: 'JP Nagar', interchange: false },
        { id: 'ym', name: 'Yelachenahalli', interchange: false },
        { id: 'kn', name: 'Konanakunte Cross', interchange: false },
        { id: 'dk', name: 'Doddakallasandra', interchange: false },
        { id: 'vj', name: 'Vajarahalli', interchange: false },
        { id: 'tk', name: 'Talaghattapura', interchange: false },
        { id: 'sc', name: 'Silk Institute', interchange: false, palmPe: true }
      ]
    }
  ];

  const allStations = metroLines.flatMap(line => 
    line.stations.map(s => ({ ...s, line: line.name, lineColor: line.color }))
  );

  // Recent journeys mock data
  const recentJourneys = [
    { from: 'MG Road', to: 'Kempegowda', date: 'Today, 9:30 AM', fare: 25 },
    { from: 'Indiranagar', to: 'Whitefield', date: 'Yesterday, 6:15 PM', fare: 35 },
    { from: 'Jayanagar', to: 'Cubbon Park', date: '10 Dec, 11:00 AM', fare: 30 }
  ];

  const quickRechargeAmounts = [100, 200, 500, 1000];

  const handleBookTicket = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(3); // Success
    }, 2000);
  };

  const handleRecharge = () => {
    setLoading(true);
    setTimeout(() => {
      setSmartCardBalance(prev => prev + parseInt(rechargeAmount || 0));
      setShowRechargeModal(false);
      setRechargeAmount('');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-5 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Metro & Transit</h1>
            <p className="text-sm text-blue-100">Namma Metro • Bangalore</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white/10 rounded-xl p-1">
          {[
            { id: 'book', label: 'Book Ticket', icon: Ticket },
            { id: 'smartcard', label: 'Smart Card', icon: CreditCard },
            { id: 'history', label: 'History', icon: History }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setStep(1); }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id ? 'bg-white text-blue-600' : 'text-white/80 hover:bg-white/10'
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
        {/* BOOK TICKET TAB */}
        {activeTab === 'book' && (
          <>
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                {/* Journey Card */}
                <Card className="p-5 mb-4 shadow-lg">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Route className="w-5 h-5 text-blue-600" />
                    Plan Your Journey
                  </h3>

                  {/* From Station */}
                  <div className="mb-3">
                    <Label className="text-xs text-gray-500 mb-1">FROM</Label>
                    <button
                      onClick={() => setShowStationPicker('from')}
                      className="w-full p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-left flex items-center justify-between"
                    >
                      {fromStation ? (
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ background: fromStation.lineColor }} />
                          <div>
                            <p className="font-semibold text-gray-800">{fromStation.name}</p>
                            <p className="text-xs text-gray-500">{fromStation.line}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Select origin station</span>
                      )}
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Swap Button */}
                  <div className="flex justify-center -my-1 relative z-10">
                    <button
                      onClick={() => {
                        const temp = fromStation;
                        setFromStation(toStation);
                        setToStation(temp);
                      }}
                      className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors"
                    >
                      <RefreshCw className="w-5 h-5 text-blue-600" />
                    </button>
                  </div>

                  {/* To Station */}
                  <div className="mb-4">
                    <Label className="text-xs text-gray-500 mb-1">TO</Label>
                    <button
                      onClick={() => setShowStationPicker('to')}
                      className="w-full p-4 rounded-xl border-2 border-dashed border-gray-200 hover:border-blue-400 transition-colors text-left flex items-center justify-between"
                    >
                      {toStation ? (
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full" style={{ background: toStation.lineColor }} />
                          <div>
                            <p className="font-semibold text-gray-800">{toStation.name}</p>
                            <p className="text-xs text-gray-500">{toStation.line}</p>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400">Select destination station</span>
                      )}
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>

                  {/* Ticket Type */}
                  <div className="mb-4">
                    <Label className="text-xs text-gray-500 mb-2 block">TICKET TYPE</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'single', label: 'Single', desc: 'One way' },
                        { id: 'return', label: 'Return', desc: '5% off' },
                        { id: 'group', label: 'Group', desc: 'Up to 5' }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setTicketType(type.id)}
                          className={`p-3 rounded-xl text-center transition-all ${
                            ticketType === type.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <p className="font-semibold text-sm">{type.label}</p>
                          <p className={`text-xs ${ticketType === type.id ? 'text-blue-100' : 'text-gray-500'}`}>
                            {type.desc}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Passengers */}
                  {ticketType === 'group' && (
                    <div className="mb-4">
                      <Label className="text-xs text-gray-500 mb-2 block">PASSENGERS</Label>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setPassengers(p => Math.max(1, p - 1))}
                          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl font-bold"
                        >
                          -
                        </button>
                        <span className="text-2xl font-bold text-gray-800 w-8 text-center">{passengers}</span>
                        <button
                          onClick={() => setPassengers(p => Math.min(5, p + 1))}
                          className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Fare Display */}
                  {calculatedFare && (
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Distance</span>
                        <span className="font-semibold text-gray-800">{calculatedFare.distance} km</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Base Fare</span>
                        <span className="font-semibold text-gray-800">₹{calculatedFare.baseFare}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-blue-200">
                        <span className="font-semibold text-gray-800">Total Fare</span>
                        <span className="text-2xl font-bold text-blue-600">₹{calculatedFare.total}</span>
                      </div>
                    </div>
                  )}
                </Card>

                {/* Payment Methods */}
                <Card className="p-5 mb-4 shadow-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">Payment Method</h3>
                  <div className="space-y-2">
                    {[
                      { id: 'palm', label: 'PalmPe', desc: 'Tap & Go with palm', icon: '👋', recommended: true },
                      { id: 'upi', label: 'UPI', desc: 'GPay, PhonePe, Paytm', icon: '📱' },
                      { id: 'card', label: 'Card', desc: 'Credit/Debit card', icon: '💳' },
                      { id: 'smartcard', label: 'Smart Card', desc: `Balance: ₹${smartCardBalance}`, icon: '🎫' }
                    ].map(method => (
                      <button
                        key={method.id}
                        className="w-full p-4 rounded-xl border border-gray-200 hover:border-blue-400 transition-all flex items-center gap-4"
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-gray-800">{method.label}</p>
                          <p className="text-xs text-gray-500">{method.desc}</p>
                        </div>
                        {method.recommended && (
                          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                            Recommended
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Book Button */}
                <Button
                  onClick={handleBookTicket}
                  disabled={!fromStation || !toStation || loading}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-lg font-semibold"
                >
                  {loading ? 'Processing...' : `Book Ticket • ₹${calculatedFare?.total || 0}`}
                </Button>

                {/* Register Palm CTA */}
                <Card className="p-4 mt-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                      👋
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">Enable PalmPe for Metro</p>
                      <p className="text-xs text-gray-600">Skip queues with tap-and-go palm entry</p>
                    </div>
                    <Button
                      onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/metro' } })}
                      size="sm"
                      variant="outline"
                      className="border-purple-400 text-purple-600"
                    >
                      Register
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Success Screen */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
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
                  <p className="text-gray-600 mb-6">Your QR ticket is ready</p>

                  {/* QR Code Placeholder */}
                  <div className="w-48 h-48 mx-auto mb-6 bg-gray-100 rounded-2xl flex items-center justify-center">
                    <QrCode className="w-32 h-32 text-gray-400" />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">From</span>
                      <span className="font-semibold">{fromStation?.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">To</span>
                      <span className="font-semibold">{toStation?.name}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Valid Until</span>
                      <span className="font-semibold">Today, 11:59 PM</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t">
                      <span className="text-gray-600">Amount Paid</span>
                      <span className="font-bold text-green-600">₹{calculatedFare?.total}</span>
                    </div>
                  </div>

                  <Button onClick={() => { setStep(1); setFromStation(null); setToStation(null); }} className="w-full">
                    Book Another Ticket
                  </Button>
                </Card>
              </motion.div>
            )}
          </>
        )}

        {/* SMART CARD TAB */}
        {activeTab === 'smartcard' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Card Balance */}
            <Card className="p-6 mb-4 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-blue-100">Smart Card Balance</p>
                  <p className="text-4xl font-bold">₹{smartCardBalance}</p>
                </div>
                <div className="w-16 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-8 h-8" />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-blue-100">
                <span>Card: **** **** **** 4521</span>
                <span className="px-2 py-0.5 bg-green-500 text-white rounded-full text-xs">Active</span>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setShowRechargeModal(true)}
              >
                <Wallet className="w-8 h-8 text-blue-600 mb-2" />
                <p className="font-semibold text-gray-800">Recharge</p>
                <p className="text-xs text-gray-500">Add money to card</p>
              </Card>
              <Card className="p-4 cursor-pointer hover:shadow-lg transition-shadow">
                <RefreshCw className="w-8 h-8 text-green-600 mb-2" />
                <p className="font-semibold text-gray-800">Auto Top-up</p>
                <p className="text-xs text-gray-500">Below ₹100</p>
              </Card>
            </div>

            {/* Recent Transactions */}
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {[
                  { type: 'journey', from: 'MG Road', to: 'Majestic', amount: -25, date: 'Today, 9:30 AM' },
                  { type: 'recharge', amount: 200, date: 'Yesterday' },
                  { type: 'journey', from: 'Indiranagar', to: 'Whitefield', amount: -35, date: '10 Dec' }
                ].map((txn, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        txn.type === 'recharge' ? 'bg-green-100' : 'bg-blue-100'
                      }`}>
                        {txn.type === 'recharge' ? (
                          <Wallet className="w-5 h-5 text-green-600" />
                        ) : (
                          <Train className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">
                          {txn.type === 'recharge' ? 'Recharge' : `${txn.from} → ${txn.to}`}
                        </p>
                        <p className="text-xs text-gray-500">{txn.date}</p>
                      </div>
                    </div>
                    <span className={`font-semibold ${txn.amount > 0 ? 'text-green-600' : 'text-gray-800'}`}>
                      {txn.amount > 0 ? '+' : ''}₹{Math.abs(txn.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Register Palm for Smart Card */}
            <Button
              onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/metro' } })}
              variant="outline"
              className="w-full mt-4 h-12 border-blue-400 text-blue-600"
            >
              Link PalmPe to Smart Card
            </Button>
          </motion.div>
        )}

        {/* HISTORY TAB */}
        {activeTab === 'history' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Journey History</h3>
              <div className="space-y-4">
                {recentJourneys.map((journey, idx) => (
                  <div key={idx} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Train className="w-5 h-5 text-blue-600" />
                        <span className="font-semibold text-gray-800">{journey.from} → {journey.to}</span>
                      </div>
                      <span className="font-semibold text-gray-800">₹{journey.fare}</span>
                    </div>
                    <p className="text-xs text-gray-500">{journey.date}</p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Station Picker Modal */}
      <AnimatePresence>
        {showStationPicker && (
          <StationPicker
            type={showStationPicker}
            metroLines={metroLines}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelect={station => {
              if (showStationPicker === 'from') setFromStation(station);
              else setToStation(station);
              setShowStationPicker(null);
            }}
            onClose={() => setShowStationPicker(null)}
          />
        )}
      </AnimatePresence>

      {/* Recharge Modal */}
      <AnimatePresence>
        {showRechargeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            onClick={() => setShowRechargeModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Recharge Smart Card</h3>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                {quickRechargeAmounts.map(amt => (
                  <button
                    key={amt}
                    onClick={() => setRechargeAmount(amt.toString())}
                    className={`p-3 rounded-xl text-center transition-all ${
                      rechargeAmount === amt.toString()
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <Label>Or enter amount</Label>
                <Input
                  type="number"
                  value={rechargeAmount}
                  onChange={e => setRechargeAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="mt-1"
                />
              </div>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowRechargeModal(false)} className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleRecharge}
                  disabled={!rechargeAmount || loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? 'Processing...' : `Pay ₹${rechargeAmount || 0}`}
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
