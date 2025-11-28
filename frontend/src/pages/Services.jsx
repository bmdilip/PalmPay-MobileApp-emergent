import React from 'react';
import { Card } from '../components/ui/card';
import { 
  Smartphone, Zap, Flame, Tv, Car, Plane, Hotel, Wifi, 
  GraduationCap, Droplet, Repeat, Wallet, Hand
} from 'lucide-react';
import { services } from '../mockDataPalmPay';

const Services = () => {
  const getIcon = (iconName) => {
    const icons = {
      Smartphone, Zap, Flame, Tv, Car, Plane, Hotel, Wifi,
      GraduationCap, Droplet, Repeat, Wallet
    };
    return icons[iconName] || Smartphone;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">Services</h1>
          <p className="text-gray-300 text-sm">Pay bills & recharge with your palm</p>
        </div>
      </div>

      {/* Central Palm Node */}
      <div className="flex justify-center -mt-8 mb-8">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#586BFF] blur-xl opacity-40 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-[#586BFF] to-[#9B62FF] text-white rounded-full p-6 shadow-2xl">
            <Hand className="w-12 h-12" />
          </div>
          
          {/* Connection Lines */}
          {services.map((_, index) => {
            const angle = (index * 360) / services.length;
            const radius = 120;
            return (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-0.5 bg-gradient-to-r from-[#586BFF]/50 to-transparent origin-left"
                style={{
                  height: `${radius}px`,
                  transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* Services Grid */}
      <div className="px-5">
        <div className="grid grid-cols-3 gap-4">
          {services.map((service) => {
            const IconComp = getIcon(service.icon);
            return (
              <Card 
                key={service.id}
                className="p-4 flex flex-col items-center gap-3 hover:shadow-lg transition-all cursor-pointer border border-gray-200 hover:border-[#586BFF]/30 group"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: service.color }}
                >
                  <IconComp className="w-7 h-7" />
                </div>
                <span className="text-xs font-medium text-gray-800 text-center leading-tight">
                  {service.label}
                </span>
              </Card>
            );
          })}
        </div>

        {/* Info Banner */}
        <Card className="mt-8 bg-gradient-to-r from-[#586BFF]/10 to-[#9B62FF]/10 border-[#586BFF]/20 p-4">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold">Palm Payment Ready:</span> All services support biometric authentication for faster checkout.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Services;