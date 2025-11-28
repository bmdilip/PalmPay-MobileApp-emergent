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
  Hand
} from 'lucide-react';
import { mockAdminUsers } from '../mockData';
import AdminLayout from '../AdminLayout';

const UserManagement = () => {
  const [users] = useState(mockAdminUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPalmModal, setShowPalmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [palmHand, setPalmHand] = useState('');

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegisterPalm = (user, hand) => {
    setSelectedUser(user);
    setPalmHand(hand);
    setShowPalmModal(true);
  };

  const processPalmRegistration = () => {
    alert(`Palm ${palmHand} registration initiated for ${selectedUser.name}\n\nNote: This is a mock registration. In production, this would connect to the PalmPOS device.`);
    setShowPalmModal(false);
  };

  const handleResetPassword = (user) => {
    if (window.confirm(`Reset password for ${user.name}?\n\nA password reset link will be sent to ${user.email}`)) {
      alert(`Password reset email sent to ${user.email}`);
    }
  };

  const downloadCSV = () => {
    alert('Downloading user data as CSV...');
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">User Management</h2>
            <p className="text-sm text-gray-600 mt-1">Manage all PalmPay users</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={downloadCSV} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download CSV
            </Button>
            <Button className="bg-[#586BFF] flex items-center gap-2">
              Add User
            </Button>
          </div>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filters
            </Button>
          </div>
        </Card>

        {/* Users Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Left Palm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Right Palm</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                        <p className="text-xs text-gray-400">{user.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-sm font-semibold text-gray-800">₹{user.balance.toLocaleString()}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                        <span className={`block text-xs ${
                          user.kycStatus === 'verified' ? 'text-green-600' : 'text-amber-600'
                        }`}>
                          KYC: {user.kycStatus}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.palmLeft ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-medium">Registered</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleRegisterPalm(user, 'Left')}
                          className="bg-blue-500 hover:bg-blue-600 h-7 text-xs px-3"
                        >
                          <Hand className="w-3 h-3 mr-1" />
                          Register
                        </Button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.palmRight ? (
                        <div className="flex items-center gap-1 text-green-600">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-medium">Registered</span>
                        </div>
                      ) : (
                        <Button
                          onClick={() => handleRegisterPalm(user, 'Right')}
                          className="bg-blue-500 hover:bg-blue-600 h-7 text-xs px-3"
                        >
                          <Hand className="w-3 h-3 mr-1" />
                          Register
                        </Button>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.created}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => handleResetPassword(user)}
                          variant="outline"
                          className="h-8 text-xs px-3"
                        >
                          Reset Password
                        </Button>
                        <button className="p-1 hover:bg-gray-100 rounded transition-colors">
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
                      This action requires a PalmPOS device to scan and register the user's palm biometric data.
                    </p>
                  </div>
                </div>
              </Card>

              <div className="space-y-2">
                <p className="text-sm text-gray-700">
                  <strong>Steps:</strong>
                </p>
                <ol className="text-xs text-gray-600 space-y-1 ml-4">
                  <li>1. Connect user to a PalmPOS device</li>
                  <li>2. Ask user to place {palmHand.toLowerCase()} hand on scanner</li>
                  <li>3. Device will capture palm biometric</li>
                  <li>4. System will register and encrypt data</li>
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
                  Initiate Registration
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