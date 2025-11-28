import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { 
  ArrowLeft, 
  Shield,
  AlertCircle,
  CheckCircle2,
  Lock,
  Smartphone,
  Info
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../mockDataPalmPay';

const LimitSettings = () => {
  const navigate = useNavigate();
  const [limits, setLimits] = useState({
    perTransaction: '50000',
    daily: '100000',
    offline: '5000',
    quickWallet: '2000',
    palmPerTransaction: '200',
    palmDaily: '1000'
  });
  
  const [emergencyLock, setEmergencyLock] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showIncreaseWarning, setShowIncreaseWarning] = useState(false);

  const handleSave = () => {
    // Check if palm limits are being increased
    const currentPalmLimit = 200; // Mock current limit
    if (parseInt(limits.palmPerTransaction) > currentPalmLimit) {
      setShowIncreaseWarning(true);
      return;
    }
    
    // Mock API call
    console.log('Saving limits:', limits);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePalmLimitIncrease = () => {
    alert('To increase Palm Payment Limit, please authenticate on a PalmPe device for security.\n\nRedirecting to Device Center...');
    setShowIncreaseWarning(false);
    navigate('/device-center');
  };

  const handleEmergencyLock = (enabled) => {
    if (enabled) {
      if (window.confirm('⚠️ This will BLOCK ALL payments until you authenticate on a PalmPe device. Continue?')) {
        setEmergencyLock(true);
      }
    } else {
      setEmergencyLock(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Limit Settings</h1>
              <p className="text-xs text-white/80">Set spending limits for fraud protection</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Emergency Lock */}
        <Card className={`p-5 ${emergencyLock ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              emergencyLock ? 'bg-red-100' : 'bg-amber-100'
            }`}>
              <Lock className={`w-6 h-6 ${emergencyLock ? 'text-red-600' : 'text-amber-600'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800">Emergency Lock</h3>
                <Switch
                  checked={emergencyLock}
                  onCheckedChange={handleEmergencyLock}
                />
              </div>
              <p className="text-sm text-gray-600">
                {emergencyLock 
                  ? '🔒 All payments blocked. Authenticate on PalmPe device to unlock.'
                  : 'Instantly block ALL payments in case of phone loss or theft.'}
              </p>
            </div>
          </div>
        </Card>

        {/* Palm Payment Limits - NEW */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-[#9B62FF]" />
            Palm Payment Limits
          </h3>
          <p className="text-xs text-gray-600 mb-4 flex items-start gap-2">
            <Info className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
            <span>Limits for payments made using PalmPe devices (phone-less payments). Set lower limits to protect against device misuse.</span>
          </p>

          <Card className="divide-y border-purple-200 bg-purple-50/30">
            <div className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="palmPerTransaction">Per Device Payment Limit</Label>
                {mockUser.palmEnabled ? (
                  <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Palm Enabled
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">Device not paired</span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">₹</span>
                <Input
                  id="palmPerTransaction"
                  type="number"
                  value={limits.palmPerTransaction}
                  onChange={(e) => setLimits({ ...limits, palmPerTransaction: e.target.value })}
                  max="5000"
                  className="flex-1"
                  disabled={!mockUser.palmEnabled}
                />
              </div>
              <p className="text-xs text-gray-500">
                Recommended: ₹200 | Max: ₹5,000 per device payment
              </p>
              <div className="mt-3 p-3 bg-white rounded-lg border border-purple-200">
                <p className="text-xs text-gray-700">
                  <strong>What is this?</strong> This limits payments made without your phone using only the PalmPe device. Lower limits provide better protection if a device is lost or used without your consent.
                </p>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <Label htmlFor="palmDaily">Daily Palm Payment Limit</Label>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">₹</span>
                <Input
                  id="palmDaily"
                  type="number"
                  value={limits.palmDaily}
                  onChange={(e) => setLimits({ ...limits, palmDaily: e.target.value })}
                  max="20000"
                  className="flex-1"
                  disabled={!mockUser.palmEnabled}
                />
              </div>
              <p className="text-xs text-gray-500">
                Cumulative daily cap for all device payments | Max: ₹20,000
              </p>
            </div>
          </Card>
        </div>

        {/* Transaction Limits */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#586BFF]" />
            General Transaction Limits
          </h3>

          <Card className="divide-y">
            <div className="p-5 space-y-3">
              <Label htmlFor="perTransaction">Per Transaction Limit</Label>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">₹</span>
                <Input
                  id="perTransaction"
                  type="number"
                  value={limits.perTransaction}
                  onChange={(e) => setLimits({ ...limits, perTransaction: e.target.value })}
                  max="50000"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">Max: ₹50,000 per transaction (UPI/wallet)</p>
            </div>

            <div className="p-5 space-y-3">
              <Label htmlFor="daily">Daily Limit</Label>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">₹</span>
                <Input
                  id="daily"
                  type="number"
                  value={limits.daily}
                  onChange={(e) => setLimits({ ...limits, daily: e.target.value })}
                  max="200000"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">Max: ₹2,00,000 per day</p>
            </div>

            <div className="p-5 space-y-3">
              <Label htmlFor="offline">Offline Transaction Limit</Label>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">₹</span>
                <Input
                  id="offline"
                  type="number"
                  value={limits.offline}
                  onChange={(e) => setLimits({ ...limits, offline: e.target.value })}
                  max="10000"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">Max: ₹10,000 for offline payments</p>
            </div>

            <div className="p-5 space-y-3">
              <Label htmlFor="quickWallet">Quick Wallet Auto-Topup Limit</Label>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">₹</span>
                <Input
                  id="quickWallet"
                  type="number"
                  value={limits.quickWallet}
                  onChange={(e) => setLimits({ ...limits, quickWallet: e.target.value })}
                  max="5000"
                  className="flex-1"
                />
              </div>
              <p className="text-xs text-gray-500">Max: ₹5,000 for quick wallet</p>
            </div>
          </Card>
        </div>

        {/* Info */}
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">About Spending Limits</p>
              <p className="text-xs text-gray-600">
                These limits protect you from unauthorized transactions. If a transaction exceeds your limit, it will be automatically blocked.
              </p>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button 
          onClick={handleSave}
          disabled={emergencyLock}
          className="w-full bg-[#586BFF] h-12 font-semibold"
        >
          {saved ? (
            <>
              <CheckCircle2 className="w-5 h-5 mr-2" />
              Saved Successfully
            </>
          ) : (
            'Save Limits'
          )}
        </Button>
      </div>

      {/* Palm Limit Increase Warning Modal */}
      {showIncreaseWarning && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
          <Card className="max-w-md w-full p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
                <Shield className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-800">Device Authentication Required</h3>
                <p className="text-xs text-gray-600">Security verification needed</p>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                To increase your Palm Payment Limit above ₹200, you must authenticate on a PalmPe device for security.
              </p>
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-gray-700">
                  <strong>Why is this required?</strong> Higher limits mean more risk if a device is misused. We require device authentication to ensure it's really you making this change.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setShowIncreaseWarning(false)}
                variant="outline"
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handlePalmLimitIncrease}
                className="flex-1 bg-[#586BFF]"
              >
                Authenticate on Device
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LimitSettings;
