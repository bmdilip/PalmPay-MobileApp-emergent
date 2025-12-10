import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Shield, Zap, CheckCircle2 } from 'lucide-react';
import Logo from '../components/Logo';
import PalmScanAnimation from '../components/premium/PalmScanAnimation';
import { PatentPendingBadge } from '../components/premium';
import PalmNFCIcon from '../components/icons/PalmNFCIcon';
import { setOnboardingCompleted } from '../utils/auth';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatePulse, setAnimatePulse] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatePulse(prev => !prev);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      icon: PalmNFCIcon,
      title: 'What is PalmPay?',
      description: 'Phone-less payments powered by PalmPe devices. Pay at stores without touching your phone. Your palm is your wallet.',
      color: '#586BFF',
      showPalmVein: true
    },
    {
      icon: Shield,
      title: 'How Devices Work',
      description: 'PalmPe devices use secure IR capture and on-device encryption. No raw biometrics stored anywhere—only cryptographic consent hashes.',
      color: '#9B62FF'
    },
    {
      icon: CheckCircle2,
      title: 'Consent + Privacy',
      description: 'Every payment creates a verifiable consent token. You control your data. Full UPI wallet works with or without device pairing.',
      color: '#64E8FF'
    }
  ];

  const currentSlideData = slides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-10 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#9B62FF] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Logo */}
        <div className="mb-12 flex flex-col items-center">
          <Logo size="xl" withGlow={true} className="mb-4" />
          <p className="text-[#64E8FF] text-sm tracking-widest">YOUR PALM. YOUR WALLET.</p>
        </div>

        {/* Icon with Glow or Palm Scan Animation */}
        <div className="relative mb-8">
          {currentSlideData.showPalmVein ? (
            <div className="w-full max-w-md flex justify-center px-8">
              <PalmScanAnimation />
            </div>
          ) : (
            <>
              <div 
                className="absolute inset-0 rounded-full blur-2xl opacity-50 transition-all duration-1000"
                style={{ 
                  backgroundColor: currentSlideData.color,
                  transform: animatePulse ? 'scale(1.5)' : 'scale(1.2)'
                }}
              ></div>
              <div 
                className="relative w-32 h-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${currentSlideData.color}20` }}
              >
                <IconComponent className="w-16 h-16" style={{ color: currentSlideData.color }} />
              </div>
            </>
          )}
        </div>

        {/* Slide Content */}
        <div className="text-center mb-8 max-w-md">
          <h2 className="text-2xl font-bold mb-4">{currentSlideData.title}</h2>
          <p className="text-gray-300 leading-relaxed">{currentSlideData.description}</p>
          
          {/* Patent Badges on first slide */}
          {currentSlide === 0 && (
            <div className="mt-6">
              <PatentPendingBadge />
            </div>
          )}
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2 mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-[#586BFF]' : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="w-full max-w-md space-y-3">
          {currentSlide === slides.length - 1 ? (
            <>
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
              >
                Get Started
              </Button>
              <Button 
                onClick={() => navigate('/auth')}
                variant="outline"
                className="w-full border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/10 h-12"
              >
                Skip to Login
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => setCurrentSlide(prev => prev + 1)}
              className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
            >
              Next
            </Button>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-600 font-medium mb-1">
            PalmPe™ | PalmPay™
          </p>
          <p className="text-xs text-gray-500 mb-1">
            © 2025 Lumioria Innovations Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-400">
            RBI Compliant • UPI Enabled
          </p>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;