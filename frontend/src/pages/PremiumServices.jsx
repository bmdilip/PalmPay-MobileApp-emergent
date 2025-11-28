import React from 'react';
import { Card } from '../components/ui/card';
import { 
  Smartphone, Zap, Flame, Tv, Wifi, Droplet,
  Plane, Hotel, Train, Car, Bus,
  GraduationCap, Heart, Shield, TrendingUp, Sparkles,
  CreditCard, Receipt, FileText, Building2,
  Home, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const PremiumServices = () => {
  const navigate = useNavigate();

  const rechargeServices = [
    { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone, color: '#586BFF' },
    { id: 'dth', label: 'DTH Recharge', icon: Tv, color: '#9B62FF' },
    { id: 'broadband', label: 'Broadband', icon: Wifi, color: '#64E8FF' },
    { id: 'datacard', label: 'Data Card', icon: CreditCard, color: '#8B5CF6' },
  ];

  const billPayments = [
    { id: 'electricity', label: 'Electricity', icon: Zap, color: '#F59E0B' },
    { id: 'gas', label: 'Gas Cylinder', icon: Flame, color: '#EF4444' },
    { id: 'water', label: 'Water', icon: Droplet, color: '#3B82F6' },
    { id: 'piped-gas', label: 'Piped Gas', icon: Building2, color: '#10B981' },
    { id: 'landline', label: 'Landline', icon: FileText, color: '#6366F1' },
    { id: 'housing', label: 'Housing Society', icon: Home, color: '#8B5CF6' },
  ];

  const travelServices = [
    { id: 'flights', label: 'Flight Booking', icon: Plane, color: '#0EA5E9' },
    { id: 'hotels', label: 'Hotels', icon: Hotel, color: '#8B5CF6' },
    { id: 'trains', label: 'Train Tickets', icon: Train, color: '#10B981' },
    { id: 'bus', label: 'Bus Booking', icon: Bus, color: '#F59E0B' },
    { id: 'cab', label: 'Cab Booking', icon: Car, color: '#6366F1' },
  ];

  const financialServices = [
    { id: 'mutual', label: 'Mutual Funds', icon: TrendingUp, color: '#586BFF' },
    { id: 'gold', label: 'Digital Gold', icon: Sparkles, color: '#D4AF37' },
    { id: 'insurance', label: 'Insurance', icon: Shield, color: '#9B62FF' },
    { id: 'loan', label: 'Loans', icon: CreditCard, color: '#64E8FF' },
  ];

  const otherServices = [
    { id: 'education', label: 'Education Fee', icon: GraduationCap, color: '#8B5CF6' },
    { id: 'health', label: 'Health & Wellness', icon: Heart, color: '#EF4444' },
    { id: 'fastag', label: 'FASTag Recharge', icon: Car, color: '#10B981' },
    { id: 'cable', label: 'Cable TV', icon: Tv, color: '#F59E0B' },
  ];

  const ServiceSection = ({ title, services, gradient }) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4 px-5">
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
        <button className="text-sm font-semibold text-[#586BFF] flex items-center gap-1">
          See All <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="px-5">
        <div className="grid grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                className="flex flex-col items-center gap-2 group"
                onClick={() => navigate(`/service/${service.id}`)}
              >
                <div 
                  className="w-16 h-16 rounded-2xl shadow-md flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg transition-all"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {service.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Premium Header */}
      <div className="bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 pt-8 pb-6 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Logo size="sm" withGlow={false} />
            <div>
              <h1 className="text-xl font-bold">All Services</h1>
              <p className="text-xs text-white/80">Recharge, Pay Bills & More</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-5 -mt-4 mb-6">
        <Card className="border-0 shadow-lg">
          <input
            type="text"
            placeholder="Search services..."
            className="w-full p-4 text-sm outline-none rounded-2xl"
          />
        </Card>
      </div>

      {/* Service Sections */}
      <ServiceSection 
        title="Recharge Services" 
        services={rechargeServices}
      />

      <ServiceSection 
        title="Bill Payments" 
        services={billPayments}
      />

      {/* Promotional Banner */}
      <div className="px-5 mb-8">
        <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 border-0 p-5 shadow-lg text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wide">Save More</span>
            </div>
            <h3 className="text-lg font-bold mb-1">Get 5% Cashback</h3>
            <p className="text-sm text-white/90 mb-3">On all bill payments this week</p>
          </div>
        </Card>
      </div>

      <ServiceSection 
        title="Travel Services" 
        services={travelServices}
      />

      <ServiceSection 
        title="Financial Services" 
        services={financialServices}
      />

      <ServiceSection 
        title="Other Services" 
        services={otherServices}
      />
    </div>
  );
};

export default PremiumServices;