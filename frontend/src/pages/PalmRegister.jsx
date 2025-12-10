import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { MapPin, Shield, AlertCircle, CheckCircle2, QrCode } from 'lucide-react';
import Logo from '../components/Logo';
import PalmNFCIcon from '../components/icons/PalmNFCIcon';
import { motion, AnimatePresence } from 'framer-motion';
import HoverCard3D from '../components/premium/HoverCard3D';

const PalmRegister = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'PalmPay Device Required',
      description: 'Palm biometric registration can only be completed at authorized PalmPe devices. Your phone cannot capture palm biometrics.',
      icon: AlertCircle,
      color: '#64E8FF'
    },
    {
      title: 'Find a PalmPe Device',
      description: 'Locate the nearest PalmPe registration terminal using our device locator.',
      icon: MapPin,
      color: '#586BFF'
    },
    {
      title: 'Complete Registration at Device',
      description: 'Follow the on-screen instructions at the PalmPe device to register your palm biometric securely.',
      icon: PalmNFCIcon,
      color: '#9B62FF'
    },
    {
      title: 'Return to App & Activate',
      description: 'After registration, return to the app and enter the enrollment code to activate PalmPay features.',
      icon: CheckCircle2,
      color: '#64E8FF'
    }
  ];

  const currentStepData = steps[currentStep];
  const IconComponent = currentStepData.icon;

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
        <div className="mb-8">
          <Logo size="lg" className="mx-auto" />
        </div>

        {/* Warning Banner */}
        <Card className="bg-[#64E8FF]/10 border-[#64E8FF]/30 p-4 mb-8 max-w-md">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#64E8FF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-sm">Important Notice</p>
              <p className="text-xs text-white/80 mt-1">
                This app does not capture palm biometrics. All biometric registration happens at PalmPe devices with hardware-level security (SE/TEE).
              </p>
            </div>
          </div>
        </Card>

        {/* Icon with Glow */}
        <div className="relative mb-8">
          <div 
            className="absolute inset-0 rounded-full blur-2xl opacity-50 transition-all duration-1000 animate-pulse"
            style={{ backgroundColor: currentStepData.color }}
          ></div>
          <div 
            className="relative w-32 h-32 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${currentStepData.color}20` }}
          >
            <IconComponent className="w-16 h-16" style={{ color: currentStepData.color }} />
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8 max-w-md">
          <div className="text-sm text-[#64E8FF] mb-2">Step {currentStep + 1} of {steps.length}</div>
          <h2 className="text-2xl font-bold mb-4">{currentStepData.title}</h2>
          <p className="text-gray-300 leading-relaxed">{currentStepData.description}</p>
        </div>

        {/* Device Registration Process */}
        {currentStep === 2 && (
          <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-6 max-w-md">
            <h3 className="font-semibold text-white mb-4">At the PalmPe Device:</h3>
            <ol className="space-y-3 text-sm text-gray-300">
              <li className="flex gap-3">
                <span className="text-[#586BFF] font-bold">1.</span>
                <span>Enter your phone number on the device screen</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#586BFF] font-bold">2.</span>
                <span>Place your palm (all 5 fingers visible) on the scanner</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#586BFF] font-bold">3.</span>
                <span>Hold steady during IR vein scan (5-10 seconds)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#586BFF] font-bold">4.</span>
                <span>Device generates secure hash in SE/TEE</span>
              </li>
              <li className="flex gap-3">
                <span className="text-[#586BFF] font-bold">5.</span>
                <span>Receive 6-digit enrollment code or scan QR</span>
              </li>
            </ol>
          </Card>
        )}

        {/* Security Info */}
        <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-4 mb-8 max-w-md">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-[#9B62FF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-white text-sm mb-1">Your Security Matters</p>
              <p className="text-xs text-gray-300">
                Palm data never leaves the PalmPe device. Only encrypted tokens are stored. Your biometric stays with you.
              </p>
            </div>
          </div>
        </Card>

        {/* Step Indicators */}
        <div className="flex gap-2 mb-8">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentStep ? 'w-8 bg-[#586BFF]' : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="w-full max-w-md space-y-3">
          {currentStep < steps.length - 1 ? (
            <>
              <Button 
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
              >
                Next
              </Button>
              {currentStep === 1 && (
                <Button 
                  onClick={() => navigate('/device-locator')}
                  variant="outline"
                  className="w-full border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/10 h-12"
                >
                  <MapPin className="w-5 h-5 mr-2" />
                  Find Nearby Devices
                </Button>
              )}
            </>
          ) : (
            <>
              <Button 
                onClick={() => navigate('/device-enrollment')}
                className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
              >
                <QrCode className="w-5 h-5 mr-2" />
                I've Completed Registration
              </Button>
              <Button 
                onClick={() => navigate('/device-locator')}
                variant="outline"
                className="w-full border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/10 h-12"
              >
                <MapPin className="w-5 h-5 mr-2" />
                Find Devices
              </Button>
            </>
          )}
          <Button 
            onClick={() => navigate('/home')}
            variant="ghost"
            className="w-full text-white/60 hover:text-white hover:bg-white/5"
          >
            Skip for Now (Use UPI Only)
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center max-w-md">
          <p className="text-xs text-gray-600 font-medium mb-1">
            PalmPe™ | PalmPay™
          </p>
          <p className="text-xs text-gray-500 mb-1">
            © 2025 Lumioria Innovations Pvt. Ltd. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-400">
            RBI Compliant • UPI Enabled
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Palm biometrics performed only at authorized PalmPe™ devices
          </p>
        </div>
      </div>
    </div>
  );
};

export default PalmRegister;