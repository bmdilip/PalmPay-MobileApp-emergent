import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

const ServiceLayout = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  iconColor = '#586BFF',
  children,
  showBack = true,
  headerGradient = 'from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF]'
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <div className={`bg-gradient-to-br ${headerGradient} text-white px-5 pt-6 pb-8 shadow-lg relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24"></div>
        
        <div className="relative z-10">
          {showBack && (
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors mb-4 -ml-2"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          
          <div className="flex items-center gap-4">
            {Icon && (
              <div 
                className="w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center"
                style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <Icon className="w-8 h-8 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              {subtitle && <p className="text-sm text-white/80 mt-1">{subtitle}</p>}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4">
        {children}
      </div>
    </div>
  );
};

export default ServiceLayout;
