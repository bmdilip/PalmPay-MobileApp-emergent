import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { 
  ArrowLeft, 
  Repeat,
  Plus,
  CheckCircle2,
  Clock,
  Trash2,
  Calendar
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AutoPay = () => {
  const navigate = useNavigate();
  const [view, setView] = useState('list'); // 'list', 'create'
  const [formData, setFormData] = useState({
    service: '',
    amount: '',
    frequency: 'monthly',
    startDate: ''
  });

  const mockMandates = [
    {
      id: 'mandate1',
      service: 'Netflix Subscription',
      amount: 649,
      frequency: 'monthly',
      nextDate: '15 Feb 2025',
      status: 'active',
      merchant: 'Netflix India'
    },
    {
      id: 'mandate2',
      service: 'Electricity Bill',
      amount: 1200,
      frequency: 'monthly',
      nextDate: '28 Feb 2025',
      status: 'active',
      merchant: 'BESCOM'
    },
    {
      id: 'mandate3',
      service: 'Amazon Prime',
      amount: 299,
      frequency: 'monthly',
      nextDate: '20 Feb 2025',
      status: 'paused',
      merchant: 'Amazon'
    },
  ];

  const services = [
    'Electricity Bill',
    'Mobile Recharge',
    'Broadband Bill',
    'Netflix',
    'Amazon Prime',
    'Spotify',
    'YouTube Premium',
    'Other'
  ];

  const frequencies = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  const handleCreate = () => {
    if (!formData.service || !formData.amount || !formData.startDate) {
      alert('Please fill all fields');
      return;
    }
    alert('Auto-Pay mandate created successfully!');
    setView('list');
    setFormData({ service: '', amount: '', frequency: 'monthly', startDate: '' });
  };

  const handleToggleStatus = (mandateId) => {
    console.log('Toggling mandate:', mandateId);
  };

  const handleCancel = (mandateId) => {
    if (window.confirm('Cancel this auto-pay mandate? You can always set it up again.')) {
      console.log('Cancelling:', mandateId);
    }
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
              <h1 className="text-xl font-semibold">Auto-Pay</h1>
              <p className="text-xs text-white/80">Manage recurring payments</p>
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
                  <p className="font-semibold text-white">Set Up Auto-Pay</p>
                  <p className="text-xs text-white/70">Never miss a payment again</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Create Mandate */}
        {view === 'create' && (
          <Card className="p-5 space-y-5">
            <h3 className="font-bold text-lg text-gray-800">Setup Auto-Pay</h3>

            <div>
              <Label>Service / Bill</Label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586BFF]"
              >
                <option value="">Select service</option>
                {services.map((service) => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="amount">Max Amount (₹)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter maximum amount"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                className="mt-2"
              />
              <p className="text-xs text-gray-500 mt-1">Payment won't exceed this amount</p>
            </div>

            <div>
              <Label>Frequency</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {frequencies.map((freq) => (
                  <button
                    key={freq.value}
                    onClick={() => setFormData({ ...formData, frequency: freq.value })}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.frequency === freq.value
                        ? 'border-[#586BFF] bg-[#586BFF]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">{freq.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                min={new Date().toISOString().split('T')[0]}
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="mt-2"
              />
            </div>

            <Button onClick={handleCreate} className="w-full bg-[#586BFF] h-12 font-semibold">
              Create Auto-Pay
            </Button>
          </Card>
        )}

        {/* Mandate List */}
        {view === 'list' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Active Mandates</h3>
              <span className="text-sm text-gray-500">{mockMandates.filter(m => m.status === 'active').length} active</span>
            </div>

            <div className="space-y-3">
              {mockMandates.map((mandate) => (
                <Card key={mandate.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      mandate.status === 'active' ? 'bg-green-100' : 'bg-gray-100'
                    }`}>
                      {mandate.status === 'active' ? (
                        <Repeat className="w-5 h-5 text-green-600" />
                      ) : (
                        <Clock className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-800">{mandate.service}</p>
                          <p className="text-xs text-gray-500">{mandate.merchant}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-800">₹{mandate.amount}</p>
                          <p className="text-xs text-gray-500 capitalize">{mandate.frequency}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Next: {mandate.nextDate}</span>
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={mandate.status === 'active'}
                            onCheckedChange={() => handleToggleStatus(mandate.id)}
                          />
                          <span className="text-sm text-gray-600">
                            {mandate.status === 'active' ? 'Active' : 'Paused'}
                          </span>
                        </div>
                        <Button
                          onClick={() => handleCancel(mandate.id)}
                          variant="ghost"
                          className="h-8 text-red-500 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
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

export default AutoPay;
