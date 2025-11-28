import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Hand, Smartphone, MapPin, Shield, Zap } from 'lucide-react';

const POSMode = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white">
      <div className="min-h-screen flex flex-col px-6 py-12">
        <button onClick={() => navigate('/home')} className="self-start mb-6 p-2 hover:bg-white/10 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center">
          {/* POS Device Visual */}
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-3xl bg-[#586BFF] blur-3xl opacity-30 animate-pulse"></div>
            <Card className="relative bg-gradient-to-br from-[#1a1f3a] to-[#0A0F1F] border-[#586BFF]/50 p-8 w-64 h-80 flex flex-col items-center justify-center">
              {/* POS Screen */}
              <div className="w-full h-40 bg-[#0A0F1F] rounded-lg border-2 border-[#586BFF]/30 mb-4 flex items-center justify-center">
                <Hand className="w-16 h-16 text-[#586BFF] animate-pulse" />
              </div>
              {/* POS Base */}
              <div className="text-center">
                <p className="text-[#64E8FF] text-sm font-semibold mb-1">PalmPe Device</p>
                <p className="text-xs text-gray-400">Touch-free Payment</p>
              </div>
            </Card>
          </div>

          <h1 className="text-3xl font-bold mb-4 text-center">Phone-less Payments</h1>
          <p className="text-gray-300 text-center mb-8 max-w-md">
            Pay at any PalmPe device without your phone. Just show your palm and go.
          </p>

          {/* How it Works */}
          <Card className="bg-[#1a1f3a]/80 border-[#586BFF]/30 p-6 mb-8 max-w-md">
            <h3 className="font-semibold text-white mb-4">How it works:</h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">1</div>
                <div>
                  <p className="font-semibold text-white mb-1">Walk to PalmPe Device</p>
                  <p className="text-sm text-gray-400">Find devices at retail stores, cafes, and more</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">2</div>
                <div>
                  <p className="font-semibold text-white mb-1">Show Your Palm</p>
                  <p className="text-sm text-gray-400">Hold your hand over the scanner for IR authentication</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">3</div>
                <div>
                  <p className="font-semibold text-white mb-1">Payment Auto-fires</p>
                  <p className="text-sm text-gray-400">Blockchain-logged consent completes transaction instantly</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Features */}
          <div className="w-full max-w-md space-y-3 mb-8">
            <Card className="bg-[#586BFF]/10 border-[#586BFF]/30 p-4 flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-[#64E8FF]" />
              <p className="text-sm text-gray-300"><span className="font-semibold text-white">No Phone Required:</span> Leave it in your pocket</p>
            </Card>
            <Card className="bg-[#9B62FF]/10 border-[#9B62FF]/30 p-4 flex items-center gap-3">
              <Shield className="w-5 h-5 text-[#9B62FF]" />
              <p className="text-sm text-gray-300"><span className="font-semibold text-white">No OTP/PIN:</span> Biometric authentication only</p>
            </Card>
            <Card className="bg-[#64E8FF]/10 border-[#64E8FF]/30 p-4 flex items-center gap-3">
              <Zap className="w-5 h-5 text-[#64E8FF]" />
              <p className="text-sm text-gray-300"><span className="font-semibold text-white">Instant Payment:</span> Under 2 seconds</p>
            </Card>
          </div>

          {/* Find Devices */}
          <Button 
            className="w-full max-w-md bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb] h-14 text-lg font-semibold mb-3"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Find Nearby PalmPe Devices
          </Button>

          <Button 
            onClick={() => navigate('/home')}
            variant="outline"
            className="w-full max-w-md border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/10 h-12"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default POSMode;