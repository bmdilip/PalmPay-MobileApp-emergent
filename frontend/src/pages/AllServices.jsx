import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import {
  ArrowLeft,
  Smartphone,
  Zap,
  Repeat,
  Wifi,
  Droplet,
  Truck,
  Shield,
  CreditCard,
  Phone,
  Tv,
  Building2,
  Home,
  Users,
  Car,
  Plane,
  Hotel,
  Landmark,
  Gift,
  Heart,
  GraduationCap,
  Receipt,
  Package,
  Flame,
  Satellite,
  Radio,
  Network,
  MapPin,
  Train,
  Banknote,
  FileText,
  DollarSign,
  School,
  Handshake,
  FileCheck
} from 'lucide-react';

const AllServices = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'recharge', label: 'Recharge & Bills' },
    { id: 'utilities', label: 'Utilities' },
    { id: 'housing', label: 'Housing & Society' },
    { id: 'travel', label: 'Travel' },
    { id: 'financial', label: 'Financial' },
    { id: 'others', label: 'Others' }
  ];

  const allServices = [
    // Recharge & Bills
    { id: 'mobile', name: 'Mobile Recharge', icon: Smartphone, color: '#586BFF', category: 'recharge', path: '/services/mobile-recharge', gradient: 'from-blue-500 to-indigo-600' },
    { id: 'dth', name: 'DTH', icon: Satellite, color: '#9B62FF', category: 'recharge', path: '/services/dth', gradient: 'from-purple-500 to-pink-600' },
    { id: 'datacard', name: 'Data Card', icon: Wifi, color: '#4ECDC4', category: 'recharge', path: '/services/datacard', gradient: 'from-cyan-500 to-blue-600' },
    { id: 'cable', name: 'Cable TV', icon: Tv, color: '#FF6B6B', category: 'recharge', path: '/services/cable-tv', gradient: 'from-red-500 to-pink-600' },
    
    // Utilities
    { id: 'electricity', name: 'Electricity Bill', icon: Zap, color: '#FF6B35', category: 'utilities', path: '/services/electricity', gradient: 'from-orange-500 to-yellow-500' },
    { id: 'water', name: 'Water Bill', icon: Droplet, color: '#4ECDC4', category: 'utilities', path: '/services/water', gradient: 'from-blue-400 to-cyan-500' },
    { id: 'gas', name: 'Gas Bill', icon: Flame, color: '#F7931E', category: 'utilities', path: '/services/gas', gradient: 'from-orange-600 to-red-500' },
    { id: 'broadband', name: 'Broadband', icon: Network, color: '#64E8FF', category: 'utilities', path: '/services/broadband', gradient: 'from-sky-500 to-blue-600' },
    { id: 'landline', name: 'Landline', icon: Phone, color: '#95A5A6', category: 'utilities', path: '/services/landline', gradient: 'from-gray-500 to-slate-600' },
    { id: 'postpaid', name: 'Mobile Postpaid', icon: Smartphone, color: '#E74C3C', category: 'utilities', path: '/services/postpaid', gradient: 'from-red-500 to-rose-600' },
    
    // Housing & Society
    { id: 'housing', name: 'Housing Society', icon: Building2, color: '#3498DB', category: 'housing', path: '/services/housing', gradient: 'from-blue-600 to-indigo-600' },
    { id: 'municipal', name: 'Municipal Tax', icon: Landmark, color: '#16A085', category: 'housing', path: '/services/municipal', gradient: 'from-teal-600 to-emerald-600' },
    { id: 'rental', name: 'Rental', icon: Home, color: '#8E44AD', category: 'housing', path: '/services/rental', gradient: 'from-purple-600 to-violet-600' },
    { id: 'clubs', name: 'Clubs & Associations', icon: Users, color: '#E67E22', category: 'housing', path: '/services/clubs', gradient: 'from-orange-600 to-amber-600' },
    
    // Travel
    { id: 'fastag', name: 'FASTag', icon: Car, color: '#9C27B0', category: 'travel', path: '/services/fastag', gradient: 'from-purple-600 to-fuchsia-600' },
    { id: 'flights', name: 'Flights', icon: Plane, color: '#2196F3', category: 'travel', path: '/services/flights', gradient: 'from-blue-600 to-sky-500' },
    { id: 'hotels', name: 'Hotels', icon: Hotel, color: '#FF9800', category: 'travel', path: '/services/hotels', gradient: 'from-orange-500 to-amber-500' },
    { id: 'metro', name: 'Metro Card', icon: Train, color: '#673AB7', category: 'travel', path: '/services/metro', gradient: 'from-violet-600 to-purple-600' },
    
    // Financial
    { id: 'insurance', name: 'Insurance', icon: Shield, color: '#00BCD4', category: 'financial', path: '/services/insurance', gradient: 'from-cyan-600 to-blue-500' },
    { id: 'loan', name: 'Loan Repayment', icon: BadgeDollarSign, color: '#9C27B0', category: 'financial', path: '/services/loan-repayment', gradient: 'from-purple-600 to-pink-600' },
    { id: 'lic', name: 'LIC Premium', icon: FileText, color: '#4CAF50', category: 'financial', path: '/services/lic', gradient: 'from-green-600 to-emerald-600' },
    
    // Others
    { id: 'education', name: 'Education Fee', icon: School, color: '#FF5722', category: 'others', path: '/services/education', gradient: 'from-red-600 to-orange-500' },
    { id: 'donation', name: 'Donation', icon: HeartHandshake, color: '#E91E63', category: 'others', path: '/services/donation', gradient: 'from-pink-600 to-rose-600' },
    { id: 'echallan', name: 'eChallan', icon: ReceiptText, color: '#607D8B', category: 'others', path: '/services/echallan', gradient: 'from-slate-600 to-gray-600' },
    { id: 'cylinder', name: 'Book Cylinder', icon: Gas, color: '#FF9800', category: 'others', path: '/services/cylinder', gradient: 'from-orange-600 to-red-500' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? allServices 
    : allServices.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 py-6 shadow-lg sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold">All Services</h1>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-5 py-4 bg-white shadow-sm sticky top-[72px] z-40">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#586BFF] text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-5 py-6">
        <div className="grid grid-cols-3 gap-4">
          {filteredServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => navigate(service.path)}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105 group"
                style={{
                  animation: `fadeInUp 0.5s ease-out ${index * 0.05}s backwards`
                }}
              >
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all bg-gradient-to-br ${service.gradient} relative overflow-hidden`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <Icon className="w-7 h-7 text-white relative z-10" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight group-hover:text-gray-900 transition-colors">
                  {service.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default AllServices;
