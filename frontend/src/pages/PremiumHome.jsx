import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode,
  Smartphone,
  Zap,
  CreditCard,
  Repeat,
  Shield,
  Gift,
  TrendingUp,
  Users,
  Bell,
  Eye,
  EyeOff,
  ChevronRight,
  Sparkles,
  Wifi,
  Droplet,
  Truck,
  Building2,
  Plane,
  Hotel,
  Wallet,
  Globe
} from 'lucide-react';
import { mockUser, mockTransactions } from '../mockDataPalmPay';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

const PremiumHome = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickActions = [
    { id: 'send', label: 'Send Money', icon: ArrowUpRight, color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { id: 'request', label: 'Request', icon: ArrowDownLeft, color: 'from-green-500 to-green-600', bg: 'bg-green-50' },
    { id: 'scan', label: 'Scan QR', icon: QrCode, color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
    { id: 'quickwallet', label: 'Quick Wallet', icon: Zap, color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' },
  ];

  const services = [
    { id: 'recharge', label: 'Mobile Recharge', icon: Smartphone, color: '#586BFF' },
    { id: 'bills', label: 'Pay Bills', icon: CreditCard, color: '#9B62FF' },
    { id: 'dth', label: 'DTH', icon: Repeat, color: '#64E8FF' },
    { id: 'insurance', label: 'Insurance', icon: Shield, color: '#586BFF' },
  ];

  const financialServices = [
    { id: 'mutual', label: 'Mutual Funds', icon: TrendingUp, color: '#586BFF' },
    { id: 'gold', label: 'Digital Gold', icon: Sparkles, color: '#D4AF37' },
    { id: 'loan', label: 'Loans', icon: CreditCard, color: '#9B62FF' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Premium Header with Gradient */}
      <div className="bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 pt-12 pb-8 rounded-b-[2rem] shadow-2xl relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-8">
            <Logo size="md" withGlow={false} />
            <button className="relative p-2.5 hover:bg-white/10 rounded-full transition-all">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* User Greeting */}
          <div className="mb-6">
            <p className="text-white/80 text-sm mb-1">Welcome back,</p>
            <h2 className="text-2xl font-bold">{mockUser.name}</h2>
            
            {/* Palm Status Badge */}
            <button 
              onClick={() => navigate('/device-center')}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20"
            >
              <div className={`w-2 h-2 rounded-full ${mockUser.palmEnabled ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              <span className="text-xs font-medium">
                {mockUser.palmEnabled 
                  ? `Palm Registered • Last used ${mockUser.lastDeviceUsed || '2h ago'}` 
                  : 'Palm Not Registered • Pair a device'}
              </span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Balance Card */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 p-5 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs mb-1">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-bold">
                    {showBalance ? `₹${mockUser.walletBalance.toLocaleString()}` : '₹****'}
                  </h3>
                  <button 
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-all"
                  >
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button className="bg-white text-[#586BFF] hover:bg-white/90 font-semibold text-sm px-4 h-9 shadow-lg">
                + Add Money
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions - Premium Tiles */}
      <div className="px-5 -mt-6 mb-6">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                className="flex flex-col items-center gap-2 group"
                onClick={() => navigate(`/${action.id}`)}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="px-5 mb-6">
        <Card className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-0 p-6 shadow-md overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-orange-600" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Exclusive Offer</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Get ₹100 Cashback</h3>
            <p className="text-sm text-gray-600 mb-3">On your first bill payment of ₹500 or more</p>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-9 text-sm font-semibold shadow-lg">
              Pay Now
            </Button>
          </div>
        </Card>
      </div>

      {/* Recharge & Bills Section */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recharge & Bills</h3>
          <button className="text-sm font-semibold text-[#586BFF] flex items-center gap-1">
            See All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                className="flex flex-col items-center gap-2 group"
              >
                <div 
                  className="w-16 h-16 rounded-2xl shadow-md flex items-center justify-center group-hover:scale-105 transition-all"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center leading-tight">
                  {service.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Financial Services */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Financial Services</h3>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {financialServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id}
                className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-lg transition-all border-0 shadow-md"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <span className="text-xs font-semibold text-gray-800 text-center leading-tight">
                  {service.label}
                </span>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
          <button 
            onClick={() => navigate('/history')}
            className="text-sm font-semibold text-[#586BFF] flex items-center gap-1"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <Card className="border-0 shadow-md divide-y divide-gray-100">
          {mockTransactions.slice(0, 4).map((transaction) => (
            <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  transaction.type === 'received' ? 'bg-green-50' : 'bg-blue-50'
                }`}>
                  {transaction.type === 'received' ? 
                    <ArrowDownLeft className="w-5 h-5 text-green-600" /> : 
                    <ArrowUpRight className="w-5 h-5 text-blue-600" />
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{transaction.recipient}</p>
                  <p className="text-xs text-gray-500">{transaction.date} • {transaction.time}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold text-sm ${
                  transaction.type === 'received' ? 'text-green-600' : 'text-gray-800'
                }`}>
                  {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount}
                </p>
                <p className="text-xs text-green-600 capitalize">{transaction.status}</p>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* Refer & Earn Banner */}
      <div className="px-5 mb-6">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-600 border-0 p-5 shadow-lg text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-12 translate-x-12"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Users className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-wide">Refer & Earn</span>
              </div>
              <p className="text-sm mb-1">Invite friends and earn ₹100</p>
              <p className="text-xs text-white/80">For each successful referral</p>
            </div>
            <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold text-sm px-4 h-9 shadow-lg">
              Invite
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PremiumHome;