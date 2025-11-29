import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  QrCode,
  Zap,
  Bell,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  Smartphone,
  Repeat,
  Wifi,
  Shield,
  TrendingUp,
  Sparkles,
  Gift,
  Users,
  HelpCircle,
  ShoppingBag,
  CreditCard
} from 'lucide-react';
import { mockUser, mockTransactions } from '../mockDataPalmPay';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../contexts/WalletContext';
import Logo from '../components/Logo';

// Animated Background Components
import MeshGradientBackground from '../components/animated/MeshGradientBackground';
import DotGridBackground from '../components/animated/DotGridBackground';
import ParticleField from '../components/animated/ParticleField';

// Premium Components
import { 
  FloatingActionButton,
  AdvertisementBanner,
  LayoutSwitcher
} from '../components/premium';

// Animation presets
import { 
  fadeInUp, 
  staggerContainer, 
  staggerItem,
  pulseAnimation
} from '../lib/animations';

// Layout Components
export const CompactLayout = ({ user, wallet, navigate, showBalance, setShowBalance }) => {
  const quickActions = [
    { id: 'send', label: 'Send', icon: ArrowUpRight, path: '/send' },
    { id: 'request', label: 'Request', icon: ArrowDownLeft, path: '/collect' },
    { id: 'scan', label: 'Scan', icon: QrCode, path: '/scan' },
    { id: 'wallet', label: 'Wallet', icon: Zap, path: '/digital-wallet' },
  ];

  return (
    <div className="space-y-4 px-4">
      {/* Compact Balance Card */}
      <Card className="bg-gradient-to-br from-[#586BFF] to-[#8B8FFF] text-white p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs opacity-80">Balance</span>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-1">
          {showBalance ? `₹${wallet.balance.toLocaleString()}` : '₹****'}
        </h2>
        <p className="text-xs opacity-70">{wallet.name}</p>
      </Card>

      {/* Compact Quick Actions */}
      <div className="grid grid-cols-4 gap-2">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center gap-1 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Compact Transactions */}
      <Card className="p-3">
        <h3 className="text-sm font-bold mb-2">Recent</h3>
        <div className="space-y-2">
          {mockTransactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  {tx.type === 'received' ? <ArrowDownLeft className="w-4 h-4 text-green-600" /> : <ArrowUpRight className="w-4 h-4 text-blue-600" />}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{tx.recipient}</p>
                  <p className="text-xs text-gray-500">{tx.time}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-gray-800">
                {tx.type === 'received' ? '+' : '-'}₹{tx.amount}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const ClassicLayout = ({ user, wallet, navigate, showBalance, setShowBalance }) => {
  const services = [
    { id: 'mobile', label: 'Mobile', icon: Smartphone, color: '#586BFF', path: '/services/mobile-recharge' },
    { id: 'electricity', label: 'Electricity', icon: Zap, color: '#FF6B35', path: '/services/electricity' },
    { id: 'dth', label: 'DTH', icon: Repeat, color: '#9B62FF', path: '/services/dth' },
    { id: 'broadband', label: 'Internet', icon: Wifi, color: '#64E8FF', path: '/services/broadband' },
  ];

  return (
    <div className="space-y-6 px-4">
      {/* Classic Balance */}
      <Card className="p-6 bg-white border-0 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Balance</p>
            <div className="flex items-center gap-2">
              <h2 className="text-3xl font-bold text-gray-800">
                {showBalance ? `₹${wallet.balance.toLocaleString()}` : '₹****'}
              </h2>
              <button onClick={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye className="w-5 h-5 text-gray-400" /> : <EyeOff className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">+ Add</Button>
        </div>
        <div className="flex gap-2">
          <button onClick={() => navigate('/send')} className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold text-sm">
            Send
          </button>
          <button onClick={() => navigate('/collect')} className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold text-sm">
            Request
          </button>
        </div>
      </Card>

      {/* Services Grid */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Services</h3>
        <div className="grid grid-cols-4 gap-3">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => navigate(service.path)}
                className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${service.color}20` }}>
                  <Icon className="w-6 h-6" style={{ color: service.color }} />
                </div>
                <span className="text-xs font-medium text-center">{service.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Transactions */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-800">Transactions</h3>
          <button onClick={() => navigate('/history')} className="text-xs font-semibold text-blue-600">View All</button>
        </div>
        <Card className="divide-y">
          {mockTransactions.slice(0, 4).map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tx.type === 'received' ? 'bg-green-100' : 'bg-blue-100'}`}>
                  {tx.type === 'received' ? <ArrowDownLeft className="w-5 h-5 text-green-600" /> : <ArrowUpRight className="w-5 h-5 text-blue-600" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{tx.recipient}</p>
                  <p className="text-xs text-gray-500">{tx.date}</p>
                </div>
              </div>
              <p className="text-sm font-bold text-gray-800">
                {tx.type === 'received' ? '+' : '-'}₹{tx.amount}
              </p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export const FocusedPalmLayout = ({ user, wallet, navigate, showBalance, setShowBalance }) => {
  return (
    <div className="space-y-6 px-4">
      {/* Palm Focus Hero */}
      <Card className="p-6 bg-gradient-to-br from-purple-600 to-indigo-600 text-white border-0">
        <div className="text-center mb-6">
          <div className="w-24 h-24 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-12 h-12" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Palm Authentication</h2>
          <p className="text-sm opacity-90">Secure payments with your palm</p>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/10 rounded-xl mb-4">
          <div>
            <p className="text-xs opacity-80 mb-1">Balance</p>
            <h3 className="text-2xl font-bold">
              {showBalance ? `₹${wallet.balance.toLocaleString()}` : '₹****'}
            </h3>
          </div>
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        <Button onClick={() => navigate('/device-center')} className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold">
          Manage Devices
        </Button>
      </Card>

      {/* Palm Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <button onClick={() => navigate('/scan')} className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white text-left">
          <QrCode className="w-8 h-8 mb-2" />
          <p className="font-semibold">Scan & Pay</p>
          <p className="text-xs opacity-90">With palm auth</p>
        </button>
        <button onClick={() => navigate('/send')} className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white text-left">
          <ArrowUpRight className="w-8 h-8 mb-2" />
          <p className="font-semibold">Send Money</p>
          <p className="text-xs opacity-90">Secure transfer</p>
        </button>
      </div>

      {/* Recent Activity */}
      <Card className="p-4">
        <h3 className="text-sm font-bold mb-3">Recent Palm Payments</h3>
        <div className="space-y-3">
          {mockTransactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">{tx.recipient}</p>
                <p className="text-xs text-gray-500">Paid with palm • {tx.time}</p>
              </div>
              <p className="text-sm font-bold text-gray-800">₹{tx.amount}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export const MarketplaceLayout = ({ user, wallet, navigate, showBalance, setShowBalance }) => {
  const marketplaceItems = [
    { id: 1, name: 'Amazon Gift Card', price: 500, image: '🎁', category: 'Gift Cards' },
    { id: 2, name: 'Flipkart Voucher', price: 1000, image: '🛍️', category: 'Shopping' },
    { id: 3, name: 'Netflix Premium', price: 799, image: '🎬', category: 'Entertainment' },
    { id: 4, name: 'Spotify Family', price: 299, image: '🎵', category: 'Music' },
  ];

  return (
    <div className="space-y-6 px-4">
      {/* Balance Strip */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-xl">
        <div>
          <p className="text-xs opacity-90 mb-1">Available Balance</p>
          <h3 className="text-xl font-bold">
            {showBalance ? `₹${wallet.balance.toLocaleString()}` : '₹****'}
          </h3>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowBalance(!showBalance)}>
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
          <Button className="bg-white text-orange-600 hover:bg-gray-100 text-sm px-3 py-1 h-8">
            + Add
          </Button>
        </div>
      </div>

      {/* Marketplace Categories */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-3">Shop with PalmPay</h3>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {['All', 'Gift Cards', 'Shopping', 'Entertainment', 'Travel'].map((cat) => (
            <button key={cat} className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50">
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Marketplace Grid */}
      <div className="grid grid-cols-2 gap-3">
        {marketplaceItems.map((item) => (
          <Card key={item.id} className="p-3 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="text-4xl mb-2">{item.image}</div>
            <p className="text-xs text-gray-500 mb-1">{item.category}</p>
            <h4 className="text-sm font-semibold text-gray-800 mb-2">{item.name}</h4>
            <div className="flex items-center justify-between">
              <p className="text-lg font-bold text-gray-800">₹{item.price}</p>
              <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-xs font-semibold">
                Buy
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* Special Offers */}
      <Card className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🎉</div>
          <div className="flex-1">
            <h4 className="font-bold text-gray-800 mb-1">Special Offer</h4>
            <p className="text-xs text-gray-600">Get 10% cashback on all purchases</p>
          </div>
          <button className="px-3 py-1 bg-orange-500 text-white rounded-lg text-xs font-semibold">
            Shop
          </button>
        </div>
      </Card>
    </div>
  );
};