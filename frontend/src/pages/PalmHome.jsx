import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Hand, 
  QrCode, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Smartphone,
  Eye,
  EyeOff,
  Bell,
  ChevronRight,
  Zap,
  Shield
} from 'lucide-react';
import { mockUser, mockTransactions } from '../mockDataPalmPay';
import { useNavigate } from 'react-router-dom';

const PalmHome = () => {
  const [showBalance, setShowBalance] = useState(true);
  const navigate = useNavigate();

  const quickActions = [
    { id: 'palm2qr', label: 'Palm2QR', icon: 'QrCode', color: '#586BFF', route: '/palm2qr' },
    { id: 'pos', label: 'Pay at POS', icon: 'Smartphone', color: '#9B62FF', route: '/pos-mode' },
    { id: 'send', label: 'Send Money', icon: 'ArrowUpRight', color: '#64E8FF', route: '/transfer' },
    { id: 'request', label: 'Request', icon: 'ArrowDownLeft', color: '#586BFF', route: '/request' },
  ];

  const getIcon = (iconName) => {
    const icons = {
      QrCode, Smartphone, ArrowUpRight, ArrowDownLeft
    };
    return icons[iconName] || QrCode;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        {/* Animated Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">PalmPay</h2>
              <p className="text-[#64E8FF] text-xs tracking-widest mt-1">YOUR PALM. YOUR WALLET.</p>
            </div>
            <button className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#64E8FF] rounded-full"></span>
            </button>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
              {mockUser.name.charAt(0)}
            </div>
            <div>
              <p className="font-semibold text-lg">{mockUser.name}</p>
              <div className="flex items-center gap-2 mt-1">
                <Hand className="w-4 h-4 text-[#64E8FF]" />
                <p className="text-sm text-gray-300">{mockUser.palmId}</p>
              </div>
            </div>
          </div>

          {/* Balance Cards */}
          <div className="space-y-3">
            {/* UPI Wallet */}
            <Card className="bg-gradient-to-r from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border border-white/20 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm mb-1">UPI Wallet Balance</p>
                  <div className="flex items-center gap-2">
                    <h3 className="text-3xl font-bold">
                      {showBalance ? `₹${mockUser.walletBalance.toFixed(2)}` : '₹****'}
                    </h3>
                    <button 
                      onClick={() => setShowBalance(!showBalance)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button className="bg-white text-[#0A0F1F] hover:bg-gray-100 font-semibold text-sm px-4">
                  Add Money
                </Button>
              </div>
            </Card>

            {/* CBDC Balance */}
            <Card className="bg-gradient-to-r from-[#64E8FF]/20 to-[#586BFF]/20 backdrop-blur-xl border border-white/20 p-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-xs mb-1">CBDC Balance (e₹)</p>
                  <p className="text-xl font-bold">
                    {showBalance ? `₹${mockUser.cbdcBalance.toFixed(2)}` : '₹****'}
                  </p>
                </div>
                <div className="text-xs text-[#64E8FF] bg-[#64E8FF]/10 px-3 py-1 rounded-full">Beta</div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Palm Badge */}
      <div className="flex justify-center -mt-8 mb-6">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-[#586BFF] blur-xl opacity-40 animate-pulse"></div>
          <button className="relative bg-gradient-to-r from-[#586BFF] to-[#9B62FF] text-white rounded-full p-5 shadow-2xl hover:scale-105 transition-transform">
            <Hand className="w-9 h-9" />
          </button>
        </div>
      </div>

      <div className="px-5">
        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => {
              const IconComp = getIcon(action.icon);
              return (
                <Card 
                  key={action.id}
                  onClick={() => navigate(action.route)}
                  className="p-4 hover:shadow-lg transition-all cursor-pointer border border-gray-200 hover:border-[#586BFF]/30 group"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: action.color }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800">{action.label}</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Features Banner */}
        <Card className="mb-6 bg-gradient-to-r from-[#586BFF]/10 to-[#9B62FF]/10 border-[#586BFF]/20 p-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#586BFF] rounded-full flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">Phone-less Payments</h4>
              <p className="text-sm text-gray-600 mb-2">Walk up to any PalmPe device and pay with just your palm. No phone, no OTP, no PIN.</p>
              <button className="text-[#586BFF] text-sm font-semibold flex items-center gap-1" onClick={() => navigate('/pos-mode')}>
                Learn More <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </Card>

        {/* Security Badge */}
        <Card className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-600" />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">SE/TEE Active</p>
              <p className="text-xs text-gray-600">Your biometrics are secure</p>
            </div>
            <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-semibold">Verified</div>
          </div>
        </Card>

        {/* Recent Transactions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
            <button 
              onClick={() => navigate('/history')}
              className="text-[#586BFF] text-sm font-semibold flex items-center gap-1"
            >
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <Card className="divide-y">
            {mockTransactions.slice(0, 4).map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-[#586BFF]/10 text-[#586BFF]'
                  }`}>
                    {transaction.type === 'received' ? 
                      <ArrowDownLeft className="w-5 h-5" /> : 
                      <ArrowUpRight className="w-5 h-5" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.recipient}</p>
                    <p className="text-xs text-gray-500">{transaction.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'received' ? 'text-green-600' : 'text-gray-700'
                  }`}>
                    {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PalmHome;