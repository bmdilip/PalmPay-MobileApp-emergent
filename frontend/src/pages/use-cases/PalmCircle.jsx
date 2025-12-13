import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, ArrowLeft, Shield, TrendingDown, Lock, Check, IndianRupee, AlertTriangle, Search } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import HoverCard3D from '../../components/premium/HoverCard3D';
import { LoadingSpinner } from '../../components/StateComponents';

const PalmCircle = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list');
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [familyData, setFamilyData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLimitForm, setShowLimitForm] = useState(null);
  const [emergencyLocked, setEmergencyLocked] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMember, setNewMember] = useState({
    name: '',
    relationship: '',
    age: ''
  });

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/use-cases/palm-circle/members`);
      const data = await response.json();
      setFamilyData(data);
      setMembers(data.members || []);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.relationship || !newMember.age) return;
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/use-cases/palm-circle/add-member`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newMember.name,
          relationship: newMember.relationship,
          age: parseInt(newMember.age),
          palm_id: 'PALM' + Date.now()
        })
      });
      setNewMember({ name: '', relationship: '', age: '' });
      setShowAddForm(false);
      fetchMembers();
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEmergencyLock = async () => {
    setLoading(true);
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/use-cases/palm-circle/emergency-lock`, {
        method: 'POST'
      });
      setEmergencyLocked(true);
      setTimeout(() => setEmergencyLocked(false), 3000);
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const relationshipEmojis = {
    spouse: '💑',
    child: '👶',
    parent: '👴',
    sibling: '👫',
    other: '👤'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white">
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Palm Circle</h1>
              <p className="text-sm text-pink-100">Family wallet & spending control</p>
            </div>
          </div>
          <button onClick={() => setShowAddForm(true)} className="p-2 bg-white/20 hover:bg-white/30 rounded-full">
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {familyData && (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <p className="text-xs text-pink-100">Members</p>
              <p className="text-2xl font-bold">{familyData.total_members}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <p className="text-xs text-pink-100">Wallet</p>
              <p className="text-2xl font-bold">₹{familyData.shared_wallet_balance?.toLocaleString()}</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <p className="text-xs text-pink-100">Daily Limit</p>
              <p className="text-2xl font-bold">₹{familyData.total_daily_limit?.toLocaleString()}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search family members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:border-pink-400 focus:ring-2 focus:ring-pink-100"
            />
          </div>
        </div>

        {/* Emergency Lock Button */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Button onClick={handleEmergencyLock} disabled={loading || emergencyLocked} className="w-full mb-4 bg-red-600 hover:bg-red-700 h-12 flex items-center justify-center gap-2">
            <Lock className="w-5 h-5" />
            {emergencyLocked ? 'All Transactions Locked!' : 'Emergency Lock All'}
          </Button>
        </motion.div>

        {/* Members List */}
        {members.length === 0 ? (
          <Card className="p-8 text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 mb-2">No Family Members</h3>
            <p className="text-sm text-gray-500 mb-4">Add family members to share your wallet and set spending limits</p>
            <Button onClick={() => setShowAddForm(true)} className="bg-pink-600 hover:bg-pink-700">
              Add First Member
            </Button>
          </Card>
        ) : (
          <div className="space-y-3">
            {members.filter(member =>
              member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              member.relationship.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((member, idx) => (
              <motion.div key={member.member_id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                <HoverCard3D>
                  <Card className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl">
                          {relationshipEmojis[member.relationship] || '👤'}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{member.name}</h3>
                          <p className="text-xs text-gray-500 capitalize">{member.relationship} • {member.age} years</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        member.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {member.status}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="bg-pink-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Daily Limit</p>
                        <p className="font-bold text-pink-600">₹{member.daily_limit}</p>
                      </div>
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-xs text-gray-500">Categories</p>
                        <p className="font-bold text-purple-600">{member.allowed_categories?.length || 0} allowed</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={() => setShowLimitForm(member)} variant="outline" size="sm" className="flex-1">
                        Edit Limits
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        Activity
                      </Button>
                    </div>
                  </Card>
                </HoverCard3D>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5" onClick={() => setShowAddForm(false)}>
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl p-6 max-w-md w-full">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Add Family Member</h2>
              <div className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input value={newMember.name} onChange={(e) => setNewMember({...newMember, name: e.target.value})} placeholder="Enter name" className="mt-1" />
                </div>
                <div>
                  <Label>Relationship</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    {['spouse', 'child', 'parent', 'sibling', 'other'].map(rel => (
                      <button key={rel} onClick={() => setNewMember({...newMember, relationship: rel})} className={`py-2 rounded-lg text-sm capitalize ${newMember.relationship === rel ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700'}`}>
                        {rel}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <Label>Age</Label>
                  <Input type="number" value={newMember.age} onChange={(e) => setNewMember({...newMember, age: e.target.value})} placeholder="Enter age" className="mt-1" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">Cancel</Button>
                <Button onClick={handleAddMember} disabled={loading || !newMember.name || !newMember.relationship || !newMember.age} className="flex-1 bg-pink-600 hover:bg-pink-700">
                  {loading ? 'Adding...' : 'Add Member'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PalmCircle;