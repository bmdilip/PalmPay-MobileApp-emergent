import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ArrowLeft, Zap, Plus, ArrowUpRight, Info, CheckCircle2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Logo from '../components/Logo';

const QuickWallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [balance, setBalance] = useState(500);
  const [showTopUp, setShowTopUp] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [isEnabled, setIsEnabled] = useState(true);

  const recentTransactions = [
    { id: 1, merchant: 'Chai Point', amount: 50, time: '2 mins ago' },
    { id: 2, merchant: 'Auto Rickshaw', amount: 80, time: '1 hour ago' },
    { id: 3, merchant: 'Vegetable Vendor', amount: 120, time: '3 hours ago' },
  ];

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!amount || amount <= 0 || amount > 2000) {
      toast({
        title: "Invalid Amount",
        description: "Enter amount between ₹1 and ₹2000",
        variant: "destructive"
      });
      return;
    }

    setBalance(prev => prev + amount);
    setShowTopUp(false);
    setTopUpAmount('');
    toast({
      title: "Top-up Successful!",
      description: `₹${amount} added to Quick Wallet`
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white pb-20">
      {/* Header */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/home')} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#64E8FF]" />
              <h1 className="text-xl font-semibold">Quick Wallet</h1>
            </div>
            <p className="text-sm text-white/60 mt-1">UPI Lite • Fast Micro-payments</p>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="px-5 py-4">
        <Card className="bg-[#64E8FF]/10 border-[#64E8FF]/30 p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-[#64E8FF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white/80">
                <span className="font-semibold text-[#64E8FF]">Quick Wallet</span> enables instant payments under ₹1,000 without PIN. 
                Perfect for daily micro-transactions.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Balance Card */}
      <div className="px-5 mb-6">
        <Card className="bg-gradient-to-br from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border-[#586BFF]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Available Balance</p>
              <h2 className="text-4xl font-bold text-white">₹{balance.toFixed(2)}</h2>
              <p className="text-xs text-white/40 mt-2">Limit: ₹2,000</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-16 h-16 bg-[#64E8FF]/20 rounded-full flex items-center justify-center">
                <Zap className="w-8 h-8 text-[#64E8FF]" />
              </div>
            </div>
          </div>

          <Button 
            onClick={() => setShowTopUp(true)}
            disabled={balance >= 2000}
            className="w-full bg-white text-[#0A0F1F] hover:bg-gray-100 font-semibold disabled:opacity-50"
          >
            <Plus className="w-5 h-5 mr-2" />
            Top Up Wallet
          </Button>
        </Card>
      </div>

      {/* Status Toggle */}
      <div className="px-5 mb-6">
        <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-white">Quick Wallet Status</p>
              <p className="text-sm text-white/60 mt-1">
                {isEnabled ? 'Enabled for fast payments' : 'Disabled'}
              </p>
            </div>
            <button
              onClick={() => setIsEnabled(!isEnabled)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                isEnabled ? 'bg-[#586BFF]' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                isEnabled ? 'translate-x-7' : 'translate-x-1'
              }`} />
            </button>
          </div>
        </Card>
      </div>

      {/* Recent Transactions */}
      <div className="px-5">
        <h3 className="text-lg font-bold text-white mb-3">Recent Quick Payments</h3>
        <Card className="bg-white/3 backdrop-blur-lg border-white/10 divide-y divide-white/10">
          {recentTransactions.map((txn) => (
            <div key={txn.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#586BFF]/20 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-[#586BFF]" />
                </div>
                <div>
                  <p className="font-medium text-white">{txn.merchant}</p>
                  <p className="text-xs text-white/60">{txn.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-white">-₹{txn.amount}</p>
                <p className="text-xs text-green-400">Success</p>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Features */}
      <div className="px-5 mt-6">
        <h3 className="text-lg font-bold text-white mb-3">Features</h3>
        <div className="space-y-3">
          <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#64E8FF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white text-sm">No PIN Required</p>
              <p className="text-xs text-white/60 mt-1">Pay instantly for amounts under ₹1,000</p>
            </div>
          </Card>
          <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#64E8FF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white text-sm">Offline Support</p>
              <p className="text-xs text-white/60 mt-1">Works even with poor network connectivity</p>
            </div>
          </Card>
          <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-4 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#64E8FF] flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-white text-sm">Auto Top-up</p>
              <p className="text-xs text-white/60 mt-1">Set rules to auto-reload from main wallet</p>
            </div>
          </Card>
        </div>
      </div>

      {/* Top Up Dialog */}
      <Dialog open={showTopUp} onOpenChange={setShowTopUp}>
        <DialogContent className="bg-[#1a1f3a] border-[#586BFF]/30 text-white">
          <DialogHeader>
            <DialogTitle>Top Up Quick Wallet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-white/60 mb-2">Current Balance: ₹{balance}</p>
              <p className="text-sm text-white/60 mb-4">Max Balance: ₹2,000</p>
              <Input
                type="number"
                placeholder="Enter amount"
                value={topUpAmount}
                onChange={(e) => setTopUpAmount(e.target.value)}
                max={2000 - balance}
                className="text-2xl font-semibold h-14 text-center bg-white/5 border-[#586BFF]/30 text-white"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[100, 200, 500].map(amount => (
                <Button
                  key={amount}
                  onClick={() => setTopUpAmount(amount.toString())}
                  variant="outline"
                  className="border-[#586BFF]/30 text-white hover:bg-[#586BFF]/10"
                >
                  +₹{amount}
                </Button>
              ))}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => setShowTopUp(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb]"
                onClick={handleTopUp}
              >
                Add Money
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuickWallet;