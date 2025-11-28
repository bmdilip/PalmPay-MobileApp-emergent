import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Hand, Camera, CheckCircle2, Shield, Scan } from 'lucide-react';

const PalmRegister = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('intro'); // intro, scanning, processing, success
  const [progress, setProgress] = useState(0);
  const [scanLines, setScanLines] = useState(0);

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('processing');
            return 100;
          }
          return prev + 2;
        });
        setScanLines(prev => (prev + 1) % 5);
      }, 50);
      return () => clearInterval(interval);
    }

    if (step === 'processing') {
      setTimeout(() => setStep('success'), 2000);
    }
  }, [step]);

  const startScanning = () => {
    setStep('scanning');
    setProgress(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white">
      {/* Intro Step */}
      {step === 'intro' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-[#586BFF] blur-3xl opacity-40 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-[#586BFF]/20 rounded-full flex items-center justify-center">
              <Hand className="w-16 h-16 text-[#586BFF]" />
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-center">Register Your Palm</h1>
          <p className="text-gray-300 text-center mb-8 max-w-md">
            We'll scan your palm's vein pattern to create a secure biometric signature. This happens locally on your device.
          </p>

          <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-8 max-w-md">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Camera className="w-5 h-5 text-[#64E8FF] mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Front Camera Access</p>
                  <p className="text-sm text-gray-400">Required for palm scanning</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-[#9B62FF] mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Secure Element Storage</p>
                  <p className="text-sm text-gray-400">Data encrypted in SE/TEE</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Scan className="w-5 h-5 text-[#64E8FF] mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Liveness Detection</p>
                  <p className="text-sm text-gray-400">Prevents spoofing attacks</p>
                </div>
              </div>
            </div>
          </Card>

          <Button 
            onClick={startScanning}
            className="w-full max-w-md bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
          >
            Start Palm Scan
          </Button>
        </div>
      )}

      {/* Scanning Step */}
      {step === 'scanning' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
          <h2 className="text-2xl font-bold mb-2">Hold Your Palm Steady</h2>
          <p className="text-gray-300 mb-8">Align your hand within the frame</p>

          {/* Palm Scanner */}
          <div className="relative w-80 h-96 mb-8">
            {/* Camera Preview Simulation */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] to-[#1a1f3a] rounded-3xl border-2 border-[#586BFF] overflow-hidden">
              {/* IR Beam Animation */}
              <div 
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#64E8FF] to-transparent shadow-lg shadow-[#64E8FF]"
                style={{ 
                  top: `${scanLines * 20}%`,
                  transition: 'top 0.05s linear'
                }}
              ></div>

              {/* Palm Outline */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-full bg-[#586BFF] blur-3xl opacity-40 animate-pulse"></div>
                  
                  {/* Palm Icon */}
                  <Hand className="w-32 h-32 text-[#586BFF] relative" strokeWidth={1.5} />
                  
                  {/* Vein Lines */}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-1/2 left-1/2 w-1 bg-gradient-to-b from-[#586BFF] to-[#9B62FF] rounded-full opacity-70"
                      style={{
                        height: `${40 + i * 10}px`,
                        transform: `translate(-50%, -50%) rotate(${-30 + i * 15}deg)`,
                        filter: 'blur(1px)',
                        boxShadow: '0 0 10px #586BFF'
                      }}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Corner Guides */}
              {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map(corner => (
                <div
                  key={corner}
                  className={`absolute w-8 h-8 border-[#64E8FF] ${
                    corner.includes('top') ? 'top-4' : 'bottom-4'
                  } ${
                    corner.includes('left') ? 'left-4 border-t-2 border-l-2' : 'right-4 border-t-2 border-r-2'
                  } ${
                    corner.includes('bottom') && 'border-t-0 border-b-2'
                  }`}
                ></div>
              ))}
            </div>

            {/* HUD Rings */}
            {[1, 2, 3].map(ring => (
              <div
                key={ring}
                className="absolute top-1/2 left-1/2 border border-[#586BFF]/30 rounded-full"
                style={{
                  width: `${ring * 100}px`,
                  height: `${ring * 100}px`,
                  transform: 'translate(-50%, -50%)',
                  animation: `spin ${20 / ring}s linear infinite`
                }}
              ></div>
            ))}
          </div>

          {/* Progress */}
          <div className="w-full max-w-md mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Scanning Progress</span>
              <span className="text-[#64E8FF] font-semibold">{progress}%</span>
            </div>
            <div className="h-2 bg-[#1a1f3a] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#586BFF] to-[#64E8FF] transition-all duration-100"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <p className="text-sm text-gray-400 text-center">Mapping vein patterns...</p>
        </div>
      )}

      {/* Processing Step */}
      {step === 'processing' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-[#9B62FF] blur-3xl opacity-50 animate-pulse"></div>
            <div className="relative w-24 h-24 bg-[#9B62FF]/20 rounded-full flex items-center justify-center animate-spin" style={{ animationDuration: '3s' }}>
              <Shield className="w-12 h-12 text-[#9B62FF]" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Creating Secure Hash</h2>
          <p className="text-gray-300 text-center">Encrypting biometric data in Secure Element...</p>
        </div>
      )}

      {/* Success Step */}
      {step === 'success' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="relative mb-6">
            <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-3xl opacity-50 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-[#64E8FF]/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-[#64E8FF]" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">Palm Registered!</h2>
          <p className="text-gray-300 text-center mb-8 max-w-md">
            Your palm biometric is now linked to your account. You can make phone-less payments at any PalmPe device.
          </p>

          <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-8 max-w-md">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Palm ID</span>
                <span className="text-white font-mono">PALM-AMH-8472</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Security Level</span>
                <span className="text-[#64E8FF]">Military Grade</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">SE Status</span>
                <span className="text-green-400">Active</span>
              </div>
            </div>
          </Card>

          <Button 
            onClick={() => navigate('/home')}
            className="w-full max-w-md bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
          >
            Go to Home
          </Button>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PalmRegister;