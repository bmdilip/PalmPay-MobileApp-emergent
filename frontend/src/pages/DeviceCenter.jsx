import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  Smartphone,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  QrCode,
  Signal,
  Battery,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DeviceCenter = () => {
  const navigate = useNavigate();
  const [expandedDevice, setExpandedDevice] = useState(null);
  const [showPairModal, setShowPairModal] = useState(false);
  const [pairCode, setPairCode] = useState('');

  const mockDevices = [
    {
      id: 'device-001',
      name: 'PalmPe Terminal - MG Road',
      type: 'registration',
      status: 'active',
      lastSeen: '2 hours ago',
      signal: 'strong',
      firmware: 'v2.3.1',
      location: 'MG Road Metro Station, Bangalore',
      pairedDate: '15 Jan 2025',
      merchantName: 'Not assigned',
      batteryLevel: 85
    },
    {
      id: 'device-002',
      name: 'PalmPe POS - Cafe Coffee Day',
      type: 'merchant',
      status: 'active',
      lastSeen: '5 minutes ago',
      signal: 'excellent',
      firmware: 'v2.3.1',
      location: 'Cafe Coffee Day, Koramangala',
      pairedDate: '20 Jan 2025',
      merchantName: 'Cafe Coffee Day',
      batteryLevel: 92
    },
  ];

  const handleRemoveDevice = (deviceId) => {
    if (window.confirm('Are you sure you want to remove this device? You will need to pair it again to use it.')) {
      // Mock API call
      console.log('Removing device:', deviceId);
    }
  };

  const handlePairDevice = () => {
    if (pairCode.length !== 6) {
      alert('Please enter a valid 6-character pairing code');
      return;
    }
    // Mock API call
    console.log('Pairing device with code:', pairCode);
    setShowPairModal(false);
    setPairCode('');
  };

  const getSignalIcon = (signal) => {
    const bars = signal === 'excellent' ? 4 : signal === 'strong' ? 3 : signal === 'medium' ? 2 : 1;
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-sm ${
              i < bars ? 'bg-green-500' : 'bg-gray-300'
            }`}
            style={{ height: `${(i + 1) * 3 + 3}px` }}
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Device Center</h1>
              <p className="text-xs text-white/80">Manage your PalmPe devices</p>
            </div>
          </div>

          {/* Add Device Card */}
          <Card 
            className="bg-gradient-to-r from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border border-white/20 p-4 cursor-pointer hover:from-[#586BFF]/30 hover:to-[#9B62FF]/30 transition-all"
            onClick={() => setShowPairModal(true)}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-white">Pair New Device</p>
                <p className="text-xs text-white/70">Add a PalmPe device to your account</p>
              </div>
              <ChevronDown className="w-5 h-5 text-white/50" />
            </div>
          </Card>
        </div>
      </div>

      {/* Device List */}
      <div className="px-5 mt-6 space-y-4">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Paired Devices ({mockDevices.length})</h3>

        {mockDevices.map((device) => {
          const isExpanded = expandedDevice === device.id;
          
          return (
            <Card key={device.id} className="overflow-hidden">
              {/* Device Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedDevice(isExpanded ? null : device.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    device.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                  }`}>
                    <Smartphone className={`w-6 h-6 ${
                      device.status === 'active' ? 'text-green-600' : 'text-gray-400'
                    }`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-800">{device.name}</p>
                      {device.status === 'active' && (
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{device.location}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center gap-1">
                        {getSignalIcon(device.signal)}
                        <span className="text-xs text-gray-500 ml-1 capitalize">{device.signal}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Battery className="w-4 h-4 text-gray-400" />
                        <span className="text-xs text-gray-500">{device.batteryLevel}%</span>
                      </div>
                      <span className="text-xs text-gray-400">• Last seen {device.lastSeen}</span>
                    </div>
                  </div>
                  
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </div>
              </div>

              {/* Device Details (Expanded) */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t bg-gray-50">
                  <div className="pt-4 space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Device ID</span>
                      <span className="font-medium font-mono text-gray-800">{device.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type</span>
                      <span className="font-medium text-gray-800 capitalize">{device.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Firmware</span>
                      <span className="font-medium text-gray-800">{device.firmware}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Paired Date</span>
                      <span className="font-medium text-gray-800">{device.pairedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Merchant</span>
                      <span className="font-medium text-gray-800">{device.merchantName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Status</span>
                      <span className={`font-medium px-2 py-1 rounded-full text-xs ${
                        device.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {device.status.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <Button 
                      onClick={() => handleRemoveDevice(device.id)}
                      variant="outline" 
                      className="w-full border-red-500 text-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Remove Device
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Info Banner */}
      <div className="px-5 mt-6">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-700">
              <p className="font-medium mb-1">About Device Pairing</p>
              <p className="text-xs text-gray-600">
                You can pair multiple PalmPe devices to your account. Each device must be activated by scanning a QR code or entering a 6-digit pairing code provided by the device.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Pair Device Modal */}
      {showPairModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-5">
          <Card className="w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Pair New Device</h3>
              <button 
                onClick={() => setShowPairModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600">Scan QR code on device</p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="bg-white px-2 text-gray-500">OR</span>
                </div>
              </div>

              <div>
                <Label htmlFor="pairCode">Enter 6-Digit Pairing Code</Label>
                <Input
                  id="pairCode"
                  type="text"
                  maxLength={6}
                  placeholder="ABC123"
                  value={pairCode}
                  onChange={(e) => setPairCode(e.target.value.toUpperCase())}
                  className="mt-2 text-center text-lg font-mono tracking-widest"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Find this code on your PalmPe device screen
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowPairModal(false)}
                  variant="outline" 
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handlePairDevice}
                  className="flex-1 bg-[#586BFF]"
                >
                  Pair Device
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default DeviceCenter;
