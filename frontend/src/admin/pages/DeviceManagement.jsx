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
  AlertCircle,
  Filter
} from 'lucide-react';
import { mockDevices } from '../mockData';
import AdminLayout from '../AdminLayout';

const DeviceManagement = () => {
  const [devices] = useState(mockDevices);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newDevice, setNewDevice] = useState({
    deviceId: '',
    serialNumber: '',
    location: ''
  });

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.merchantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddDevice = () => {
    if (!newDevice.deviceId || !newDevice.serialNumber) {
      alert('Please fill all required fields');
      return;
    }
    alert(`✅ Device ${newDevice.deviceId} registered successfully!`);
    setShowAddModal(false);
    setNewDevice({ deviceId: '', serialNumber: '', location: '' });
  };

  const stats = {
    total: devices.length,
    online: devices.filter(d => d.status === 'online').length,
    offline: devices.filter(d => d.status === 'offline').length,
    unassigned: devices.filter(d => d.merchantId === null).length
  };

  return (
    <AdminLayout>
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Device Management</h2>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">{filteredDevices.length} devices</p>
          </div>
          <Button 
            onClick={() => setShowAddModal(true)}
            className="bg-[#586BFF] flex items-center gap-2 text-xs lg:text-sm h-9"
          >
            <Plus className="w-4 h-4" />
            Register Device
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Smartphone className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Wifi className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-gray-800">{stats.online}</p>
                <p className="text-xs text-gray-600">Online</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                <WifiOff className="w-5 h-5 lg:w-6 lg:h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-gray-800">{stats.offline}</p>
                <p className="text-xs text-gray-600">Offline</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Activity className="w-5 h-5 lg:w-6 lg:h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-xl lg:text-2xl font-bold text-gray-800">{stats.unassigned}</p>
                <p className="text-xs text-gray-600">Unassigned</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by device ID, merchant or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline"
                className="px-3"
              >
                <Filter className="w-4 h-4" />
              </Button>
            </div>

            {showFilters && (
              <div className="pt-3 border-t">
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#586BFF]"
                >
                  <option value="all">All Status</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            )}
          </div>
        </Card>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredDevices.map((device) => (
            <Card key={device.id} className="p-4 lg:p-6 hover:shadow-lg transition-all">
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
                  <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0" />
                  <span className="text-gray-600">{device.location}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-500">Merchant: </span>
                  <span className="font-semibold text-gray-700">{device.merchantName}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>FW: {device.firmwareVersion}</span>
                  {device.lastPing && <span>Last: {device.lastPing.split(' ')[1]}</span>}
                </div>
              </div>

              {device.status !== 'inactive' && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <p className="text-xs text-gray-500">Today Txns</p>
                    <p className="text-lg font-bold text-gray-800">{device.transactionsToday}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-lg font-bold text-gray-800">₹{(device.revenueToday / 1000).toFixed(1)}K</p>
                  </div>
                </div>
              )}

              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1 text-xs h-8"
                  onClick={() => alert(`View ${device.deviceId} details`)}
                >
                  View Details
                </Button>
                {device.merchantId === null && (
                  <Button 
                    className="flex-1 bg-[#586BFF] text-xs h-8"
                    onClick={() => alert('Assign to merchant')}
                  >
                    Assign
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
                  <p className="text-xs text-gray-600">Add a PalmPOS device</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Device ID *</label>
                  <Input
                    placeholder="PALMPOS-XXX"
                    value={newDevice.deviceId}
                    onChange={(e) => setNewDevice({ ...newDevice, deviceId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 block">Serial Number *</label>
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
