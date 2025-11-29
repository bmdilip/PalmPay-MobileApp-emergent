import React, { useState } from 'react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Search, 
  Filter, 
  Download,
  MoreVertical,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Hand,
  ChevronDown,
  ArrowUpDown,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';
import { mockAdminUsers } from '../mockData';
import AdminLayout from '../AdminLayout';

const UserManagement = () => {
  const [users, setUsers] = useState(mockAdminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [kycFilter, setKycFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [showPalmModal, setShowPalmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [palmHand, setPalmHand] = useState('');

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    const matchesKyc = kycFilter === 'all' || user.kycStatus === kycFilter;
    return matchesSearch && matchesStatus && matchesKyc;
  });

  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    
    if (sortBy === 'balance') {
      aVal = parseFloat(aVal);
      bVal = parseFloat(bVal);
    }
    
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    } else {
      return aVal < bVal ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const handleRegisterPalm = (user, hand) => {
    setSelectedUser(user);
    setPalmHand(hand);
    setShowPalmModal(true);
  };

  const processPalmRegistration = () => {
    alert(`✅ Palm ${palmHand} registration initiated for ${selectedUser.name}\n\nDevice will scan and register palm biometric.`);
    setShowPalmModal(false);
  };

  const handleResetPassword = (user) => {
    if (window.confirm(`Reset password for ${user.name}?\n\nPassword reset link will be sent to ${user.email}`)) {
      alert(`✅ Password reset email sent to ${user.email}`);
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setKycFilter('all');
  };

  return (
    <AdminLayout>
      <div className="space-y-4 lg:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">User Management</h2>
            <p className="text-xs lg:text-sm text-gray-600 mt-1">{sortedUsers.length} users found</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={() => alert('Download CSV feature')}
              variant="outline" 
              className="flex items-center gap-2 text-xs lg:text-sm h-9"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button className="bg-[#586BFF] flex items-center gap-2 text-xs lg:text-sm h-9">
              Add User
            </Button>
          </div>
        </div>

        {/* Search & Filters */}
        <Card className="p-4">
          <div className="space-y-3">
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search by name, email or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
              <Button 
                onClick={() => setShowFilters(!showFilters)}
                variant="outline" 
                className="flex items-center gap-2 px-3"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">Filters</span>
                {(statusFilter !== 'all' || kycFilter !== 'all') && (
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </Button>
            </div>

            {/* Filter Options */}
            {showFilters && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t">
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#586BFF]"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">KYC Status</label>
                  <select
                    value={kycFilter}
                    onChange={(e) => setKycFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#586BFF]"
                  >
                    <option value="all">All KYC</option>
                    <option value="verified">Verified</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <Button 
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full text-sm h-10"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Users Table - Desktop */}
        <Card className="overflow-hidden hidden lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase hover:text-gray-700"
                    >
                      User <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left">
                    <button 
                      onClick={() => handleSort('balance')}
                      className="flex items-center gap-1 text-xs font-medium text-gray-500 uppercase hover:text-gray-700"
                    >
                      Balance <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Left Palm</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Right Palm</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#586BFF] to-[#9B62FF] flex items-center justify-center text-white font-bold text-sm">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-400">{user.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm font-semibold text-gray-800">₹{user.balance.toLocaleString()}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                        <p className={`text-xs ${
                          user.kycStatus === 'verified' ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          KYC: {user.kycStatus}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {user.palmLeft ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-medium">Active</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleRegisterPalm(user, 'Left')}
                          className="bg-blue-500 hover:bg-blue-600 h-7 text-xs px-3"
                        >
                          Register
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {user.palmRight ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-medium">Active</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleRegisterPalm(user, 'Right')}
                          className="bg-blue-500 hover:bg-blue-600 h-7 text-xs px-3"
                        >
                          Register
                        </Button>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => alert(`View ${user.name} details`)}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button 
                          onClick={() => handleResetPassword(user)}
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="Reset Password"
                        >
                          <AlertCircle className="w-4 h-4 text-amber-600" />
                        </button>
                        <button 
                          className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                          title="More Actions"
                        >
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Users Cards - Mobile */}
        <div className="lg:hidden space-y-3">
          {sortedUsers.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#586BFF] to-[#9B62FF] flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">{user.phone}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-xs text-gray-500">Balance</p>
                  <p className="font-semibold text-gray-800">₹{user.balance.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">KYC Status</p>
                  <p className={`font-semibold ${
                    user.kycStatus === 'verified' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {user.kycStatus}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Left Palm</p>
                  {user.palmLeft ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-xs">Active</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleRegisterPalm(user, 'Left')}
                      className="bg-blue-500 w-full h-7 text-xs"
                    >
                      Register
                    </Button>
                  )}
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Right Palm</p>
                  {user.palmRight ? (
                    <div className="flex items-center gap-1 text-green-600">
                      <CheckCircle2 className="w-3 h-3" />
                      <span className="text-xs">Active</span>
                    </div>
                  ) : (
                    <Button
                      onClick={() => handleRegisterPalm(user, 'Right')}
                      className="bg-blue-500 w-full h-7 text-xs"
                    >
                      Register
                    </Button>
                  )}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Button 
                  onClick={() => alert(`View ${user.name} details`)}
                  variant="outline" 
                  className="flex-1 text-xs h-8"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
                <Button 
                  onClick={() => handleResetPassword(user)}
                  variant="outline"
                  className="flex-1 text-xs h-8"
                >
                  Reset Password
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Palm Registration Modal */}
        {showPalmModal && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-5 z-50">
            <Card className="max-w-md w-full p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <Hand className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">Register {palmHand} Palm</h3>
                  <p className="text-xs text-gray-600">{selectedUser.name}</p>
                </div>
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <div className="flex gap-2">
                  <AlertCircle className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold mb-1">Device Required</p>
                    <p className="text-xs">
                      Connect user to PalmPOS device to scan and register palm biometric.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <p className="text-sm font-semibold text-gray-700">Registration Steps:</p>
                <ol className="text-xs text-gray-600 space-y-1 ml-4 list-decimal">
                  <li>Connect user to PalmPOS device</li>
                  <li>Place {palmHand.toLowerCase()} hand on scanner</li>
                  <li>Device captures palm biometric</li>
                  <li>System registers and encrypts data</li>
                </ol>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowPalmModal(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={processPalmRegistration}
                  className="flex-1 bg-[#586BFF]"
                >
                  Start Registration
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default UserManagement;