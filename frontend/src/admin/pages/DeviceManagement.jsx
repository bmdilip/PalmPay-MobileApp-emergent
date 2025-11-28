import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Smartphone, 
  Search, 
  Plus,
  Wifi,
  WifiOff,
  Activity,
  MapPin,
  AlertCircle
} from 'lucide-react';
import { mockDevices } from '../mockData';
import AdminLayout from '../AdminLayout';

const DeviceManagement = () => {
  const [devices] = useState(mockDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    deviceId: '',
    serialNumber: '',
    location: ''
  });

  const filteredDevices = devices.filter(device => 
    device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    device.merchantName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddDevice = () => {
    alert(`Device ${newDevice.deviceId} registered successfully!`);
    setShowAddModal(false);
    setNewDevice({ deviceId: '', serialNumber: '', location: '' });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Device Management</h2>
            <p className="text-sm text-gray-600 mt-1">Manage PalmPOS devices</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#586BFF] flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Register Device
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Smartphone className="w-8 h-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-gray-800">{devices.length}</p>
                <p className="text-xs text-gray-600">Total Devices</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Wifi className="w-8 h-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {devices.filter(d => d.status === 'online').length}
                </p>
                <p className="text-xs text-gray-600">Online</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <WifiOff className="w-8 h-8 text-amber-600" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {devices.filter(d => d.status === 'offline').length}
                </p>
                <p className="text-xs text-gray-600">Offline</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="w-8 h-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {devices.filter(d => d.merchantId === null).length}
                </p>
                <p className="text-xs text-gray-600">Unassigned</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search devices by ID or merchant..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="p-6 hover:shadow-lg transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    device.status === 'online' 
                      ? 'bg-green-100' 
                      : device.status === 'offline' 
                      ? 'bg-amber-100' 
                      : 'bg-gray-100'
                  }`}>
                    <Smartphone className={`w-6 h-6 ${
                      device.status === 'online' 
                        ? 'text-green-600' 
                        : device.status === 'offline' 
                        ? 'text-amber-600' 
                        : 'text-gray-600'
                    }`} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{device.deviceId}</p>
                    <p className="text-xs text-gray-500">SN: {device.serialNumber}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  device.status === 'online' 
                    ? 'bg-green-100 text-green-800' 
                    : device.status === 'offline' 
                    ? 'bg-amber-100 text-amber-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {device.status}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">{device.location}</span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Merchant:</strong> {device.merchantName}
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Firmware: {device.firmwareVersion}</span>
                  {device.lastPing && <span>Last ping: {device.lastPing}</span>}
                </div>
              </div>

              {device.status !== 'inactive' && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500">Transactions Today</p>
                    <p className="text-lg font-bold text-gray-800">{device.transactionsToday}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue Today</p>
                    <p className="text-lg font-bold text-gray-800">₹{device.revenueToday.toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="flex-1 text-xs h-8">
                  View Details
                </Button>
                {device.merchantId === null && (
                  <Button className="flex-1 bg-[#586BFF] text-xs h-8">
                    Assign to Merchant
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Add Device Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
            <Card className="max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Register New Device</h3>
                  <p className="text-xs text-gray-600">Add a new PalmPOS device</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Device ID</label>
                  <Input
                    placeholder="PALMPOS-XXX"
                    value={newDevice.deviceId}
                    onChange={(e) => setNewDevice({ ...newDevice, deviceId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Serial Number</label>
                  <Input
                    placeholder="PP-2025-XXX"
                    value={newDevice.serialNumber}
                    onChange={(e) => setNewDevice({ ...newDevice, serialNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Location</label>
                  <Input
                    placeholder="City, State"
                    value={newDevice.location}
                    onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
                  />
                </div>
              </div>

              <Card className="p-3 bg-blue-50 border-blue-200">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-700">
                    Device will be registered in inactive state. Assign to a merchant to activate.
                  </p>
                </div>
              </Card>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowAddModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddDevice}
                  disabled={!newDevice.deviceId || !newDevice.serialNumber}
                  className="flex-1 bg-[#586BFF]"
                >
                  Register Device
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default DeviceManagement;
