import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  Wallet,
  Plus,
  Minus,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  History
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockUser } from '../mockDataPalmPay';
import ServiceReceipt from '../components/ServiceReceipt';
import { LoadingSpinner } from '../components/StateComponents';

const DigitalWallet = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState(null); // 'add' or 'withdraw'
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);

  const quickAmounts = [500, 1000, 2000, 5000, 10000];

  const handleAddMoney = () => {
    if (!amount || parseFloat(amount) < 100) {
      alert('Minimum amount is ₹100');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const receiptData = {
        transactionId: `WAL${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: parseFloat(amount),
        serviceName: 'Wallet Top-Up',
        title: 'Money Added Successfully',
        details: [
          { label: 'Previous Balance', value: `₹${mockUser.walletBalance.toLocaleString('en-IN')}` },
          { label: 'Amount Added', value: `₹${parseFloat(amount).toLocaleString('en-IN')}` },
          { label: 'New Balance', value: `₹${(mockUser.walletBalance + parseFloat(amount)).toLocaleString('en-IN')}` },
          { label: 'Source', value: 'HDFC Bank ****1234' }
        ]
      };
      setReceipt(receiptData);
      setLoading(false);
    }, 2000);
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) < 100) {
      alert('Minimum withdrawal is ₹100');
      return;
    }

    if (parseFloat(amount) > mockUser.walletBalance) {
      alert('Insufficient balance');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const receiptData = {
        transactionId: `WDW${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: parseFloat(amount),
        serviceName: 'Wallet Withdrawal',
        title: 'Money Withdrawn Successfully',
        details: [
          { label: 'Previous Balance', value: `₹${mockUser.walletBalance.toLocaleString('en-IN')}` },
          { label: 'Amount Withdrawn', value: `₹${parseFloat(amount).toLocaleString('en-IN')}` },
          { label: 'New Balance', value: `₹${(mockUser.walletBalance - parseFloat(amount)).toLocaleString('en-IN')}` },
          { label: 'Destination', value: 'HDFC Bank ****1234' },
          { label: 'Processing Time', value: 'Instant' }
        ]
      };
      setReceipt(receiptData);
      setLoading(false);
    }, 2000);
  };

  if (receipt) {
    return <ServiceReceipt {...receipt} />;
  }

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
              <h1 className="text-xl font-semibold">Digital Wallet</h1>
              <p className="text-xs text-white/80">Add money or withdraw to bank</p>
            </div>
          </div>

          {/* Balance Card */}
          <Card className="bg-gradient-to-r from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border border-white/20 p-6">
            <div className="text-center">
              <p className="text-white/70 text-sm mb-2">Wallet Balance</p>
              <p className="text-4xl font-bold text-white mb-4">₹{mockUser.walletBalance.toLocaleString('en-IN')}</p>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => setAction('add')}
                  className="flex-1 bg-white text-[#586BFF] hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Money
                </Button>
                <Button 
                  onClick={() => setAction('withdraw')}
                  className="flex-1 bg-white/10 hover:bg-white/20 border border-white/30"
                >
                  <Minus className="w-4 h-4 mr-2" />
                  Withdraw
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Action Form */}
        {action && !loading && (
          <Card className="p-5 space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-800">
                {action === 'add' ? 'Add Money to Wallet' : 'Withdraw to Bank'}
              </h3>
              <button 
                onClick={() => setAction(null)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </div>

            <div>
              <Label htmlFor="amount">Enter Amount</Label>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-xl text-gray-500">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="text-2xl font-bold"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                {action === 'add' ? 'Minimum: ₹100' : `Available: ₹${mockUser.walletBalance.toLocaleString('en-IN')}`}
              </p>
            </div>

            <div>
              <Label className="mb-2 block">Quick Amount</Label>
              <div className="grid grid-cols-3 gap-2">
                {quickAmounts.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setAmount(amt.toString())}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      amount === amt.toString()
                        ? 'border-[#586BFF] bg-[#586BFF]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="font-semibold text-gray-800">₹{amt.toLocaleString()}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">
                  {action === 'add' ? 'From' : 'To'}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-800">HDFC Bank ****1234</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            <Button 
              onClick={action === 'add' ? handleAddMoney : handleWithdraw}
              className="w-full bg-[#586BFF] h-12 text-lg font-semibold"
            >
              {action === 'add' ? `Add ₹${amount || '0'}` : `Withdraw ₹${amount || '0'}`}
            </Button>
          </Card>
        )}

        {loading && <LoadingSpinner message={`Processing ${action === 'add' ? 'deposit' : 'withdrawal'}...`} />}

        {/* Recent Activity */}
        {!action && !loading && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
              <button 
                onClick={() => navigate('/history')}
                className="text-sm font-semibold text-[#586BFF] flex items-center gap-1"
              >
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {[
                { type: 'credit', amount: 5000, desc: 'Added from HDFC Bank', time: '2h ago' },
                { type: 'debit', amount: 850, desc: 'Paid to Cafe Coffee Day', time: '5h ago' },
                { type: 'credit', amount: 100, desc: 'Cashback Reward', time: '1d ago' },
              ].map((txn, idx) => (
                <Card key={idx} className="p-4">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      txn.type === 'credit' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {txn.type === 'credit' ? (
                        <TrendingUp className="w-5 h-5 text-green-600" />
                      ) : (
                        <TrendingDown className="w-5 h-5 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{txn.desc}</p>
                      <p className="text-xs text-gray-500">{txn.time}</p>
                    </div>
                    <div className={`text-right ${
                      txn.type === 'credit' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      <p className="font-bold">
                        {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                      </p>
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

export default DigitalWallet;
