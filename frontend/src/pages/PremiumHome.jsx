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
  Globe,
  ChevronDown
} from 'lucide-react';
import { mockUser, mockTransactions } from '../mockDataPalmPay';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import Logo from '../components/Logo';

const PremiumHome = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const navigate = useNavigate();
  const { selectedWallet, wallets, switchWallet, getTotalBalance } = useWallet();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickActions = [
    { id: 'send', label: 'Send Money', icon: ArrowUpRight, color: 'from-blue-500 to-blue-600', path: '/send' },
    { id: 'request', label: 'Request', icon: ArrowDownLeft, color: 'from-green-500 to-green-600', path: '/collect' },
    { id: 'scan', label: 'Scan QR', icon: QrCode, color: 'from-purple-500 to-purple-600', path: '/scan' },
    { id: 'quickwallet', label: 'Quick Wallet', icon: Zap, color: 'from-orange-500 to-orange-600', path: '/digital-wallet' },
  ];

  const rechargeServices = [
    { id: 'mobile', label: 'Mobile Recharge', icon: Smartphone, color: '#586BFF', path: '/services/mobile-recharge' },
    { id: 'electricity', label: 'Electricity Bill', icon: Zap, color: '#FF6B35', path: '/services/electricity' },
    { id: 'dth', label: 'DTH', icon: Repeat, color: '#9B62FF', path: '/services/dth' },
    { id: 'broadband', label: 'Broadband', icon: Wifi, color: '#64E8FF', path: '/services/broadband' },
    { id: 'water', label: 'Water Bill', icon: Droplet, color: '#4ECDC4', path: '/services/water' },
    { id: 'gas', label: 'Gas Bill', icon: Zap, color: '#F7931E', path: '/services/gas' },
    { id: 'fastag', label: 'FASTag', icon: Truck, color: '#9C27B0', path: '/services/fastag' },
    { id: 'insurance', label: 'Insurance', icon: Shield, color: '#00BCD4', path: '/services/insurance' },
  ];

  const financialServices = [
    { id: 'mutual', label: 'Mutual Funds', desc: 'SIPs & Investments', icon: TrendingUp, color: '#586BFF', path: '/services/mutual-funds' },
    { id: 'gold', label: 'Digital Gold', desc: 'Save ₹10 daily', icon: Sparkles, color: '#D4AF37', path: '/services/digital-gold' },
    { id: 'limits', label: 'Limit Settings', desc: 'Payment & Palm limits', icon: Shield, color: '#9B62FF', path: '/limit-settings' },
    { id: 'rewards', label: 'Rewards', desc: 'Cashback & Offers', icon: Gift, color: '#FF6B35', path: '/cashback-rewards' },
    { id: 'insurance-fin', label: 'Insurance', desc: 'Vehicle & Health', icon: Shield, color: '#00BCD4', path: '/services/insurance', badge: 'Offer' },
    { id: 'travel', label: 'Travel & Transit', desc: 'Flight, Train, Bus, Hotel, Metro', icon: Plane, color: '#FF9800', path: '/services/flights', badge: 'Sale' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Collapsing Premium Header with Gradient */}
      <div 
        className={`bg-gradient-to-br from-[#586BFF] via-[#6B7AFF] to-[#8B8FFF] text-white px-5 rounded-b-[2rem] shadow-2xl relative overflow-hidden transition-all duration-500 ${
          scrolled ? 'pt-6 pb-4' : 'pt-12 pb-8'
        }`}
        style={{
          transform: scrolled ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Decorative circles with 3D effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="absolute top-20 left-1/2 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <Logo size={scrolled ? "sm" : "md"} withGlow={false} />
            <button className="relative p-2.5 hover:bg-white/10 rounded-full transition-all transform hover:scale-110">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>

          {/* User Greeting - Collapses on scroll */}
          <div className={`mb-6 transition-all duration-300 ${scrolled ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
            <p className="text-white/80 text-sm mb-1">Welcome back,</p>
            <h2 className="text-2xl font-bold tracking-tight">{mockUser.name}</h2>
            
            {/* Palm Status Badge */}
            <button 
              onClick={() => navigate('/device-center')}
              className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-all border border-white/20 hover:scale-105 transform"
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

          {/* Balance Card - Premium Design */}
          <Card 
            className="bg-white/10 backdrop-blur-xl border-white/20 p-5 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02]"
            style={{
              backdropFilter: 'blur(20px)',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)'
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs mb-1 font-medium">Total Balance</p>
                <div className="flex items-center gap-3">
                  <h3 className="text-3xl font-bold tracking-tight">
                    {showBalance ? `₹${mockUser.walletBalance.toLocaleString()}` : '₹****'}
                  </h3>
                  <button 
                    onClick={() => setShowBalance(!showBalance)}
                    className="p-1.5 hover:bg-white/10 rounded-full transition-all transform hover:scale-110"
                  >
                    {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button 
                onClick={() => navigate('/add-money')}
                className="bg-white text-[#586BFF] hover:bg-white/90 font-semibold text-sm px-4 h-9 shadow-lg transform hover:scale-105 transition-all"
              >
                + Add Money
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions - Premium 3D Tiles */}
      <div className="px-5 -mt-8 mb-8 relative z-20">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                className="flex flex-col items-center gap-2 group animate-slideUp"
                onClick={() => navigate(action.path)}
              >
                <div 
                  className={`w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl shadow-lg flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-all duration-300`}
                  style={{
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2), 0 8px 10px -6px rgba(0,0,0,0.1)'
                  }}
                >
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

      {/* Promotional Banner - Enhanced */}
      <div className="px-5 mb-6">
        <Card 
          className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border-0 p-6 shadow-lg overflow-hidden relative cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
          onClick={() => navigate('/cashback-rewards')}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-200/30 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-yellow-200/30 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Gift className="w-5 h-5 text-orange-600 animate-bounce" />
              <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Exclusive Offer</span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">Get ₹100 Cashback</h3>
            <p className="text-sm text-gray-600 mb-3">On your first bill payment of ₹500 or more</p>
            <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white h-9 text-sm font-semibold shadow-lg transform hover:scale-105 transition-all">
              Pay Now
            </Button>
          </div>
        </Card>
      </div>

      {/* Recharge & Bills Section - Functional */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recharge & Bills</h3>
          <button 
            onClick={() => navigate('/all-services')}
            className="text-sm font-semibold text-[#586BFF] flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {rechargeServices.slice(0, 4).map((service, index) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                className="flex flex-col items-center gap-2 group"
                onClick={() => navigate(service.path)}
              >
                <div 
                  className="w-16 h-16 rounded-2xl shadow-md flex items-center justify-center group-hover:scale-110 group-active:scale-95 transition-all duration-300"
                  style={{ 
                    backgroundColor: `${service.color}15`,
                    boxShadow: `0 4px 12px ${service.color}25`
                  }}
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

      {/* Financial Services - Premium Cards */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Financial Services</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {financialServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={service.id}
                className="p-4 cursor-pointer hover:shadow-xl transition-all duration-300 border-0 shadow-md transform hover:scale-[1.03] relative overflow-hidden group"
                onClick={() => navigate(service.path)}
              >
                {service.badge && (
                  <span className="absolute top-2 right-2 px-2 py-0.5 bg-purple-500 text-white text-xs font-bold rounded-full shadow-lg">
                    {service.badge}
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: service.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-800 mb-0.5 truncate">{service.label}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{service.desc}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Transactions - Enhanced Cards */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
          <button 
            onClick={() => navigate('/history')}
            className="text-sm font-semibold text-[#586BFF] flex items-center gap-1 hover:gap-2 transition-all"
          >
            View All <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <Card className="border-0 shadow-lg divide-y divide-gray-100 overflow-hidden">
          {mockTransactions.slice(0, 4).map((transaction, index) => (
            <div 
              key={transaction.id} 
              className="p-4 flex items-center justify-between hover:bg-gradient-to-r hover:from-gray-50 hover:to-transparent transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 ${
                  transaction.type === 'received' ? 'bg-green-50' : 'bg-blue-50'
                }`}>
                  {transaction.type === 'received' ? 
                    <ArrowDownLeft className="w-5 h-5 text-green-600" /> : 
                    <ArrowUpRight className="w-5 h-5 text-blue-600" />
                  }
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm group-hover:text-gray-900 transition-colors">{transaction.recipient}</p>
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

      {/* Refer & Earn Banner - Premium 3D Card */}
      <div className="px-5 mb-6">
        <Card 
          className="bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700 border-0 p-5 shadow-xl text-white overflow-hidden relative cursor-pointer hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-300"
          onClick={() => navigate('/referral')}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-wide">Refer & Earn</span>
              </div>
              <p className="text-sm mb-1 font-semibold">Invite friends and earn ₹100</p>
              <p className="text-xs text-white/80">For each successful referral</p>
            </div>
            <Button className="bg-white text-purple-600 hover:bg-white/90 font-semibold text-sm px-4 h-9 shadow-lg transform hover:scale-110 transition-all">
              Invite
            </Button>
          </div>
        </Card>
      </div>

    </div>
  );
};

export default PremiumHome;