import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, QrCode, CheckCircle2, Shield, Smartphone } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Logo from '../components/Logo';

const DeviceEnrollment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const device = location.state?.device;
  
  const [step, setStep] = useState('intro'); // intro, scan, claim, success
  const [enrollCode, setEnrollCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClaimEnrollment = async () => {
    if (!enrollCode || enrollCode.length < 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit enrollment code from the device",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate API call: POST /api/device/claim
    setTimeout(() => {
      setIsProcessing(false);
      setStep('success');
      
      toast({
        title: "Palm Registered!",
        description: "PalmPay features have been enabled"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white">
      {/* Intro Step */}
      {step === 'intro' && (
        <div className="min-h-screen flex flex-col px-6 py-12">
          <button onClick={() => navigate(-1)} className="self-start mb-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-[#586BFF] blur-3xl opacity-40 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-[#586BFF]/20 rounded-full flex items-center justify-center">
                <Hand className="w-16 h-16 text-[#586BFF]" />
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-center">Palm Enrollment Process</h1>
            <p className="text-gray-300 text-center mb-8 max-w-md">
              Visit the selected PalmPe terminal to complete palm registration. Follow the steps on the device screen.
            </p>

            {device && (
              <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-8 max-w-md w-full">
                <h3 className="font-semibold text-white mb-2">Selected Device</h3>
                <p className="text-sm text-gray-300">{device.name}</p>
                <p className="text-xs text-gray-400 mt-1">{device.address}</p>
              </Card>
            )}

            <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-8 max-w-md w-full">
              <h3 className="font-semibold text-white mb-4">At the Terminal:</h3>
              <ol className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">1.</span>
                  <span>Open the enrollment mode on the PalmPe device</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">2.</span>
                  <span>Enter your registered phone number</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">3.</span>
                  <span>Place your palm on the scanner for vein capture</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">4.</span>
                  <span>Device will show a 6-digit enrollment code or QR</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">5.</span>
                  <span>Return here and enter the code to activate</span>
                </li>
              </ol>
            </Card>

            <div className="w-full max-w-md space-y-3">
              <Button 
                onClick={() => setStep('claim')}
                className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
              >
                I've Completed Enrollment
              </Button>
              <Button 
                onClick={() => setStep('scan')}
                variant="outline"
                className="w-full border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/10 h-12"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Scan QR Code Instead
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Scan QR Step */}
      {step === 'scan' && (
        <div className="min-h-screen flex flex-col px-6 py-12">
          <button onClick={() => setStep('intro')} className="self-start mb-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Scan Device QR Code</h2>
            <p className="text-gray-300 text-center mb-8 max-w-md">
              Point your camera at the QR code displayed on the PalmPe device after enrollment
            </p>

            <div className="relative w-80 h-80 mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] to-[#1a1f3a] rounded-3xl border-2 border-[#586BFF] overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <QrCode className="w-32 h-32 text-[#586BFF]/50" />
                  <Smartphone className="w-16 h-16 text-[#64E8FF] absolute" />
                </div>
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
            </div>

            <Button 
              onClick={() => setStep('claim')}
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Enter Code Manually
            </Button>
          </div>
        </div>
      )}

      {/* Claim with Code Step */}
      {step === 'claim' && (
        <div className="min-h-screen flex flex-col px-6 py-12">
          <button onClick={() => setStep('intro')} className="self-start mb-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-3xl opacity-40 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-[#64E8FF]/20 rounded-full flex items-center justify-center">
                <Shield className="w-12 h-12 text-[#64E8FF]" />
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-4">Enter Enrollment Code</h2>
            <p className="text-gray-300 text-center mb-8 max-w-md">
              Enter the 6-digit code displayed on the PalmPe device after successful palm registration
            </p>

            <div className="w-full max-w-md mb-8">
              <Input
                type="text"
                placeholder="Enter 6-digit code"
                value={enrollCode}
                onChange={(e) => setEnrollCode(e.target.value.toUpperCase().slice(0, 6))}
                maxLength={6}
                className="text-center text-3xl font-mono font-bold h-16 bg-white/5 border-[#586BFF]/30 text-white tracking-widest"
              />
            </div>

            <Button 
              onClick={handleClaimEnrollment}
              disabled={isProcessing || enrollCode.length < 6}
              className="w-full max-w-md bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold disabled:opacity-50"
            >
              {isProcessing ? 'Verifying...' : 'Activate PalmPay'}
            </Button>
          </div>
        </div>
      )}

      {/* Success Step */}
      {step === 'success' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-3xl opacity-50 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-[#64E8FF]/20 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-16 h-16 text-[#64E8FF]" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-4">Palm Registered!</h2>
          <p className="text-gray-300 text-center mb-8 max-w-md">
            Your palm biometric is now linked. PalmPay features have been enabled on your account.
          </p>

          <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-8 max-w-md">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Palm ID</span>
                <span className="text-white font-mono">palm-0xabc123</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Device ID</span>
                <span className="text-white font-mono">{device?.id || 'device-987'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Security Level</span>
                <span className="text-[#64E8FF]">Military Grade</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">PalmPay Status</span>
                <span className="text-green-400">Enabled</span>
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
    </div>
  );
};

export default DeviceEnrollment;