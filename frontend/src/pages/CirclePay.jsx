import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  Users,
  Plus,
  UserPlus,
  DollarSign,
  CheckCircle2,
  Clock,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockContacts } from '../mockDataPalmPay';
import { LoadingSpinner } from '../components/StateComponents';

const CirclePay = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list', 'create', 'circle', 'split'
  const [selectedCircle, setSelectedCircle] = useState(null);
  const [loading, setLoading] = useState(false);

  const [newCircle, setNewCircle] = useState({
    name: '',
    members: []
  });

  const [splitData, setSplitData] = useState({
    amount: '',
    description: '',
    splitType: 'equal' // 'equal', 'custom'
  });

  const mockCircles = [
    {
      id: 'circle1',
      name: 'Weekend Squad',
      members: ['You', 'Priya', 'Ravi', 'Neha'],
      balance: 2500,
      pendingSplits: 2
    },
    {
      id: 'circle2',
      name: 'Office Lunch Group',
      members: ['You', 'Amit', 'Anjali'],
      balance: 0,
      pendingSplits: 0
    },
  ];

  const mockSplits = [
    {
      id: 'split1',
      description: 'Dinner at Italian Place',
      amount: 2400,
      paidBy: 'Priya',
      splits: [
        { member: 'You', amount: 600, status: 'pending' },
        { member: 'Priya', amount: 600, status: 'paid' },
        { member: 'Ravi', amount: 600, status: 'pending' },
        { member: 'Neha', amount: 600, status: 'paid' },
      ],
      date: '2 days ago'
    },
  ];

  const handleCreateCircle = () => {
    if (!newCircle.name || newCircle.members.length === 0) {
      alert('Please add circle name and members');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('list');
      setNewCircle({ name: '', members: [] });
    }, 1500);
  };

  const handleCreateSplit = () => {
    if (!splitData.amount || !splitData.description) {
      alert('Please fill all fields');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Split created! Members will be notified.');
      setView('circle');
      setSplitData({ amount: '', description: '', splitType: 'equal' });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => view === 'list' ? navigate(-1) : setView('list')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">CirclePay</h1>
              <p className="text-xs text-white/80">Group payments & bill splitting</p>
            </div>
          </div>

          {view === 'list' && (
            <Card 
              className="bg-gradient-to-r from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border border-white/20 p-4 cursor-pointer hover:from-[#586BFF]/30 hover:to-[#9B62FF]/30 transition-all"
              onClick={() => setView('create')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">Create New Circle</p>
                  <p className="text-xs text-white/70">Start a group for shared expenses</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Create Circle */}
        {view === 'create' && !loading && (
          <Card className="p-5 space-y-5">
            <h3 className="font-bold text-lg text-gray-800">Create Circle</h3>

            <div>
              <Label htmlFor="circleName">Circle Name</Label>
              <Input
                id="circleName"
                type="text"
                placeholder="e.g., Weekend Squad"
                value={newCircle.name}
                onChange={(e) => setNewCircle({ ...newCircle, name: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Add Members</Label>
              <div className="space-y-2 mt-3">
                {mockContacts.slice(0, 4).map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      const isSelected = newCircle.members.includes(contact.name);
                      setNewCircle({
                        ...newCircle,
                        members: isSelected
                          ? newCircle.members.filter(m => m !== contact.name)
                          : [...newCircle.members, contact.name]
                      });
                    }}
                    className={`w-full p-3 flex items-center gap-3 rounded-lg border transition-all ${
                      newCircle.members.includes(contact.name)
                        ? 'border-[#586BFF] bg-[#586BFF]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center text-white font-bold">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                    {newCircle.members.includes(contact.name) && (
                      <CheckCircle2 className="w-5 h-5 text-[#586BFF]" />
                    )}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {newCircle.members.length} member(s) selected
              </p>
            </div>

            <Button 
              onClick={handleCreateCircle}
              className="w-full bg-[#586BFF] h-12 font-semibold"
            >
              Create Circle
            </Button>
          </Card>
        )}

        {loading && <LoadingSpinner message="Creating..." />}

        {/* Circle List */}
        {view === 'list' && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-800">Your Circles</h3>
            
            {mockCircles.map((circle) => (
              <Card 
                key={circle.id}
                className="p-4 cursor-pointer hover:shadow-lg transition-all"
                onClick={() => {
                  setSelectedCircle(circle);
                  setView('circle');
                }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-bold text-gray-800">{circle.name}</p>
                        <p className="text-xs text-gray-500">{circle.members.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-800">
                          Balance: ₹{circle.balance}
                        </p>
                        {circle.pendingSplits > 0 && (
                          <p className="text-xs text-orange-600">
                            {circle.pendingSplits} pending
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Circle Details */}
        {view === 'circle' && selectedCircle && (
          <div className="space-y-4">
            <Card className="p-5 bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <h3 className="font-bold text-lg text-gray-800 mb-3">{selectedCircle.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                {selectedCircle.members.map((member, idx) => (
                  <div key={idx} className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {member.charAt(0)}
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Your Balance</p>
                <p className="text-2xl font-bold text-gray-800">₹{selectedCircle.balance}</p>
              </div>
            </Card>

            <Button 
              onClick={() => setView('split')}
              className="w-full bg-[#586BFF] h-12 font-semibold"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Split a Bill
            </Button>

            <div>
              <h4 className="font-bold text-gray-800 mb-3">Recent Splits</h4>
              {mockSplits.map((split) => (
                <Card key={split.id} className="p-4 mb-3">
                  <div className="mb-3">
                    <div className="flex items-start justify-between mb-1">
                      <p className="font-medium text-gray-800">{split.description}</p>
                      <p className="font-bold text-gray-800">₹{split.amount}</p>
                    </div>
                    <p className="text-xs text-gray-500">Paid by {split.paidBy} • {split.date}</p>
                  </div>
                  <div className="space-y-2">
                    {split.splits.map((s, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{s.member}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">₹{s.amount}</span>
                          {s.status === 'paid' ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          ) : (
                            <Clock className="w-4 h-4 text-orange-500" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Create Split */}
        {view === 'split' && !loading && (
          <Card className="p-5 space-y-5">
            <h3 className="font-bold text-lg text-gray-800">Split Bill</h3>

            <div>
              <Label htmlFor="splitAmount">Total Amount</Label>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl text-gray-500">₹</span>
                <Input
                  id="splitAmount"
                  type="number"
                  placeholder="0"
                  value={splitData.amount}
                  onChange={(e) => setSplitData({ ...splitData, amount: e.target.value })}
                  className="text-2xl font-bold"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                placeholder="What's this for?"
                value={splitData.description}
                onChange={(e) => setSplitData({ ...splitData, description: e.target.value })}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Split Type</Label>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setSplitData({ ...splitData, splitType: 'equal' })}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    splitData.splitType === 'equal'
                      ? 'border-[#586BFF] bg-[#586BFF]/5'
                      : 'border-gray-200'
                  }`}
                >
                  <p className="font-semibold text-gray-800">Equal Split</p>
                  <p className="text-xs text-gray-500">Divide equally</p>
                </button>
                <button
                  onClick={() => setSplitData({ ...splitData, splitType: 'custom' })}
                  className={`flex-1 p-3 rounded-lg border-2 transition-all ${
                    splitData.splitType === 'custom'
                      ? 'border-[#586BFF] bg-[#586BFF]/5'
                      : 'border-gray-200'
                  }`}
                >
                  <p className="font-semibold text-gray-800">Custom</p>
                  <p className="text-xs text-gray-500">Set amounts</p>
                </button>
              </div>
            </div>

            {splitData.amount && splitData.splitType === 'equal' && (
              <Card className="p-4 bg-blue-50 border-blue-200">
                <p className="text-sm text-gray-700">
                  Each person pays: <span className="font-bold">₹{(parseFloat(splitData.amount) / selectedCircle.members.length).toFixed(2)}</span>
                </p>
              </Card>
            )}

            <Button 
              onClick={handleCreateSplit}
              className="w-full bg-[#586BFF] h-12 font-semibold"
            >
              Create Split
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CirclePay;
