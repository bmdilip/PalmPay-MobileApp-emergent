import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { ArrowLeft, MapPin, Navigation, Search, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { mockDevices } from '../mockDataPalmPay';
import Logo from '../components/Logo';

const DeviceLocator = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDevice, setSelectedDevice] = useState(null);

  const filteredDevices = mockDevices.filter(device =>
    device.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    device.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'text-green-500 bg-green-500/10';
      case 'maintenance': return 'text-orange-500 bg-orange-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return CheckCircle2;
      case 'maintenance': return AlertCircle;
      default: return Clock;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white">
      {/* Header */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate('/home')} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-semibold">Find PalmPe Devices</h1>
            <p className="text-sm text-white/60 mt-1">Locate nearby registration terminals</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
          <Input
            type="text"
            placeholder="Search by location or area"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 h-12"
          />
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-5 py-4 space-y-3">
        <Card className="bg-[#586BFF]/10 border-[#586BFF]/30 p-4">
          <p className="text-sm text-white/80">
            <span className="font-semibold text-[#64E8FF]">Important:</span> Palm registration must be completed at a PalmPe terminal. 
            Walk-in or book a slot at any active device below.
          </p>
        </Card>

        {/* PalmPe Enroll CTA */}
        <Button 
          onClick={() => navigate('/palm-enrollment')}
          className="w-full h-14 bg-gradient-to-r from-[#64E8FF] to-[#586BFF] hover:from-[#50d4f0] hover:to-[#4a5ceb] text-white font-semibold text-base shadow-lg shadow-[#586BFF]/30 transition-all"
        >
          🖐️ Start PalmPe Enrollment
        </Button>
      </div>

      {/* Device List */}
      <div className="px-5 pb-6 space-y-3">
        {filteredDevices.map((device) => {
          const StatusIcon = getStatusIcon(device.status);
          return (
            <Card 
              key={device.id}
              onClick={() => setSelectedDevice(device)}
              className={`bg-white/3 backdrop-blur-lg border-white/10 p-4 cursor-pointer transition-all hover:border-[#586BFF]/50 ${
                selectedDevice?.id === device.id ? 'border-[#586BFF] bg-[#586BFF]/10' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#586BFF]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-[#586BFF]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-white">{device.name}</h3>
                      <p className="text-sm text-white/60 mt-1">{device.address}</p>
                    </div>
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                      <StatusIcon className="w-3 h-3" />
                      <span className="capitalize">{device.status}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/60">
                    <span className="flex items-center gap-1">
                      <Navigation className="w-3 h-3" />
                      {device.distance}
                    </span>
                    <span>{device.availability}</span>
                  </div>
                </div>
              </div>

              {selectedDevice?.id === device.id && device.status === 'active' && (
                <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                  <Button 
                    onClick={() => navigate('/device-enrollment', { state: { device } })}
                    className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb]"
                  >
                    Get Directions
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full border-[#586BFF] text-[#586BFF] hover:bg-[#586BFF]/10"
                  >
                    Book Appointment
                  </Button>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {filteredDevices.length === 0 && (
        <div className="px-5 py-12 text-center">
          <MapPin className="w-16 h-16 text-white/20 mx-auto mb-4" />
          <p className="text-white/60">No devices found in this area</p>
        </div>
      )}
    </div>
  );
};

export default DeviceLocator;