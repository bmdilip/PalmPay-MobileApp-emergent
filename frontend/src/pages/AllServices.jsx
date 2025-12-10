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
  BadgeDollarSign,
  School,
  HeartHandshake,
  ReceiptText,
  Gas
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
    { id: 'mobile', name: 'Mobile Recharge', icon: Smartphone, color: '#586BFF', category: 'recharge', path: '/services/mobile-recharge' },
    { id: 'dth', name: 'DTH', icon: Repeat, color: '#9B62FF', category: 'recharge', path: '/services/dth' },
    { id: 'datacard', name: 'Data Card', icon: Wifi, color: '#4ECDC4', category: 'recharge', path: '/services/datacard' },
    { id: 'cable', name: 'Cable TV', icon: Tv, color: '#FF6B6B', category: 'recharge', path: '/services/cable-tv' },
    
    // Utilities
    { id: 'electricity', name: 'Electricity Bill', icon: Zap, color: '#FF6B35', category: 'utilities', path: '/services/electricity' },
    { id: 'water', name: 'Water Bill', icon: Droplet, color: '#4ECDC4', category: 'utilities', path: '/services/water' },
    { id: 'gas', name: 'Gas Bill', icon: Zap, color: '#F7931E', category: 'utilities', path: '/services/gas' },
    { id: 'broadband', name: 'Broadband', icon: Wifi, color: '#64E8FF', category: 'utilities', path: '/services/broadband' },
    { id: 'landline', name: 'Landline', icon: Phone, color: '#95A5A6', category: 'utilities', path: '/services/landline' },
    { id: 'postpaid', name: 'Mobile Postpaid', icon: Phone, color: '#E74C3C', category: 'utilities', path: '/services/postpaid' },
    
    // Housing & Society
    { id: 'housing', name: 'Housing Society', icon: Building2, color: '#3498DB', category: 'housing', path: '/services/housing' },
    { id: 'municipal', name: 'Municipal Tax', icon: Home, color: '#16A085', category: 'housing', path: '/services/municipal' },
    { id: 'rental', name: 'Rental', icon: Building2, color: '#8E44AD', category: 'housing', path: '/services/rental' },
    { id: 'clubs', name: 'Clubs & Associations', icon: Users, color: '#E67E22', category: 'housing', path: '/services/clubs' },
    
    // Travel
    { id: 'fastag', name: 'FASTag', icon: Truck, color: '#9C27B0', category: 'travel', path: '/services/fastag' },
    { id: 'flights', name: 'Flights', icon: Plane, color: '#2196F3', category: 'travel', path: '/services/flights' },
    { id: 'hotels', name: 'Hotels', icon: Hotel, color: '#FF9800', category: 'travel', path: '/services/hotels' },
    { id: 'metro', name: 'Metro Card', icon: Truck, color: '#673AB7', category: 'travel', path: '/services/metro' },
    
    // Financial
    { id: 'insurance', name: 'Insurance', icon: Shield, color: '#00BCD4', category: 'financial', path: '/services/insurance' },
    { id: 'loan', name: 'Loan Repayment', icon: CreditCard, color: '#9C27B0', category: 'financial', path: '/services/loan-repayment' },
    { id: 'lic', name: 'LIC Premium', icon: Shield, color: '#4CAF50', category: 'financial', path: '/services/lic' },
    
    // Others
    { id: 'education', name: 'Education Fee', icon: GraduationCap, color: '#FF5722', category: 'others', path: '/services/education' },
    { id: 'donation', name: 'Donation', icon: Heart, color: '#E91E63', category: 'others', path: '/services/donation' },
    { id: 'echallan', name: 'eChallan', icon: Receipt, color: '#607D8B', category: 'others', path: '/services/echallan' },
    { id: 'cylinder', name: 'Book Cylinder', icon: Package, color: '#FF9800', category: 'others', path: '/services/cylinder' }
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
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-md group-hover:shadow-xl transition-all"
                  style={{ 
                    backgroundColor: `${service.color}15`,
                    boxShadow: `0 4px 12px ${service.color}25`
                  }}
                >
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
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
