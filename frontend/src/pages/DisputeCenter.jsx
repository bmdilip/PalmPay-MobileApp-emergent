import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  ArrowLeft, 
  AlertTriangle,
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  Upload,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LoadingSpinner } from '../components/StateComponents';

const DisputeCenter = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list', 'create', 'detail'
  const [loading, setLoading] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState(null);

  const [formData, setFormData] = useState({
    transactionId: '',
    reason: '',
    description: '',
    amount: ''
  });

  const mockDisputes = [
    {
      id: 'DIS001',
      transactionId: 'TXN1234567890',
      reason: 'Unauthorized Transaction',
      amount: 500,
      status: 'open',
      date: '2 days ago',
      lastUpdate: 'Under investigation'
    },
    {
      id: 'DIS002',
      transactionId: 'TXN0987654321',
      reason: 'Amount Mismatch',
      amount: 1200,
      status: 'resolved',
      date: '1 week ago',
      resolution: 'Refund processed'
    },
  ];

  const reasons = [
    'Unauthorized Transaction',
    'Amount Mismatch',
    'Service Not Received',
    'Duplicate Payment',
    'Technical Error',
    'Other'
  ];

  const handleSubmit = () => {
    if (!formData.transactionId || !formData.reason || !formData.description) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert('Dispute raised successfully! Our team will review it within 24-48 hours.');
      setView('list');
      setFormData({ transactionId: '', reason: '', description: '', amount: '' });
    }, 2000);
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
              <h1 className="text-xl font-semibold">Dispute Center</h1>
              <p className="text-xs text-white/80">Report & track transaction issues</p>
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
                  <p className="font-semibold text-white">Raise New Dispute</p>
                  <p className="text-xs text-white/70">Report a transaction issue</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Create Dispute */}
        {view === 'create' && !loading && (
          <Card className="p-5 space-y-5">
            <h3 className="font-bold text-lg text-gray-800">Raise Dispute</h3>

            <div>
              <Label htmlFor="transactionId">Transaction ID *</Label>
              <Input
                id="transactionId"
                type="text"
                placeholder="Enter transaction ID"
                value={formData.transactionId}
                onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">Find this in your transaction history</p>
            </div>

            <div>
              <Label>Reason *</Label>
              <select
                value={formData.reason}
                onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586BFF]"
              >
                <option value="">Select reason</option>
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>{reason}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="amount">Transaction Amount</Label>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-500">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Explain the issue in detail..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">Provide as much detail as possible</p>
            </div>

            <div>
              <Label>Attach Screenshot (Optional)</Label>
              <button className="w-full mt-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-[#586BFF] hover:bg-[#586BFF]/5 transition-all">
                <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload</p>
              </button>
            </div>

            <Button 
              onClick={handleSubmit}
              className="w-full bg-[#586BFF] h-12 font-semibold"
            >
              Submit Dispute
            </Button>
          </Card>
        )}

        {loading && <LoadingSpinner message="Submitting dispute..." />}

        {/* Dispute List */}
        {view === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Your Disputes</h3>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 rounded-full bg-[#586BFF] text-white">All</button>
                <button className="text-xs px-3 py-1 rounded-full border text-gray-600">Open</button>
              </div>
            </div>

            <div className="space-y-3">
              {mockDisputes.map((dispute) => (
                <Card 
                  key={dispute.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => {
                    setSelectedDispute(dispute);
                    setView('detail');
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      dispute.status === 'open' ? 'bg-orange-100' : 
                      dispute.status === 'resolved' ? 'bg-green-100' : 'bg-red-100'
                    }`}>
                      {dispute.status === 'open' && <Clock className="w-5 h-5 text-orange-600" />}
                      {dispute.status === 'resolved' && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                      {dispute.status === 'rejected' && <XCircle className="w-5 h-5 text-red-600" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-medium text-gray-800">{dispute.reason}</p>
                          <p className="text-xs text-gray-500 font-mono">TXN: {dispute.transactionId}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">₹{dispute.amount}</p>
                          <p className="text-xs text-gray-400">{dispute.date}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        dispute.status === 'open' ? 'bg-orange-100 text-orange-700' :
                        dispute.status === 'resolved' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {dispute.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Dispute Detail */}
        {view === 'detail' && selectedDispute && (
          <div className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-gray-800">Dispute Details</h3>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                  selectedDispute.status === 'open' ? 'bg-orange-100 text-orange-700' :
                  selectedDispute.status === 'resolved' ? 'bg-green-100 text-green-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {selectedDispute.status.toUpperCase()}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Dispute ID</span>
                  <span className="font-medium text-gray-800">{selectedDispute.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transaction ID</span>
                  <span className="font-medium text-gray-800 font-mono">{selectedDispute.transactionId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reason</span>
                  <span className="font-medium text-gray-800">{selectedDispute.reason}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium text-gray-800">₹{selectedDispute.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Raised On</span>
                  <span className="font-medium text-gray-800">{selectedDispute.date}</span>
                </div>
              </div>
            </Card>

            <Card className="p-5">
              <h4 className="font-bold text-gray-800 mb-3">Status Update</h4>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-[#586BFF] rounded-full mt-2"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{selectedDispute.lastUpdate || selectedDispute.resolution}</p>
                    <p className="text-xs text-gray-500">Latest update</p>
                  </div>
                </div>
              </div>
            </Card>

            <Button 
              className="w-full bg-[#586BFF] h-12"
              onClick={() => alert('Contact support feature coming soon!')}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Contact Support
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputeCenter;