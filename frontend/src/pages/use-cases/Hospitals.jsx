import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Hospital, MapPin, Check, ChevronRight, ArrowLeft, Clock, Star, 
  Search, Calendar, User, FileText, Pill, TestTube, Video,
  Phone, CreditCard, Heart, AlertCircle, ChevronDown, Filter
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import HoverCard3D from '../../components/premium/HoverCard3D';

const Hospitals = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('hospitals'); // hospitals, appointments, records, pharmacy
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingStep, setBookingStep] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hospitals data (based on real Bangalore hospitals)
  const hospitals = [
    {
      id: 'apollo',
      name: 'Apollo Hospitals',
      address: 'Bannerghatta Road, Bangalore',
      distance: '2.3 km',
      rating: 4.8,
      reviews: 2450,
      image: '🏥',
      services: ['OPD', 'Emergency', 'Pharmacy', 'Lab', 'ICU'],
      specialties: ['Cardiology', 'Orthopedics', 'Neurology', 'Oncology'],
      palmPe: true,
      waitTime: '15 mins',
      openNow: true,
      doctors: [
        { id: 'd1', name: 'Dr. Rajesh Kumar', specialty: 'Cardiologist', experience: '20 yrs', fee: 800, rating: 4.9, available: true },
        { id: 'd2', name: 'Dr. Priya Sharma', specialty: 'Neurologist', experience: '15 yrs', fee: 700, rating: 4.8, available: true },
        { id: 'd3', name: 'Dr. Amit Patel', specialty: 'Orthopedic', experience: '18 yrs', fee: 750, rating: 4.7, available: false }
      ]
    },
    {
      id: 'manipal',
      name: 'Manipal Hospital',
      address: 'HAL Airport Road, Bangalore',
      distance: '4.1 km',
      rating: 4.7,
      reviews: 1890,
      image: '🏥',
      services: ['OPD', 'Emergency', 'ICU', 'Pharmacy', 'Radiology'],
      specialties: ['Oncology', 'Gastroenterology', 'Pulmonology'],
      palmPe: true,
      waitTime: '20 mins',
      openNow: true,
      doctors: [
        { id: 'd4', name: 'Dr. Sunita Reddy', specialty: 'Oncologist', experience: '22 yrs', fee: 1000, rating: 4.9, available: true },
        { id: 'd5', name: 'Dr. Vikram Singh', specialty: 'Gastroenterologist', experience: '12 yrs', fee: 600, rating: 4.6, available: true }
      ]
    },
    {
      id: 'fortis',
      name: 'Fortis Hospital',
      address: 'Cunningham Road, Bangalore',
      distance: '3.5 km',
      rating: 4.6,
      reviews: 1650,
      image: '🏥',
      services: ['OPD', 'Cardiology', 'Neurology', 'Lab'],
      specialties: ['Cardiology', 'Neurology', 'Pediatrics'],
      palmPe: true,
      waitTime: '10 mins',
      openNow: true,
      doctors: [
        { id: 'd6', name: 'Dr. Meera Nair', specialty: 'Pediatrician', experience: '16 yrs', fee: 500, rating: 4.8, available: true }
      ]
    },
    {
      id: 'narayana',
      name: 'Narayana Health',
      address: 'Bommasandra, Bangalore',
      distance: '8.2 km',
      rating: 4.5,
      reviews: 3200,
      image: '🏥',
      services: ['OPD', 'Surgery', 'Emergency', 'Pharmacy', 'Cardiac Care'],
      specialties: ['Cardiac Surgery', 'Nephrology', 'Urology'],
      palmPe: true,
      waitTime: '25 mins',
      openNow: true,
      doctors: [
        { id: 'd7', name: 'Dr. Devi Shetty', specialty: 'Cardiac Surgeon', experience: '30 yrs', fee: 1500, rating: 5.0, available: true }
      ]
    },
    {
      id: 'columbia',
      name: 'Columbia Asia Hospital',
      address: 'Hebbal, Bangalore',
      distance: '6.7 km',
      rating: 4.6,
      reviews: 980,
      image: '🏥',
      services: ['OPD', 'Orthopedics', 'Emergency', 'Lab'],
      specialties: ['Orthopedics', 'Sports Medicine', 'Rehabilitation'],
      palmPe: true,
      waitTime: '12 mins',
      openNow: true,
      doctors: []
    },
    {
      id: 'sakra',
      name: 'Sakra World Hospital',
      address: 'Marathahalli, Bangalore',
      distance: '5.3 km',
      rating: 4.7,
      reviews: 1120,
      image: '🏥',
      services: ['OPD', 'Oncology', 'Pediatrics', 'ICU', 'Maternity'],
      specialties: ['Oncology', 'Pediatrics', 'Gynecology'],
      palmPe: true,
      waitTime: '18 mins',
      openNow: true,
      doctors: []
    }
  ];

  // Specialties for filter
  const specialties = [
    'All', 'Cardiology', 'Orthopedics', 'Neurology', 'Oncology', 
    'Pediatrics', 'Gastroenterology', 'Dermatology', 'ENT'
  ];

  // Available dates (next 7 days)
  const availableDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return {
      date: date,
      day: date.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      isToday: i === 0
    };
  });

  // Time slots
  const timeSlots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '11:30 AM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: true },
    { time: '03:00 PM', available: false },
    { time: '03:30 PM', available: true },
    { time: '04:00 PM', available: true },
    { time: '04:30 PM', available: true }
  ];

  // Mock health records
  const healthRecords = [
    { id: 1, type: 'Lab Report', name: 'Complete Blood Count', date: '10 Dec 2024', hospital: 'Apollo' },
    { id: 2, type: 'Prescription', name: 'Dr. Rajesh Kumar', date: '8 Dec 2024', hospital: 'Apollo' },
    { id: 3, type: 'Scan', name: 'Chest X-Ray', date: '5 Dec 2024', hospital: 'Manipal' }
  ];

  // Mock pharmacy orders
  const pharmacyOrders = [
    { id: 1, medicines: 3, status: 'Delivered', date: '9 Dec 2024', amount: 456 },
    { id: 2, medicines: 5, status: 'In Transit', date: '12 Dec 2024', amount: 892 }
  ];

  const filteredHospitals = hospitals.filter(h => {
    const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      h.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'all' || 
      h.specialties.some(s => s.toLowerCase() === selectedSpecialty.toLowerCase());
    return matchesSearch && matchesSpecialty;
  });

  const handleBookAppointment = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setBookingSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white p-5 pb-20">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Healthcare</h1>
            <p className="text-sm text-red-100">Hospitals • Doctors • Pharmacy</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/10 rounded-xl p-1 overflow-x-auto">
          {[
            { id: 'hospitals', label: 'Hospitals', icon: Hospital },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'records', label: 'Records', icon: FileText },
            { id: 'pharmacy', label: 'Pharmacy', icon: Pill }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-white text-red-600' : 'text-white/80 hover:bg-white/10'
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
        {/* HOSPITALS TAB */}
        {activeTab === 'hospitals' && !selectedHospital && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Search & Filter */}
            <Card className="p-4 mb-4 shadow-lg">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search hospitals, doctors, specialties..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10"
                />
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  <Filter className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {showFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap gap-2 pt-2 border-t">
                    {specialties.map(spec => (
                      <button
                        key={spec}
                        onClick={() => setSelectedSpecialty(spec.toLowerCase())}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                          selectedSpecialty === spec.toLowerCase()
                            ? 'bg-red-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {[
                { icon: Video, label: 'Video Consult', color: 'bg-blue-100 text-blue-600' },
                { icon: TestTube, label: 'Book Lab Test', color: 'bg-purple-100 text-purple-600' },
                { icon: Pill, label: 'Order Meds', color: 'bg-green-100 text-green-600' },
                { icon: FileText, label: 'Health Check', color: 'bg-orange-100 text-orange-600' }
              ].map((action, idx) => (
                <Card key={idx} className="p-3 cursor-pointer hover:shadow-lg transition-shadow">
                  <div className={`w-10 h-10 rounded-xl ${action.color} flex items-center justify-center mx-auto mb-2`}>
                    <action.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-center text-gray-700 font-medium">{action.label}</p>
                </Card>
              ))}
            </div>

            {/* Hospitals List */}
            <div className="space-y-3">
              {filteredHospitals.map((hospital, idx) => (
                <motion.div
                  key={hospital.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setSelectedHospital(hospital)}
                >
                  <HoverCard3D>
                    <Card className="p-4 cursor-pointer hover:shadow-xl transition-all">
                      <div className="flex gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-3xl flex-shrink-0">
                          {hospital.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-bold text-gray-800">{hospital.name}</h3>
                              <p className="text-xs text-gray-500 truncate">{hospital.address}</p>
                            </div>
                            {hospital.palmPe && (
                              <span className="px-2 py-0.5 bg-green-100 text-green-600 text-[10px] font-bold rounded-full">
                                PalmPe
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-3 text-xs text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {hospital.distance}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              {hospital.rating} ({hospital.reviews})
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {hospital.waitTime}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {hospital.services.slice(0, 4).map(service => (
                              <span key={service} className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] rounded-full">
                                {service}
                              </span>
                            ))}
                            {hospital.services.length > 4 && (
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded-full">
                                +{hospital.services.length - 4}
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

            {/* PalmPe Registration CTA */}
            <Card className="p-4 mt-4 bg-gradient-to-r from-red-50 to-rose-50 border-red-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-2xl">
                  👋
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Fast-track with PalmPe</p>
                  <p className="text-xs text-gray-600">Skip queues, instant payments, digital records</p>
                </div>
                <Button
                  onClick={() => navigate('/device-locator', { state: { returnTo: '/use-cases/hospitals' } })}
                  size="sm"
                  className="bg-red-600 hover:bg-red-700"
                >
                  Enable
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Hospital Detail & Booking */}
        {activeTab === 'hospitals' && selectedHospital && !bookingSuccess && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            {/* Back button */}
            <button
              onClick={() => { setSelectedHospital(null); setBookingStep(1); setSelectedDoctor(null); }}
              className="flex items-center gap-2 text-sm text-gray-600 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to hospitals
            </button>

            {/* Hospital Info Card */}
            <Card className="p-5 mb-4 shadow-lg">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center text-3xl">
                  {selectedHospital.image}
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{selectedHospital.name}</h2>
                  <p className="text-sm text-gray-500">{selectedHospital.address}</p>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-4 h-4 fill-yellow-400" />
                      {selectedHospital.rating}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{selectedHospital.reviews} reviews</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-3 gap-2">
                <button className="p-3 bg-blue-50 rounded-xl text-center">
                  <Phone className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-700">Call</span>
                </button>
                <button className="p-3 bg-green-50 rounded-xl text-center">
                  <MapPin className="w-5 h-5 text-green-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-700">Directions</span>
                </button>
                <button className="p-3 bg-purple-50 rounded-xl text-center">
                  <Heart className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                  <span className="text-xs text-gray-700">Save</span>
                </button>
              </div>
            </Card>

            {/* Booking Steps */}
            <div className="flex gap-2 mb-4">
              {['Doctor', 'Date & Time', 'Confirm'].map((step, idx) => (
                <div key={step} className="flex-1">
                  <div className={`h-1 rounded-full mb-1 ${
                    bookingStep > idx ? 'bg-red-600' : 'bg-gray-200'
                  }`} />
                  <p className={`text-xs text-center ${
                    bookingStep === idx + 1 ? 'text-red-600 font-semibold' : 'text-gray-400'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>

            {/* Step 1: Select Doctor */}
            {bookingStep === 1 && (
              <Card className="p-5 shadow-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Select Doctor</h3>
                <div className="space-y-3">
                  {selectedHospital.doctors.map(doctor => (
                    <button
                      key={doctor.id}
                      onClick={() => { setSelectedDoctor(doctor); setBookingStep(2); }}
                      disabled={!doctor.available}
                      className={`w-full p-4 rounded-xl text-left transition-all ${
                        !doctor.available 
                          ? 'bg-gray-50 opacity-60' 
                          : 'bg-white border-2 border-gray-100 hover:border-red-400'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center">
                          <User className="w-7 h-7 text-red-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-semibold text-gray-800">{doctor.name}</h4>
                            {!doctor.available && (
                              <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                                Unavailable
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500">{doctor.specialty} • {doctor.experience}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="flex items-center gap-1 text-sm text-yellow-600">
                              <Star className="w-3 h-3 fill-yellow-400" />
                              {doctor.rating}
                            </span>
                            <span className="text-sm font-semibold text-red-600">₹{doctor.fee}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </button>
                  ))}
                  {selectedHospital.doctors.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <User className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                      <p>No doctors listed for this hospital</p>
                    </div>
                  )}
                </div>
              </Card>
            )}

            {/* Step 2: Select Date & Time */}
            {bookingStep === 2 && selectedDoctor && (
              <Card className="p-5 shadow-lg">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{selectedDoctor.name}</h4>
                    <p className="text-sm text-gray-500">{selectedDoctor.specialty}</p>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-800 mb-3">Select Date</h3>
                <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                  {availableDates.map((d, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedDate(d)}
                      className={`flex-shrink-0 w-16 p-3 rounded-xl text-center transition-all ${
                        selectedDate === d
                          ? 'bg-red-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <p className="text-xs">{d.day}</p>
                      <p className="text-xl font-bold">{d.dayNum}</p>
                      <p className="text-xs">{d.month}</p>
                    </button>
                  ))}
                </div>

                {selectedDate && (
                  <>
                    <h3 className="font-semibold text-gray-800 mb-3">Select Time</h3>
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      {timeSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          onClick={() => slot.available && setSelectedSlot(slot)}
                          disabled={!slot.available}
                          className={`p-3 rounded-xl text-sm font-medium transition-all ${
                            !slot.available
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : selectedSlot === slot
                              ? 'bg-red-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>

                    <Button
                      onClick={() => setBookingStep(3)}
                      disabled={!selectedSlot}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      Continue
                    </Button>
                  </>
                )}
              </Card>
            )}

            {/* Step 3: Confirm & Pay */}
            {bookingStep === 3 && (
              <Card className="p-5 shadow-lg">
                <h3 className="font-semibold text-gray-800 mb-4">Confirm Appointment</h3>
                
                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                  <div className="flex items-center gap-3 mb-3 pb-3 border-b border-gray-200">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                      <User className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{selectedDoctor?.name}</h4>
                      <p className="text-sm text-gray-500">{selectedDoctor?.specialty}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Hospital</span>
                      <span className="font-medium">{selectedHospital.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date</span>
                      <span className="font-medium">{selectedDate?.day}, {selectedDate?.dayNum} {selectedDate?.month}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time</span>
                      <span className="font-medium">{selectedSlot?.time}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-red-50 p-4 rounded-xl mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Consultation Fee</span>
                    <span className="font-medium">₹{selectedDoctor?.fee}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Platform Fee</span>
                    <span className="font-medium">₹25</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-red-200">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-red-600">₹{(selectedDoctor?.fee || 0) + 25}</span>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mb-4">
                  <Label className="text-sm text-gray-600 mb-2 block">Payment Method</Label>
                  <div className="space-y-2">
                    {[
                      { id: 'palm', label: 'PalmPe', icon: '👋', desc: 'Instant verification' },
                      { id: 'upi', label: 'UPI', icon: '📱', desc: 'GPay, PhonePe' },
                      { id: 'card', label: 'Card', icon: '💳', desc: 'Credit/Debit' }
                    ].map(method => (
                      <button
                        key={method.id}
                        className="w-full p-3 rounded-xl border border-gray-200 hover:border-red-400 flex items-center gap-3 transition-colors"
                      >
                        <span className="text-xl">{method.icon}</span>
                        <div className="text-left">
                          <p className="font-medium text-gray-800">{method.label}</p>
                          <p className="text-xs text-gray-500">{method.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleBookAppointment}
                  disabled={loading}
                  className="w-full h-12 bg-red-600 hover:bg-red-700"
                >
                  {loading ? 'Processing...' : `Pay ₹${(selectedDoctor?.fee || 0) + 25}`}
                </Button>
              </Card>
            )}
          </motion.div>
        )}

        {/* Booking Success */}
        {bookingSuccess && (
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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked!</h2>
              <p className="text-gray-600 mb-6">Your appointment has been confirmed</p>

              <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{selectedDoctor?.name}</h4>
                    <p className="text-sm text-gray-500">{selectedHospital?.name}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Date</p>
                    <p className="font-semibold">{selectedDate?.day}, {selectedDate?.dayNum} {selectedDate?.month}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Time</p>
                    <p className="font-semibold">{selectedSlot?.time}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button onClick={() => navigate('/home')} className="w-full">
                  Go to Home
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setBookingSuccess(false);
                    setSelectedHospital(null);
                    setSelectedDoctor(null);
                    setBookingStep(1);
                  }}
                >
                  Book Another Appointment
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {/* APPOINTMENTS TAB */}
        {activeTab === 'appointments' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 shadow-lg mb-4">
              <h3 className="font-semibold text-gray-800 mb-4">Upcoming Appointments</h3>
              <div className="bg-red-50 p-4 rounded-xl mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <User className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">Dr. Rajesh Kumar</h4>
                    <p className="text-sm text-gray-500">Cardiologist • Apollo Hospitals</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Tomorrow, 10:00 AM</span>
                  </div>
                  <Button size="sm" variant="outline" className="border-red-400 text-red-600">
                    Reschedule
                  </Button>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">No other upcoming appointments</p>
            </Card>

            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Past Appointments</h3>
              <div className="space-y-3">
                {[
                  { doctor: 'Dr. Priya Sharma', specialty: 'Neurologist', date: '5 Dec 2024', hospital: 'Apollo' },
                  { doctor: 'Dr. Sunita Reddy', specialty: 'Oncologist', date: '28 Nov 2024', hospital: 'Manipal' }
                ].map((appt, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-800">{appt.doctor}</p>
                      <p className="text-xs text-gray-500">{appt.specialty} • {appt.hospital}</p>
                      <p className="text-xs text-gray-400">{appt.date}</p>
                    </div>
                    <Button size="sm" variant="ghost" className="text-red-600">
                      Book Again
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* RECORDS TAB */}
        {activeTab === 'records' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Health Records</h3>
              <div className="space-y-3">
                {healthRecords.map(record => (
                  <div key={record.id} className="p-4 bg-gray-50 rounded-xl flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      record.type === 'Lab Report' ? 'bg-purple-100' :
                      record.type === 'Prescription' ? 'bg-blue-100' : 'bg-green-100'
                    }`}>
                      {record.type === 'Lab Report' ? <TestTube className="w-6 h-6 text-purple-600" /> :
                       record.type === 'Prescription' ? <FileText className="w-6 h-6 text-blue-600" /> :
                       <FileText className="w-6 h-6 text-green-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{record.name}</p>
                      <p className="text-xs text-gray-500">{record.type} • {record.hospital}</p>
                      <p className="text-xs text-gray-400">{record.date}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* PHARMACY TAB */}
        {activeTab === 'pharmacy' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-5 shadow-lg mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Order Medicines</h3>
                <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                  🚀 Express Delivery
                </span>
              </div>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input placeholder="Search medicines..." className="pl-10" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-blue-50 rounded-xl text-left">
                  <FileText className="w-8 h-8 text-blue-600 mb-2" />
                  <p className="font-semibold text-gray-800">Upload Prescription</p>
                  <p className="text-xs text-gray-500">Get medicines delivered</p>
                </button>
                <button className="p-4 bg-green-50 rounded-xl text-left">
                  <Pill className="w-8 h-8 text-green-600 mb-2" />
                  <p className="font-semibold text-gray-800">Reorder</p>
                  <p className="text-xs text-gray-500">From past orders</p>
                </button>
              </div>
            </Card>

            <Card className="p-5 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Orders</h3>
              <div className="space-y-3">
                {pharmacyOrders.map(order => (
                  <div key={order.id} className="p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800">{order.medicines} medicines</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{order.date}</span>
                      <span className="font-semibold text-gray-800">₹{order.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
