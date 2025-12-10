import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  ArrowDownLeft,
  Phone,
  AtSign,
  CheckCircle2,
  Clock,
  XCircle,
  Send,
  Bell
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockContacts } from '../mockDataPalmPay';
import { LoadingSpinner } from '../components/StateComponents';
import { motion } from 'framer-motion';

const CollectRequest = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list', 'create', 'success'
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    recipient: '',
    amount: '',
    note: ''
  });

  const mockRequests = [
    {
      id: 'req1',
      from: 'You',
      to: 'Priya Sharma',
      amount: 500,
      note: 'Lunch payment',
      status: 'pending',
      date: '2h ago'
    },
    {
      id: 'req2',
      from: 'Ravi Kumar',
      to: 'You',
      amount: 1200,
      note: 'Movie tickets',
      status: 'pending',
      date: '5h ago'
    },
    {
      id: 'req3',
      from: 'You',
      to: 'Amit Singh',
      amount: 850,
      note: 'Cab fare',
      status: 'completed',
      date: '1d ago'
    },
  ];

  const handleSendRequest = () => {
    if (!formData.recipient || !formData.amount) {
      alert('Please fill all required fields');
      return;
    }

    // Navigate to palm scan page for authentication
    navigate('/palm-scan', { 
      state: { 
        type: 'request',
        recipient: formData.recipient,
        amount: formData.amount,
        note: formData.note,
        returnTo: '/collect'
      } 
    });
  };

  const handleAccept = (requestId) => {
    console.log('Accepting request:', requestId);
    navigate('/transfer');
  };

  const handleReject = (requestId) => {
    if (window.confirm('Reject this payment request?')) {
      console.log('Rejected:', requestId);
    }
  };

  const handleReminder = (requestId) => {
    console.log('Sending reminder for:', requestId);
    alert('Reminder sent!');
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
              <h1 className="text-xl font-semibold">Collect Requests</h1>
              <p className="text-xs text-white/80">Request money from contacts</p>
            </div>
          </div>

          {view === 'list' && (
            <Card 
              className="bg-gradient-to-r from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border border-white/20 p-4 cursor-pointer hover:from-[#586BFF]/30 hover:to-[#9B62FF]/30 transition-all"
              onClick={() => setView('create')}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center">
                  <ArrowDownLeft className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">New Request</p>
                  <p className="text-xs text-white/70">Request payment from someone</p>
                </div>
                <Send className="w-5 h-5 text-white/50" />
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Create Request Form */}
        {view === 'create' && !loading && (
          <Card className="p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">Request Payment</h3>
              <button 
                onClick={() => setView('list')}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>

            <div>
              <Label htmlFor="recipient">From (Phone / UPI ID / Email)</Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="recipient"
                  type="text"
                  placeholder="9876543210 or name@upi or email@example.com"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Enter phone number, UPI ID, or email address
              </p>
            </div>

            <div>
              <Label htmlFor="amount">Amount</Label>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl text-gray-500">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="text-2xl font-bold"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                type="text"
                placeholder="What's this for?"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="mt-2"
              />
            </div>

            {/* Suggested Contacts */}
            <div>
              <Label className="mb-3 block">Recent Contacts</Label>
              <div className="space-y-2">
                {mockContacts.slice(0, 3).map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setFormData({ ...formData, recipient: contact.phone })}
                    className="w-full p-3 flex items-center gap-3 rounded-lg border hover:border-[#586BFF] hover:bg-[#586BFF]/5 transition-all"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center text-white font-bold">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-gray-800">{contact.name}</p>
                      <p className="text-xs text-gray-500">{contact.phone}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button 
              onClick={handleSendRequest}
              className="w-full bg-[#586BFF] h-12 text-lg font-semibold"
            >
              Send Request
            </Button>
          </Card>
        )}

        {loading && <LoadingSpinner message="Sending request..." />}

        {/* Success View */}
        {view === 'success' && (
          <div className="min-h-[50vh] flex items-center justify-center">
            <Card className="p-8 text-center max-w-md">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Request Sent!</h2>
              <p className="text-gray-600 mb-6">
                Your payment request for ₹{formData.amount} has been sent to {formData.recipient}. You'll be notified when they respond.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setView('list')} 
                  className="w-full bg-[#586BFF]"
                >
                  View All Requests
                </Button>
                <Button 
                  onClick={() => {
                    setView('create');
                    setFormData({ recipient: '', amount: '', note: '' });
                  }}
                  variant="outline" 
                  className="w-full"
                >
                  Send Another Request
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Request List */}
        {view === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">All Requests</h3>
              <div className="flex gap-2">
                <button className="text-xs px-3 py-1 rounded-full bg-[#586BFF] text-white">All</button>
                <button className="text-xs px-3 py-1 rounded-full border text-gray-600">Pending</button>
              </div>
            </div>

            <div className="space-y-3">
              {mockRequests.map((request) => (
                <Card key={request.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      request.status === 'pending' ? 'bg-orange-100' : 'bg-green-100'
                    }`}>
                      {request.status === 'pending' ? (
                        <Clock className="w-5 h-5 text-orange-600" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <p className="font-medium text-gray-800">
                            {request.from === 'You' ? `To ${request.to}` : `From ${request.from}`}
                          </p>
                          <p className="text-xs text-gray-500">{request.note}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">₹{request.amount.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">{request.date}</p>
                        </div>
                      </div>

                      {request.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          {request.from === 'You' ? (
                            <Button 
                              onClick={() => handleReminder(request.id)}
                              variant="outline" 
                              className="flex-1 h-9 text-sm"
                            >
                              <Bell className="w-4 h-4 mr-2" />
                              Send Reminder
                            </Button>
                          ) : (
                            <>
                              <Button 
                                onClick={() => handleAccept(request.id)}
                                className="flex-1 h-9 text-sm bg-[#586BFF]"
                              >
                                Accept
                              </Button>
                              <Button 
                                onClick={() => handleReject(request.id)}
                                variant="outline" 
                                className="flex-1 h-9 text-sm border-red-500 text-red-500"
                              >
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectRequest;
