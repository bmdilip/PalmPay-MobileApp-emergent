import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { QrCode, ArrowLeft, CheckCircle2, Scan } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import PalmNFCIcon from '../components/icons/PalmNFCIcon';

const Palm2QR = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState('intro'); // intro, scanning, verify, success
  const [amount, setAmount] = useState('');
  const [scanProgress, setScanProgress] = useState(0);
  const [merchantName] = useState('Cafe Coffee Day');

  useEffect(() => {
    if (step === 'scanning') {
      const interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep('verify');
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [step]);

  const startScan = () => {
    setStep('scanning');
    setScanProgress(0);
  };

  const confirmPayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    setStep('success');
    setTimeout(() => {
      navigate('/home');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white">
      {/* Intro */}
      {step === 'intro' && (
        <div className="min-h-screen flex flex-col px-6 py-12">
          <button onClick={() => navigate('/home')} className="self-start mb-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 rounded-full bg-[#586BFF] blur-3xl opacity-40 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-[#586BFF]/20 rounded-full flex items-center justify-center">
                <div className="relative">
                  <QrCode className="w-16 h-16 text-[#586BFF]" />
                  <PalmNFCIcon className="w-8 h-8 absolute -bottom-2 -right-2" style={{ filter: 'brightness(0) saturate(100%) invert(76%) sepia(86%) saturate(3068%) hue-rotate(154deg) brightness(101%) contrast(101%)' }} />
                </div>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4 text-center">Palm2QR Payment</h1>
            <p className="text-gray-300 text-center mb-8 max-w-md">
              Scan QR codes using your palm biometric for instant authentication. No PIN required.
            </p>

            <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-8 max-w-md">
              <h3 className="font-semibold text-white mb-4">How it works:</h3>
              <ol className="space-y-3 text-sm text-gray-300">
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">1.</span>
                  <span>Show your palm to the camera</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">2.</span>
                  <span>Camera will scan the merchant QR code</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">3.</span>
                  <span>Triple-hash generated locally</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-[#586BFF] font-bold">4.</span>
                  <span>Confirm amount and pay instantly</span>
                </li>
              </ol>
            </Card>

            <Button 
              onClick={startScan}
              className="w-full max-w-md bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
            >
              Start Palm2QR Scan
            </Button>
          </div>
        </div>
      )}

      {/* Scanning */}
      {step === 'scanning' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <h2 className="text-2xl font-bold mb-2">Scanning...</h2>
          <p className="text-gray-300 mb-8">Hold your palm steady over the QR code</p>

          <div className="relative w-80 h-80 mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0A0F1F] to-[#1a1f3a] rounded-3xl border-2 border-[#586BFF] overflow-hidden">
              {/* Palm + QR Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <QrCode className="w-32 h-32 text-[#586BFF]/50" />
                  <PalmNFCIcon className="w-20 h-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ filter: 'brightness(0) saturate(100%) invert(76%) sepia(86%) saturate(3068%) hue-rotate(154deg) brightness(101%) contrast(101%)' }} />
                </div>
              </div>

              {/* Scan Line */}
              <div 
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#64E8FF] to-transparent shadow-lg shadow-[#64E8FF]"
                style={{ 
                  top: `${(scanProgress / 100) * 100}%`,
                  transition: 'top 0.1s linear'
                }}
              ></div>
            </div>
          </div>

          <div className="w-full max-w-md">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Authenticating</span>
              <span className="text-[#64E8FF] font-semibold">{scanProgress}%</span>
            </div>
            <div className="h-2 bg-[#1a1f3a] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#586BFF] to-[#64E8FF] transition-all"
                style={{ width: `${scanProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}

      {/* Verify Payment */}
      {step === 'verify' && (
        <div className="min-h-screen flex flex-col px-6 py-12">
          <button onClick={() => setStep('intro')} className="self-start mb-6 p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>

          <div className="flex-1 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold mb-2">Confirm Payment</h2>
            <p className="text-gray-300 mb-8">Biometric authenticated successfully</p>

            <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-6 w-full max-w-md">
              <div className="text-center mb-6">
                <p className="text-gray-400 text-sm mb-2">Paying to</p>
                <p className="text-2xl font-bold text-white">{merchantName}</p>
              </div>

              <div className="mb-6">
                <label className="text-sm font-medium text-gray-400 mb-2 block">Enter Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-3xl font-semibold text-white">₹</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-12 text-3xl font-semibold h-16 text-center bg-[#0A0F1F] border-[#586BFF]/30 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Payment Method</span>
                  <span className="text-white flex items-center gap-1">
                    <Hand className="w-4 h-4 text-[#64E8FF]" />
                    Palm Biometric
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hash Status</span>
                  <span className="text-green-400">Generated</span>
                </div>
              </div>
            </Card>

            <Button 
              onClick={confirmPayment}
              className="w-full max-w-md bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold"
            >
              Confirm & Pay
            </Button>
          </div>
        </div>
      )}

      {/* Success */}
      {step === 'success' && (
        <div className="min-h-screen flex flex-col items-center justify-center px-6">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-3xl opacity-50"></div>
            <div className="relative w-32 h-32 bg-[#64E8FF]/20 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle2 className="w-16 h-16 text-[#64E8FF]" />
            </div>
          </div>

          <h2 className="text-3xl font-bold mb-2">Payment Successful!</h2>
          <p className="text-gray-300 text-center mb-4">
            ₹{amount} paid to {merchantName}
          </p>
          <p className="text-sm text-[#64E8FF]">Authorized via Palm Biometrics</p>
        </div>
      )}
    </div>
  );
};

export default Palm2QR;