import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, MapPin, Check, ChevronRight, ArrowLeft, Building2, Shield,
  Search, Clock, Calendar, Car, Users, Coffee, QrCode, Bell,
  DoorOpen, Wifi, FileText, UserCheck, ChevronDown, Lock
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import HoverCard3D from '../../components/premium/HoverCard3D';
import PalmNFCIcon from '../../components/icons/PalmNFCIcon';

const Offices = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState(null);
  const [activeTab, setActiveTab] = useState('offices');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [loading, setLoading] = useState(false);

  // Cities with PalmPe office integration
  const cities = {
    active: [
      { id: 'bangalore', name: 'Bangalore', state: 'Karnataka', techParks: 12, palmPeBuildings: 45 },
      { id: 'hyderabad', name: 'Hyderabad', state: 'Telangana', techParks: 8, palmPeBuildings: 32 },
      { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', techParks: 6, palmPeBuildings: 28 },
      { id: 'delhi', name: 'Delhi NCR', state: 'Delhi', techParks: 10, palmPeBuildings: 38 }
    ],
    upcoming: [
      { id: 'pune', name: 'Pune', state: 'Maharashtra', expected: 'Q1 2025' },
      { id: 'chennai', name: 'Chennai', state: 'Tamil Nadu', expected: 'Q2 2025' },
      { id: 'kolkata', name: 'Kolkata', state: 'West Bengal', expected: 'Q3 2025' }
    ]
  };

  // Mock user profile (employee)
  const userProfile = {
    name: 'Rahul Verma',
    employeeId: 'EMP-2024-1042',
    company: 'TechCorp Solutions',
    department: 'Engineering',
    office: 'Embassy Golf Links',
    accessLevel: 'L3 - Senior',
    parkingSlot: 'B2-142',
    photo: '👨‍💼'
  };

  // Offices data per city
  const officeData = {
    bangalore: [
      {
        id: 'egl',
        name: 'Embassy Golf Links',
        company: 'Multiple Tenants',
        address: 'Domlur, Bangalore',
        employees: 8000,
        floors: 12,
        palmPe: true,
        services: ['Access Control', 'Parking', 'Canteen', 'Gym', 'Visitor Mgmt'],
        amenities: ['24/7 Security', 'High-speed WiFi', 'Meeting Rooms', 'Cafeteria'],
        openNow: true
      },
      {
        id: 'manyata',
        name: 'Manyata Tech Park',
        company: 'Multiple Tenants',
        address: 'Nagavara, Bangalore',
        employees: 15000,
        floors: 18,
        palmPe: true,
        services: ['Access Control', 'Parking', 'Canteen', 'Sports'],
        amenities: ['Food Court', 'ATMs', 'Pharmacy', 'Bus Service'],
        openNow: true
      },
      {
        id: 'rmz',
        name: 'RMZ Ecoworld',
        company: 'Multiple Tenants',
        address: 'Bellandur, Bangalore',
        employees: 12000,
        floors: 15,
        palmPe: true,
        services: ['Access Control', 'Parking', 'Gym', 'Crèche'],
        amenities: ['Green Spaces', 'Jogging Track', 'Basketball Court'],
        openNow: true
      },
      {
        id: 'infosys',
        name: 'Infosys Campus',
        company: 'Infosys',
        address: 'Electronic City, Bangalore',
        employees: 20000,
        floors: 10,
        palmPe: true,
        services: ['Access Control', 'Parking', 'Canteen', 'Gym', 'Library'],
        amenities: ['Food Court', 'Sports Complex', 'Medical Center'],
        openNow: true
      }
    ],
    hyderabad: [
      {
        id: 'hitec',
        name: 'HITEC City',
        company: 'Multiple Tenants',
        address: 'Madhapur, Hyderabad',
        employees: 25000,
        floors: 20,
        palmPe: true,
        services: ['Access Control', 'Parking', 'Canteen'],
        amenities: ['Metro Connectivity', 'Food Court'],
        openNow: true
      },
      {
        id: 'raheja',
        name: 'Raheja Mindspace',
        company: 'Multiple Tenants',
        address: 'Madhapur, Hyderabad',
        employees: 18000,
        floors: 15,
        palmPe: true,
        services: ['Access Control', 'Parking', 'Gym'],
        amenities: ['Restaurants', 'ATMs'],
        openNow: true
      }
    ],
    mumbai: [
      {
        id: 'bkc',
        name: 'One BKC',
        company: 'Multiple Tenants',
        address: 'BKC, Mumbai',
        employees: 6000,
        floors: 20,
        palmPe: true,
        services: ['Access Control', 'Valet Parking', 'Concierge'],
        amenities: ['Premium Lounge', 'Rooftop Cafe', 'Helipad'],
        openNow: true
      }
    ],
    delhi: [
      {
        id: 'cyber',
        name: 'Cyber City',
        company: 'Multiple Tenants',
        address: 'Gurgaon, Delhi NCR',
        employees: 30000,
        floors: 25,
        palmPe: true,
        services: ['Access Control', 'Parking', 'Food Court'],
        amenities: ['Metro Station', 'Shopping'],
        openNow: true
      }
    ]
  };

  // Access logs
  const accessLogs = [
    { type: 'entry', location: 'Main Gate', time: 'Today, 9:15 AM', method: 'Palm' },
    { type: 'entry', location: 'Floor 8', time: 'Today, 9:18 AM', method: 'Palm' },
    { type: 'exit', location: 'Cafeteria', time: 'Today, 1:45 PM', method: 'Palm' },
    { type: 'entry', location: 'Meeting Room 8A', time: 'Today, 3:00 PM', method: 'Palm' }
  ];

  // Parking info
  const parkingInfo = {
    allocated: 'B2-142',
    status: 'Available',
    validTill: '31 Dec 2024',
    vehicleNo: 'KA-01-AB-1234',
    type: 'Reserved'
  };

  // Upcoming visitors
  const visitors = [
    { id: 1, name: 'Priya Sharma', company: 'Client Corp', purpose: 'Meeting', date: 'Today, 4:00 PM', status: 'Approved' },
    { id: 2, name: 'Amit Kumar', company: 'Vendor Inc', purpose: 'Delivery', date: 'Tomorrow, 10:00 AM', status: 'Pending' }
  ];

  const currentOffices = selectedCity ? officeData[selectedCity.id] || [] : [];

  const filteredOffices = currentOffices.filter(office =>
    office.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    office.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // CITY SELECTION SCREEN
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-5 pb-8">
          <div className="flex items-center gap-3 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Corporate & Offices</h1>
              <p className="text-sm text-green-100">Phone-free workplace access</p>
            </div>
          </div>
        </div>

        <div className="px-5 -mt-4">
          {/* PalmPe Benefits Banner */}
          <Card className="p-4 mb-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <PalmNFCIcon className="w-8 h-8" style={{ filter: 'brightness(0) invert(1)' }} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">Workplace Access Simplified</h3>
                <p className="text-sm text-green-100">Wave palm at gates • No ID cards • Automated parking</p>
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
                  className="p-4 cursor-pointer hover:shadow-lg hover:border-green-400 transition-all"
                  onClick={() => setSelectedCity(city)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">🏢</span>
                    <div>
                      <h3 className="font-bold text-gray-800">{city.name}</h3>
                      <p className="text-xs text-gray-500">{city.state}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-600">{city.techParks} tech parks</span>
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
                      {city.palmPeBuildings}
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
              <PalmNFCIcon className="w-5 h-5" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
              How PalmPe Works at Office
            </h3>
            <div className="space-y-3">
              {[
                { step: '1', title: 'Register Once', desc: 'Enroll palm at your office reception' },
                { step: '2', title: 'Wave & Enter', desc: 'No ID card or phone needed' },
                { step: '3', title: 'Auto Parking', desc: 'Barrier opens automatically' }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm">
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
            onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/offices' } })}
            className="w-full mt-4 h-12 bg-gradient-to-r from-green-500 to-emerald-600"
          >
            <PalmNFCIcon className="w-5 h-5 mr-2" style={{ filter: 'brightness(0) invert(1)' }} />
            Register Palm for Office
          </Button>
        </div>
      </div>
    );
  }

  // MAIN OFFICE INTERFACE (after city selection)
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-5 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => setSelectedCity(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Corporate</h1>
            <p className="text-sm text-green-100">{selectedCity.name} • {selectedCity.techParks} Tech Parks</p>
          </div>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full text-xs">
            <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) invert(1)' }} />
            {selectedCity.palmPeBuildings} buildings
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'offices', label: 'Offices', icon: Building2 },
            { id: 'access', label: 'My Access', icon: DoorOpen },
            { id: 'parking', label: 'Parking', icon: Car },
            { id: 'visitors', label: 'Visitors', icon: UserCheck }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white text-green-600' : 'text-white/80 hover:bg-white/10'
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
        {/* OFFICES TAB */}
        {activeTab === 'offices' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Search */}
            <Card className="p-4 mb-4 shadow-lg">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search offices, tech parks..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </Card>

            {/* Office List */}
            <div className="space-y-3">
              {filteredOffices.map((office, idx) => (
                <motion.div
                  key={office.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <HoverCard3D>
                    <Card className="p-4 cursor-pointer hover:shadow-xl transition-all">
                      <div className="flex gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center text-2xl">
                          🏢
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-bold text-gray-800">{office.name}</h3>
                              <p className="text-xs text-gray-500">{office.company}</p>
                            </div>
                            {office.palmPe && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full flex items-center gap-1">
                                <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
                                PalmPe
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {office.address}
                            </span>
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {office.employees.toLocaleString()}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {office.services.slice(0, 3).map(service => (
                              <span key={service} className="px-2 py-0.5 bg-green-50 text-green-600 text-[10px] rounded-full">
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>

            {/* Register Palm CTA */}
            <Card className="p-4 mt-4 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <PalmNFCIcon className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">PalmPe for Workplace</p>
                  <p className="text-xs text-gray-600">Seamless access, parking & payments</p>
                </div>
                <Button
                  onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/offices' } })}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  Enable
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* MY ACCESS TAB */}
        {activeTab === 'access' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Employee Card */}
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-green-600 to-emerald-600 text-white">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                  {userProfile.photo}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{userProfile.name}</h2>
                  <p className="text-sm text-green-100">{userProfile.department} • {userProfile.company}</p>
                  <p className="text-xs text-green-200 mt-1">{userProfile.employeeId}</p>
                </div>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                <div>
                  <p className="text-xs text-green-100">Access Level</p>
                  <p className="font-semibold">{userProfile.accessLevel}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-green-100">Office</p>
                  <p className="font-semibold">{userProfile.office}</p>
                </div>
              </div>
            </Card>

            {/* Quick Access */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-green-100 flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-green-600" />
                </div>
                <p className="font-semibold text-gray-800">Access QR</p>
                <p className="text-xs text-gray-500">Show to scan</p>
              </Card>
              <Card className="p-4 text-center cursor-pointer hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 mx-auto mb-2 rounded-2xl bg-blue-100 flex items-center justify-center">
                  <Wifi className="w-8 h-8 text-blue-600" />
                </div>
                <p className="font-semibold text-gray-800">WiFi Access</p>
                <p className="text-xs text-gray-500">Auto-connect</p>
              </Card>
            </div>

            {/* Access Permissions */}
            <Card className="p-5 mb-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">My Access Permissions</h3>
              <div className="space-y-3">
                {[
                  { area: 'Main Entrance', floors: 'All', time: '24/7', icon: DoorOpen },
                  { area: 'Office Floor 8', floors: 'F8', time: '6 AM - 10 PM', icon: Building2 },
                  { area: 'Parking B2', floors: 'B2', time: '24/7', icon: Car },
                  { area: 'Gym & Recreation', floors: 'F1', time: '6 AM - 9 PM', icon: Users },
                  { area: 'Server Room', floors: 'F8', time: 'Restricted', icon: Shield }
                ].map((perm, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                      <perm.icon className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{perm.area}</p>
                      <p className="text-xs text-gray-500">{perm.floors} • {perm.time}</p>
                    </div>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Access Log */}
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Today&apos;s Access Log</h3>
              <div className="space-y-3">
                {accessLogs.map((log, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 border-b last:border-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      log.type === 'entry' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      <DoorOpen className={`w-4 h-4 ${log.type === 'entry' ? 'text-green-600' : 'text-orange-600'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{log.location}</p>
                      <p className="text-xs text-gray-500">{log.time}</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full flex items-center gap-1">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(37%) sepia(54%) saturate(5095%) hue-rotate(258deg)' }} />
                      {log.method}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* PARKING TAB */}
        {activeTab === 'parking' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Parking Card */}
            <Card className="p-5 mb-4 shadow-lg bg-gradient-to-br from-blue-600 to-cyan-600 text-white">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-blue-100">Your Parking Slot</p>
                  <p className="text-4xl font-bold">{parkingInfo.allocated}</p>
                </div>
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                  🚗
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-blue-100">Vehicle</p>
                  <p className="font-semibold">{parkingInfo.vehicleNo}</p>
                </div>
                <div>
                  <p className="text-blue-100">Valid Till</p>
                  <p className="font-semibold">{parkingInfo.validTill}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm">{parkingInfo.status}</span>
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <Card className="p-3 text-center cursor-pointer hover:shadow-lg">
                <MapPin className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-800">Find My Car</p>
              </Card>
              <Card className="p-3 text-center cursor-pointer hover:shadow-lg">
                <Calendar className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-800">Book Slot</p>
              </Card>
              <Card className="p-3 text-center cursor-pointer hover:shadow-lg">
                <Car className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-xs font-medium text-gray-800">Valet</p>
              </Card>
            </div>

            {/* Parking Map */}
            <Card className="p-5 mb-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Basement 2 - Your Level</h3>
              <div className="bg-gray-100 rounded-xl p-4">
                <div className="grid grid-cols-6 gap-2">
                  {Array.from({ length: 24 }, (_, i) => {
                    const slotNum = `B2-${140 + i}`;
                    const isYours = slotNum === parkingInfo.allocated;
                    const isOccupied = i % 3 === 0 || i % 5 === 0 ? !isYours : false;
                    return (
                      <div
                        key={i}
                        className={`aspect-[2/1] rounded flex items-center justify-center text-[8px] font-bold ${
                          isYours ? 'bg-blue-600 text-white' :
                          isOccupied ? 'bg-gray-400 text-white' :
                          'bg-green-200 text-green-700'
                        }`}
                      >
                        {isYours ? '🚗' : isOccupied ? '•' : slotNum.split('-')[1]}
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-green-200 rounded" /> Available</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-gray-400 rounded" /> Occupied</span>
                  <span className="flex items-center gap-1"><div className="w-3 h-3 bg-blue-600 rounded" /> Your Slot</span>
                </div>
              </div>
            </Card>

            {/* Parking History */}
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'Entry', time: 'Today, 9:10 AM', gate: 'Gate A', method: 'Palm' },
                  { action: 'Exit', time: 'Yesterday, 7:45 PM', gate: 'Gate B', method: 'Palm' },
                  { action: 'Entry', time: 'Yesterday, 9:05 AM', gate: 'Gate A', method: 'Palm' }
                ].map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{log.action} - {log.gate}</p>
                      <p className="text-xs text-gray-500">{log.time}</p>
                    </div>
                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full flex items-center gap-1">
                      <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg)' }} />
                      {log.method}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* VISITORS TAB */}
        {activeTab === 'visitors' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Invite Visitor */}
            <Card className="p-5 mb-4 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Invite a Visitor</h3>
              <div className="space-y-3">
                <div>
                  <Label className="text-xs text-gray-500">Visitor Name</Label>
                  <Input placeholder="Enter visitor's name" className="mt-1" />
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Company</Label>
                  <Input placeholder="Visitor's company" className="mt-1" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-xs text-gray-500">Date</Label>
                    <Input type="date" className="mt-1" />
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">Time</Label>
                    <Input type="time" className="mt-1" />
                  </div>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">Purpose</Label>
                  <select className="w-full mt-1 p-2 border rounded-lg bg-white">
                    <option>Meeting</option>
                    <option>Interview</option>
                    <option>Delivery</option>
                    <option>Other</option>
                  </select>
                </div>
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  Send Invitation
                </Button>
              </div>
            </Card>

            {/* Upcoming Visitors */}
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Upcoming Visitors</h3>
              <div className="space-y-3">
                {visitors.map(visitor => (
                  <div key={visitor.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-semibold text-gray-800">{visitor.name}</p>
                        <p className="text-xs text-gray-500">{visitor.company}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        visitor.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {visitor.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>{visitor.purpose}</span>
                      <span>{visitor.date}</span>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" className="flex-1">
                        Reschedule
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 border-red-300 text-red-600">
                        Cancel
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Visitor Check-in Instructions */}
            <Card className="p-4 mt-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Visitor Check-in Process</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Visitors will receive an email with QR code. They can check-in at the reception kiosk using the QR or host confirmation.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Offices;
