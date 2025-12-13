import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Plus, ArrowLeft, Shield, Lock, Check, IndianRupee, 
  Search, Settings, Eye, EyeOff, Bell, ChevronRight, X,
  UserPlus, QrCode, Phone, Clock, AlertTriangle, CheckCircle,
  Sliders, History, CreditCard, Smartphone, Wallet, Link2,
  Unlink, Fingerprint, AlertCircle, Info, Trash2
} from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import HoverCard3D from '../../components/premium/HoverCard3D';
import PalmNFCIcon from '../../components/icons/PalmNFCIcon';

const PalmCircle = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('members');
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(null);
  const [showPalmRegisterModal, setShowPalmRegisterModal] = useState(null);
  const [emergencyLocked, setEmergencyLocked] = useState(false);
  const [addMethod, setAddMethod] = useState(null);
  const [palmRegistrationStep, setPalmRegistrationStep] = useState('intro'); // intro, scanning, success
  const [selectedHand, setSelectedHand] = useState('right');
  
  // Form states
  const [newMemberPhone, setNewMemberPhone] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('');
  const [accessMode, setAccessMode] = useState('limited');
  const [dailyLimit, setDailyLimit] = useState('5000');
  const [perTxnLimit, setPerTxnLimit] = useState('2000');
  const [monthlyLimit, setMonthlyLimit] = useState('15000');
  const [allowedCategories, setAllowedCategories] = useState(['groceries', 'food', 'transport']);

  // Circle wallet info
  const circleWallet = {
    name: "Family Circle Wallet",
    balance: 25000,
    id: "PLM-CIRCLE-FAM-2024"
  };

  // Circle stats
  const circleStats = {
    totalMembers: 3,
    maxMembers: 5,
    monthlySpent: 12450,
    monthlyLimit: 50000,
    pendingApprovals: 2
  };

  // Mock members data with enhanced palm info
  const mockMembers = [
    {
      id: 'm1',
      name: 'Priya Sharma',
      phone: '+91 98765 43210',
      relation: 'spouse',
      palmId: 'PLM-PRIYA-2024-R',
      palmRegistered: true,
      palmHand: 'right',
      palmLinkedDate: 'Nov 15, 2024',
      accessMode: 'limited',
      dailyLimit: 5000,
      perTxnLimit: 2000,
      monthlyLimit: 15000,
      monthlySpent: 4500,
      todaySpent: 850,
      allowedCategories: ['groceries', 'food', 'transport', 'shopping'],
      status: 'active',
      lastActive: '2 mins ago',
      lastPalmUsed: '2 mins ago',
      joinedDate: 'Nov 15, 2024'
    },
    {
      id: 'm2',
      name: 'Aryan',
      phone: '+91 98765 43211',
      relation: 'child',
      palmId: 'PLM-ARYAN-2024-L',
      palmRegistered: true,
      palmHand: 'left',
      palmLinkedDate: 'Dec 1, 2024',
      accessMode: 'approval',
      dailyLimit: 1000,
      perTxnLimit: 500,
      monthlyLimit: 5000,
      monthlySpent: 2200,
      todaySpent: 150,
      allowedCategories: ['food', 'transport', 'education'],
      status: 'active',
      lastActive: '1 hour ago',
      lastPalmUsed: '3 hours ago',
      joinedDate: 'Dec 1, 2024'
    },
    {
      id: 'm3',
      name: 'Mom',
      phone: '+91 98765 43212',
      relation: 'parent',
      palmId: null,
      palmRegistered: false,
      palmHand: null,
      palmLinkedDate: null,
      accessMode: 'limited',
      dailyLimit: 10000,
      perTxnLimit: 5000,
      monthlyLimit: 30000,
      monthlySpent: 8500,
      todaySpent: 0,
      allowedCategories: ['groceries', 'medical', 'utilities'],
      status: 'active',
      lastActive: 'Yesterday',
      lastPalmUsed: null,
      joinedDate: 'Oct 20, 2024'
    }
  ];

  // Pending approval requests
  const mockRequests = [
    {
      id: 'r1',
      from: 'Aryan',
      amount: 450,
      merchant: 'Zomato',
      category: 'food',
      time: '5 mins ago',
      note: 'Lunch with friends',
      viaPalm: true
    },
    {
      id: 'r2',
      from: 'Aryan',
      amount: 200,
      merchant: 'Uber',
      category: 'transport',
      time: '2 hours ago',
      note: 'Ride to college',
      viaPalm: false
    }
  ];

  // Recent activity with palm indicators
  const recentActivity = [
    { id: 'a1', member: 'Priya Sharma', action: 'Paid', amount: 350, merchant: 'BigBasket', time: '10 mins ago', status: 'completed', viaPalm: true },
    { id: 'a2', member: 'Aryan', action: 'Requested', amount: 450, merchant: 'Zomato', time: '5 mins ago', status: 'pending', viaPalm: true },
    { id: 'a3', member: 'Mom', action: 'Paid', amount: 1200, merchant: 'Apollo Pharmacy', time: 'Yesterday', status: 'completed', viaPalm: false },
    { id: 'a4', member: 'Aryan', action: 'Paid', amount: 150, merchant: 'Metro', time: 'Yesterday', status: 'completed', viaPalm: true },
    { id: 'a5', member: 'Priya Sharma', action: 'Paid', amount: 2500, merchant: 'DMart', time: '2 days ago', status: 'completed', viaPalm: true }
  ];

  const allCategories = [
    { id: 'groceries', name: 'Groceries', icon: '🛒' },
    { id: 'food', name: 'Food & Dining', icon: '🍔' },
    { id: 'transport', name: 'Transport', icon: '🚗' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️' },
    { id: 'medical', name: 'Medical', icon: '💊' },
    { id: 'utilities', name: 'Utilities', icon: '💡' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬' }
  ];

  const relationEmojis = {
    spouse: '💑',
    child: '👶',
    parent: '👴',
    sibling: '👫',
    friend: '🤝',
    other: '👤'
  };

  useEffect(() => {
    setMembers(mockMembers);
    setPendingRequests(mockRequests);
  }, []);

  const handleApproveRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleRejectRequest = (requestId) => {
    setPendingRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const handleEmergencyLock = () => {
    setLoading(true);
    setTimeout(() => {
      setEmergencyLocked(true);
      setLoading(false);
      setTimeout(() => setEmergencyLocked(false), 5000);
    }, 1000);
  };

  const handlePalmRegistration = (member) => {
    setShowPalmRegisterModal(member);
    setPalmRegistrationStep('intro');
  };

  const startPalmScan = () => {
    setPalmRegistrationStep('scanning');
    // Simulate palm scanning process
    setTimeout(() => {
      setPalmRegistrationStep('success');
      // Update member palm status
      setMembers(prev => prev.map(m => 
        m.id === showPalmRegisterModal.id 
          ? { 
              ...m, 
              palmRegistered: true, 
              palmId: `PLM-${m.name.toUpperCase().replace(' ', '-').slice(0, 6)}-2024-${selectedHand === 'left' ? 'L' : 'R'}`,
              palmHand: selectedHand,
              palmLinkedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
            }
          : m
      ));
    }, 3000);
  };

  const unlinkPalm = (memberId) => {
    setMembers(prev => prev.map(m =>
      m.id === memberId
        ? { ...m, palmRegistered: false, palmId: null, palmHand: null, palmLinkedDate: null }
        : m
    ));
  };

  const handleAddMember = () => {
    if (!newMemberPhone || !newMemberName) return;
    setLoading(true);
    setTimeout(() => {
      const newMember = {
        id: `m${Date.now()}`,
        name: newMemberName,
        phone: newMemberPhone,
        relation: newMemberRelation || 'other',
        palmId: null,
        palmRegistered: false,
        palmHand: null,
        palmLinkedDate: null,
        accessMode,
        dailyLimit: parseInt(dailyLimit),
        perTxnLimit: parseInt(perTxnLimit),
        monthlyLimit: parseInt(monthlyLimit),
        monthlySpent: 0,
        todaySpent: 0,
        allowedCategories,
        status: 'pending',
        lastActive: 'Never',
        lastPalmUsed: null,
        joinedDate: new Date().toLocaleDateString()
      };
      setMembers(prev => [...prev, newMember]);
      setShowAddModal(false);
      resetForm();
      setLoading(false);
    }, 1500);
  };

  const resetForm = () => {
    setNewMemberPhone('');
    setNewMemberName('');
    setNewMemberRelation('');
    setAccessMode('limited');
    setDailyLimit('5000');
    setPerTxnLimit('2000');
    setMonthlyLimit('15000');
    setAllowedCategories(['groceries', 'food', 'transport']);
    setAddMethod(null);
  };

  const filteredMembers = members.filter(m =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.relation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white p-5 pb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/20 rounded-full">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <PalmNFCIcon className="w-6 h-6" style={{ filter: 'brightness(0) invert(1)' }} />
                Palm Circle
              </h1>
              <p className="text-sm text-pink-100">Family wallet • Phone-free payments</p>
            </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-full"
          >
            <UserPlus className="w-6 h-6" />
          </button>
        </div>

        {/* Circle Wallet Card */}
        <Card className="bg-white/15 backdrop-blur-sm border-white/30 p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-pink-100">Circle Wallet Balance</p>
                <p className="text-2xl font-bold">₹{circleWallet.balance.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-pink-100 mb-1">Wallet ID</p>
              <p className="text-xs font-mono bg-white/10 px-2 py-1 rounded">{circleWallet.id}</p>
            </div>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <p className="text-xs text-pink-100">Members</p>
            <p className="text-xl font-bold">{circleStats.totalMembers}/{circleStats.maxMembers}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <p className="text-xs text-pink-100">This Month</p>
            <p className="text-xl font-bold">₹{circleStats.monthlySpent.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl relative">
            <p className="text-xs text-pink-100">Pending</p>
            <p className="text-xl font-bold">{circleStats.pendingApprovals}</p>
            {circleStats.pendingApprovals > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mt-4 bg-white/10 rounded-xl p-1">
          {[
            { id: 'members', label: 'Members', icon: Users },
            { id: 'requests', label: 'Requests', icon: Bell, badge: pendingRequests.length },
            { id: 'activity', label: 'Activity', icon: History }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium relative ${
                activeTab === tab.id ? 'bg-white text-pink-600' : 'text-white/80'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.badge > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 pt-4">
        {/* Emergency Lock */}
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <Button 
            onClick={handleEmergencyLock} 
            disabled={loading || emergencyLocked}
            variant={emergencyLocked ? "default" : "destructive"}
            className={`w-full mb-4 h-12 flex items-center justify-center gap-2 ${
              emergencyLocked ? 'bg-green-600 hover:bg-green-600' : ''
            }`}
          >
            {emergencyLocked ? (
              <>
                <CheckCircle className="w-5 h-5" />
                All Payments Locked!
              </>
            ) : (
              <>
                <Lock className="w-5 h-5" />
                Emergency Lock All
              </>
            )}
          </Button>
        </motion.div>

        {/* MEMBERS TAB */}
        {activeTab === 'members' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* How it works */}
            <Card className="p-4 mb-4 bg-gradient-to-r from-pink-50 to-rose-50 border-pink-200">
              <div className="flex items-start gap-3">
                <PalmNFCIcon className="w-10 h-10 flex-shrink-0" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(330deg)' }} />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">How Palm Circle Works</h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Register family members' palms to this circle. When they pay using their palm at any PalmPe-enabled store, 
                    <span className="font-semibold text-pink-600"> money is deducted from the Circle Wallet</span> — no phone needed!
                  </p>
                </div>
              </div>
            </Card>

            {/* Members List */}
            <div className="space-y-3">
              {filteredMembers.map((member, idx) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <HoverCard3D>
                    <Card className="p-4">
                      {/* Member Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center text-2xl">
                              {relationEmojis[member.relation] || '👤'}
                            </div>
                            {/* Palm Status Indicator */}
                            <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                              member.palmRegistered ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {member.palmRegistered ? (
                                <PalmNFCIcon className="w-3.5 h-3.5" style={{ filter: 'brightness(0) invert(1)' }} />
                              ) : (
                                <Unlink className="w-3 h-3 text-gray-500" />
                              )}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-800">{member.name}</h3>
                            <p className="text-xs text-gray-500 capitalize">{member.relation}</p>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.accessMode === 'approval' 
                            ? 'bg-amber-100 text-amber-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {member.accessMode === 'approval' ? 'Needs Approval' : 'Auto Pay'}
                        </div>
                      </div>

                      {/* PALM STATUS CARD - Prominent Display */}
                      <div className={`p-3 rounded-xl mb-3 ${
                        member.palmRegistered 
                          ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
                          : 'bg-gradient-to-r from-gray-50 to-slate-50 border border-gray-200'
                      }`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {member.palmRegistered ? (
                              <>
                                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                                  <Link2 className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs font-bold text-green-700">Palm Linked</span>
                                    <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                                  </div>
                                  <p className="text-[10px] text-gray-500">
                                    {member.palmHand === 'left' ? '🤚 Left' : 'Right 🤚'} • {member.palmLinkedDate}
                                  </p>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <Unlink className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-gray-600">Palm Not Linked</span>
                                  <p className="text-[10px] text-gray-400">Register to enable phone-free payments</p>
                                </div>
                              </>
                            )}
                          </div>
                          {member.palmRegistered ? (
                            <button 
                              onClick={() => unlinkPalm(member.id)}
                              className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                            >
                              <Unlink className="w-3 h-3" />
                              Unlink
                            </button>
                          ) : (
                            <Button
                              onClick={() => handlePalmRegistration(member)}
                              size="sm"
                              className="bg-pink-600 hover:bg-pink-700 text-xs h-8"
                            >
                              <PalmNFCIcon className="w-3.5 h-3.5 mr-1" style={{ filter: 'brightness(0) invert(1)' }} />
                              Register Palm
                            </Button>
                          )}
                        </div>
                        
                        {/* Palm ID Display */}
                        {member.palmRegistered && (
                          <div className="mt-2 pt-2 border-t border-green-200">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[10px] text-gray-500">Palm ID (Linked to Circle)</p>
                                <p className="text-xs font-mono font-bold text-green-700">{member.palmId}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] text-gray-500">Last Used</p>
                                <p className="text-xs font-medium text-gray-700">{member.lastPalmUsed || 'Never'}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Spending Progress */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Today: ₹{member.todaySpent} / ₹{member.dailyLimit}</span>
                          <span className="text-gray-600">{Math.round((member.todaySpent / member.dailyLimit) * 100)}%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              (member.todaySpent / member.dailyLimit) > 0.8 ? 'bg-red-500' :
                              (member.todaySpent / member.dailyLimit) > 0.5 ? 'bg-amber-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((member.todaySpent / member.dailyLimit) * 100, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Limits Grid */}
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        <div className="bg-pink-50 p-2 rounded-lg text-center">
                          <p className="text-[10px] text-gray-500">Per Txn</p>
                          <p className="font-bold text-pink-600 text-sm">₹{member.perTxnLimit}</p>
                        </div>
                        <div className="bg-purple-50 p-2 rounded-lg text-center">
                          <p className="text-[10px] text-gray-500">Daily</p>
                          <p className="font-bold text-purple-600 text-sm">₹{member.dailyLimit}</p>
                        </div>
                        <div className="bg-blue-50 p-2 rounded-lg text-center">
                          <p className="text-[10px] text-gray-500">Monthly</p>
                          <p className="font-bold text-blue-600 text-sm">₹{member.monthlyLimit}</p>
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {member.allowedCategories.slice(0, 4).map(cat => {
                          const category = allCategories.find(c => c.id === cat);
                          return (
                            <span key={cat} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              {category?.icon} {category?.name}
                            </span>
                          );
                        })}
                        {member.allowedCategories.length > 4 && (
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            +{member.allowedCategories.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => setShowLimitModal(member)}
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                        >
                          <Sliders className="w-4 h-4 mr-1" />
                          Edit Limits
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <History className="w-4 h-4 mr-1" />
                          Activity
                        </Button>
                      </div>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>

            {/* Add Member CTA */}
            {members.length < 5 && (
              <Card 
                className="p-4 mt-4 border-dashed border-2 border-pink-300 bg-pink-50/50 cursor-pointer hover:bg-pink-50"
                onClick={() => setShowAddModal(true)}
              >
                <div className="flex items-center justify-center gap-2 text-pink-600">
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">Add Family Member</span>
                </div>
                <p className="text-xs text-gray-500 text-center mt-1">
                  {5 - members.length} slots remaining
                </p>
              </Card>
            )}
          </motion.div>
        )}

        {/* REQUESTS TAB */}
        {activeTab === 'requests' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {pendingRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h3 className="font-bold text-gray-800 mb-2">No Pending Requests</h3>
                <p className="text-sm text-gray-500">Payment requests from members will appear here</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {pendingRequests.map((request, idx) => (
                  <motion.div
                    key={request.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <Card className="p-4 border-l-4 border-amber-500">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-bold text-gray-800">{request.from} wants to pay</p>
                            {request.viaPalm && (
                              <span className="inline-flex items-center gap-1 text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                                <PalmNFCIcon className="w-3 h-3" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(3878%) hue-rotate(130deg)' }} />
                                Via Palm
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{request.merchant}</p>
                          <p className="text-xs text-gray-400">{request.time}</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-800">₹{request.amount}</p>
                      </div>
                      {request.note && (
                        <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded-lg mb-3">
                          &quot;{request.note}&quot;
                        </p>
                      )}
                      <div className="flex gap-2">
                        <Button 
                          onClick={() => handleRejectRequest(request.id)}
                          variant="outline" 
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                        >
                          Decline
                        </Button>
                        <Button 
                          onClick={() => handleApproveRequest(request.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ACTIVITY TAB */}
        {activeTab === 'activity' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Info Card */}
            <Card className="p-3 mb-4 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-2">
                <Info className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-blue-700">
                  <span className="font-semibold">Via Palm</span> = Payment made using registered palm at a PalmPe store
                </p>
              </div>
            </Card>

            <Card className="shadow-lg">
              <div className="divide-y">
                {recentActivity.map((activity, idx) => (
                  <div key={activity.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.status === 'completed' ? 'bg-green-100' : 'bg-amber-100'
                      }`}>
                        {activity.viaPalm ? (
                          <PalmNFCIcon className="w-5 h-5" style={{ 
                            filter: activity.status === 'completed' 
                              ? 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(3878%) hue-rotate(130deg)' 
                              : 'brightness(0) saturate(100%) invert(60%) sepia(51%) saturate(1878%) hue-rotate(20deg)'
                          }} />
                        ) : activity.status === 'completed' ? (
                          <Check className="w-5 h-5 text-green-600" />
                        ) : (
                          <Clock className="w-5 h-5 text-amber-600" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-gray-800">{activity.member}</p>
                          {activity.viaPalm && (
                            <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium">
                              PALM
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">{activity.action} at {activity.merchant}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-bold ${
                        activity.status === 'pending' ? 'text-amber-600' : 'text-gray-800'
                      }`}>
                        ₹{activity.amount}
                      </p>
                      <p className={`text-xs ${
                        activity.status === 'pending' ? 'text-amber-600' : 'text-green-600'
                      }`}>
                        {activity.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      {/* PALM REGISTRATION MODAL */}
      <AnimatePresence>
        {showPalmRegisterModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            onClick={() => { setShowPalmRegisterModal(null); setPalmRegistrationStep('intro'); }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-md overflow-hidden"
            >
              {/* Intro Step */}
              {palmRegistrationStep === 'intro' && (
                <div className="p-6">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mx-auto mb-4">
                      <PalmNFCIcon className="w-10 h-10" style={{ filter: 'brightness(0) invert(1)' }} />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      Register {showPalmRegisterModal.name}'s Palm
                    </h2>
                    <p className="text-sm text-gray-600">
                      Link their palm to the <span className="font-semibold text-pink-600">Circle Wallet</span> for phone-free payments
                    </p>
                  </div>

                  {/* How it works */}
                  <div className="space-y-3 mb-6">
                    {[
                      { icon: Fingerprint, text: "Scan palm at any PalmPe registration kiosk" },
                      { icon: Link2, text: "Palm gets linked to Circle Wallet automatically" },
                      { icon: Wallet, text: "Payments deducted from Circle balance" }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                          <item.icon className="w-5 h-5 text-pink-600" />
                        </div>
                        <p className="text-sm text-gray-700">{item.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Hand Selection */}
                  <div className="mb-6">
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">Select Hand to Register</Label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedHand('left')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedHand === 'left' 
                            ? 'border-pink-500 bg-pink-50' 
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-3xl mb-2 block">🤚</span>
                        <span className="text-sm font-semibold text-gray-700">Left Palm</span>
                      </button>
                      <button
                        onClick={() => setSelectedHand('right')}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          selectedHand === 'right' 
                            ? 'border-pink-500 bg-pink-50' 
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <span className="text-3xl mb-2 block">🤚</span>
                        <span className="text-sm font-semibold text-gray-700">Right Palm</span>
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => { setShowPalmRegisterModal(null); setPalmRegistrationStep('intro'); }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="flex-1 bg-pink-600 hover:bg-pink-700"
                      onClick={startPalmScan}
                    >
                      Start Registration
                    </Button>
                  </div>
                </div>
              )}

              {/* Scanning Step */}
              {palmRegistrationStep === 'scanning' && (
                <div className="p-6 text-center">
                  <motion.div
                    className="w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mx-auto mb-6"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      boxShadow: [
                        '0 0 0 0 rgba(236, 72, 153, 0.4)',
                        '0 0 0 20px rgba(236, 72, 153, 0)',
                        '0 0 0 0 rgba(236, 72, 153, 0)'
                      ]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <PalmNFCIcon className="w-16 h-16" style={{ filter: 'brightness(0) invert(1)' }} />
                  </motion.div>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Scanning Palm...</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    Ask {showPalmRegisterModal.name} to place their {selectedHand} palm on the scanner
                  </p>
                  
                  <div className="flex items-center justify-center gap-2">
                    <motion.div
                      className="w-2 h-2 rounded-full bg-pink-500"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-pink-500"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-pink-500"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              )}

              {/* Success Step */}
              {palmRegistrationStep === 'success' && (
                <div className="p-6 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <h2 className="text-xl font-bold text-gray-800 mb-2">Palm Registered!</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    {showPalmRegisterModal.name}'s {selectedHand} palm is now linked to the Circle Wallet
                  </p>
                  
                  <Card className="p-4 bg-green-50 border-green-200 mb-6 text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                        <Link2 className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Palm ID</p>
                        <p className="font-mono font-bold text-green-700">
                          PLM-{showPalmRegisterModal.name.toUpperCase().replace(' ', '-').slice(0, 6)}-2024-{selectedHand === 'left' ? 'L' : 'R'}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>✓ Linked to: <span className="font-semibold">{circleWallet.name}</span></p>
                      <p>✓ Daily Limit: <span className="font-semibold">₹{showPalmRegisterModal.dailyLimit}</span></p>
                      <p>✓ Hand: <span className="font-semibold">{selectedHand === 'left' ? 'Left' : 'Right'} Palm</span></p>
                    </div>
                  </Card>
                  
                  <Button 
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    onClick={() => { setShowPalmRegisterModal(null); setPalmRegistrationStep('intro'); }}
                  >
                    Done
                  </Button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD MEMBER MODAL */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
            onClick={() => { setShowAddModal(false); resetForm(); }}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-t-3xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white p-4 border-b z-10">
                <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 sm:hidden" />
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Add to Circle</h2>
                  <button onClick={() => { setShowAddModal(false); resetForm(); }} className="p-2 hover:bg-gray-100 rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="p-5">
                {/* Add Method Selection */}
                {!addMethod && (
                  <div className="space-y-3">
                    <p className="text-sm text-gray-600 mb-4">How would you like to add them?</p>
                    {[
                      { id: 'qr', icon: QrCode, title: 'Scan QR Code', desc: 'Scan their Palm Circle QR' },
                      { id: 'phone', icon: Phone, title: 'Phone Number', desc: 'Enter their phone number' },
                      { id: 'palmid', icon: PalmNFCIcon, title: 'Palm ID', desc: 'Enter their Palm ID', isPalmIcon: true }
                    ].map(method => (
                      <button
                        key={method.id}
                        onClick={() => setAddMethod(method.id)}
                        className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-pink-400 flex items-center gap-4 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
                          {method.isPalmIcon ? (
                            <PalmNFCIcon className="w-6 h-6" style={{ filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(330deg)' }} />
                          ) : (
                            <method.icon className="w-6 h-6 text-pink-600" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-gray-800">{method.title}</p>
                          <p className="text-xs text-gray-500">{method.desc}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400 ml-auto" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Phone Number Form */}
                {addMethod === 'phone' && (
                  <div className="space-y-4">
                    <button onClick={() => setAddMethod(null)} className="text-sm text-pink-600 flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <div>
                      <Label>Phone Number</Label>
                      <Input
                        type="tel"
                        value={newMemberPhone}
                        onChange={e => setNewMemberPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Name</Label>
                      <Input
                        value={newMemberName}
                        onChange={e => setNewMemberName(e.target.value)}
                        placeholder="Enter their name"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label>Relationship</Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        {['spouse', 'child', 'parent', 'sibling', 'friend', 'other'].map(rel => (
                          <button
                            key={rel}
                            onClick={() => setNewMemberRelation(rel)}
                            className={`py-2 rounded-lg text-sm capitalize flex items-center justify-center gap-1 ${
                              newMemberRelation === rel ? 'bg-pink-600 text-white' : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {relationEmojis[rel]} {rel}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Access Mode */}
                    <div>
                      <Label>Payment Access</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <button
                          onClick={() => setAccessMode('limited')}
                          className={`p-3 rounded-xl border-2 text-left ${
                            accessMode === 'limited' ? 'border-green-500 bg-green-50' : 'border-gray-200'
                          }`}
                        >
                          <p className="font-semibold text-sm">Auto Pay</p>
                          <p className="text-xs text-gray-500">Within limits</p>
                        </button>
                        <button
                          onClick={() => setAccessMode('approval')}
                          className={`p-3 rounded-xl border-2 text-left ${
                            accessMode === 'approval' ? 'border-amber-500 bg-amber-50' : 'border-gray-200'
                          }`}
                        >
                          <p className="font-semibold text-sm">Need Approval</p>
                          <p className="text-xs text-gray-500">Every payment</p>
                        </button>
                      </div>
                    </div>

                    {/* Spending Limits */}
                    <div>
                      <Label>Spending Limits</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Per Transaction</p>
                          <Input
                            type="number"
                            value={perTxnLimit}
                            onChange={e => setPerTxnLimit(e.target.value)}
                            className="text-center"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Daily</p>
                          <Input
                            type="number"
                            value={dailyLimit}
                            onChange={e => setDailyLimit(e.target.value)}
                            className="text-center"
                          />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Monthly</p>
                          <Input
                            type="number"
                            value={monthlyLimit}
                            onChange={e => setMonthlyLimit(e.target.value)}
                            className="text-center"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Categories */}
                    <div>
                      <Label>Allowed Categories</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {allCategories.map(cat => (
                          <button
                            key={cat.id}
                            onClick={() => {
                              if (allowedCategories.includes(cat.id)) {
                                setAllowedCategories(prev => prev.filter(c => c !== cat.id));
                              } else {
                                setAllowedCategories(prev => [...prev, cat.id]);
                              }
                            }}
                            className={`px-3 py-1.5 rounded-full text-xs flex items-center gap-1 ${
                              allowedCategories.includes(cat.id) 
                                ? 'bg-pink-600 text-white' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {cat.icon} {cat.name}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Note about Palm Registration */}
                    <Card className="p-3 bg-blue-50 border-blue-200">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-700">
                          After adding, you can register their palm from the member card to enable phone-free payments.
                        </p>
                      </div>
                    </Card>

                    <Button
                      onClick={handleAddMember}
                      disabled={loading || !newMemberPhone || !newMemberName}
                      className="w-full h-12 bg-pink-600 hover:bg-pink-700"
                    >
                      {loading ? 'Sending Invitation...' : 'Send Invitation'}
                    </Button>
                  </div>
                )}

                {/* QR Scanner */}
                {addMethod === 'qr' && (
                  <div className="text-center py-8">
                    <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                      <QrCode className="w-24 h-24 text-gray-400" />
                    </div>
                    <p className="text-gray-600">Camera access needed to scan QR</p>
                    <Button onClick={() => setAddMethod(null)} variant="outline" className="mt-4">
                      Use Phone Number Instead
                    </Button>
                  </div>
                )}

                {/* Palm ID */}
                {addMethod === 'palmid' && (
                  <div className="space-y-4">
                    <button onClick={() => setAddMethod(null)} className="text-sm text-pink-600 flex items-center gap-1">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <div>
                      <Label>Palm ID</Label>
                      <Input placeholder="PLM-XXXX-XXXX" className="mt-1 font-mono" />
                    </div>
                    <Button className="w-full bg-pink-600 hover:bg-pink-700">
                      Search Member
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* EDIT LIMITS MODAL */}
      <AnimatePresence>
        {showLimitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-5"
            onClick={() => setShowLimitModal(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
              className="bg-white rounded-2xl p-6 max-w-sm w-full"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
                  {relationEmojis[showLimitModal.relation]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{showLimitModal.name}</h3>
                  <p className="text-xs text-gray-500">Edit spending limits</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Per Transaction Limit</Label>
                  <Input type="number" defaultValue={showLimitModal.perTxnLimit} className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Daily Limit</Label>
                  <Input type="number" defaultValue={showLimitModal.dailyLimit} className="mt-1" />
                </div>
                <div>
                  <Label className="text-sm">Monthly Limit</Label>
                  <Input type="number" defaultValue={showLimitModal.monthlyLimit} className="mt-1" />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button variant="outline" onClick={() => setShowLimitModal(null)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setShowLimitModal(null)} className="flex-1 bg-pink-600 hover:bg-pink-700">
                  Save Changes
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
