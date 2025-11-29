import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bell, HelpCircle } from 'lucide-react';
import { mockUser } from '../mockDataPalmPay';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import Logo from '../components/Logo';

// Animated Background Components
import MeshGradientBackground from '../components/animated/MeshGradientBackground';
import DotGridBackground from '../components/animated/DotGridBackground';
import ParticleField from '../components/animated/ParticleField';

// Premium Components
import { 
  FloatingActionButton,
  AdvertisementBanner,
  LayoutSwitcher
} from '../components/premium';

// Layout Components
import { CompactLayout, ClassicLayout, FocusedPalmLayout, MarketplaceLayout } from './AnimatedHomeLayouts';

import { pulseAnimation } from '../lib/animations';

const AnimatedHomeWithLayouts = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [currentLayout, setCurrentLayout] = useState('compact');
  const navigate = useNavigate();
  const { selectedWallet } = useWallet();

  useEffect(() => {
    // Load saved layout preference
    const savedLayout = localStorage.getItem('homeLayout') || 'compact';
    setCurrentLayout(savedLayout);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLayoutChange = (layout) => {
    setCurrentLayout(layout);
    localStorage.setItem('homeLayout', layout);
  };

  const layoutOptions = [
    { id: 'compact', label: 'Compact' },
    { id: 'classic', label: 'Classic' },
    { id: 'palm', label: 'Palm Focus' },
    { id: 'marketplace', label: 'Marketplace' }
  ];

  const renderLayout = () => {
    const layoutProps = {
      user: mockUser,
      wallet: selectedWallet,
      navigate,
      showBalance,
      setShowBalance
    };

    switch (currentLayout) {
      case 'compact':
        return <CompactLayout {...layoutProps} />;
      case 'classic':
        return <ClassicLayout {...layoutProps} />;
      case 'palm':
        return <FocusedPalmLayout {...layoutProps} />;
      case 'marketplace':
        return <MarketplaceLayout {...layoutProps} />;
      default:
        return <CompactLayout {...layoutProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative overflow-hidden">
      {/* Background Layers */}
      <MeshGradientBackground />
      <DotGridBackground />
      <ParticleField count={20} />

      {/* Hero Header */}
      <motion.div 
        className={`bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 rounded-b-[2rem] shadow-2xl relative overflow-hidden transition-all duration-500 ${
          scrolled ? 'pt-4 pb-3' : 'pt-8 pb-6'
        }`}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Decorative circles */}
        <motion.div 
          className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <div className="relative z-10">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <Logo size={scrolled ? "sm" : "md"} withGlow={false} />
            <div className="flex items-center gap-2">
              {/* Layout Switcher */}
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-1">
                <select
                  value={currentLayout}
                  onChange={(e) => handleLayoutChange(e.target.value)}
                  className="bg-transparent text-white text-xs font-medium border-none outline-none cursor-pointer px-2 py-1"
                >
                  {layoutOptions.map(option => (
                    <option key={option.id} value={option.id} className="bg-[#586BFF] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <motion.button 
                className="relative p-2.5 hover:bg-white/10 rounded-full transition-all"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/support')}
              >
                <Bell className="w-5 h-5" />
                <motion.span 
                  className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"
                  {...pulseAnimation}
                />
              </motion.button>
            </div>
          </div>

          {/* User Greeting */}
          {!scrolled && (
            <motion.div 
              className="mb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p 
                className="text-white/80 text-sm mb-1"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Welcome back,
              </motion.p>
              <motion.h2 
                className="text-2xl font-bold tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {mockUser.name}
              </motion.h2>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Layout Content */}
      <motion.div
        key={currentLayout}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="py-6"
      >
        {renderLayout()}
      </motion.div>

      {/* Advertisement Banner */}
      <AdvertisementBanner 
        onClose={() => console.log('Ad closed')}
        onClick={(ad) => {
          console.log('Ad clicked:', ad);
          navigate(ad.link);
        }}
      />

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={() => navigate('/support')}
        icon={<HelpCircle className="w-6 h-6" />}
      />
    </div>
  );
};

export default AnimatedHomeWithLayouts;