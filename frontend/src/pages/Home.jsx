import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Smartphone, 
  Receipt, 
  Building2, 
  Wallet,
  Shield,
  Coins,
  Bell,
  ChevronRight,
  QrCode,
  Eye,
  EyeOff
} from 'lucide-react';
import { mockUser, mockTransactions, mockOffers, quickActions } from '../mockData';

const Home = () => {
  const [showBalance, setShowBalance] = useState(true);

  const getIcon = (iconName) => {
    const icons = {
      ArrowUpRight: ArrowUpRight,
      ArrowDownLeft: ArrowDownLeft,
      Smartphone: Smartphone,
      Receipt: Receipt,
      Building2: Building2,
      Wallet: Wallet,
      Shield: Shield,
      Coins: Coins
    };
    const IconComponent = icons[iconName];
    return <IconComponent className="w-6 h-6" />;
  };

  const getStatusColor = (type) => {
    return type === 'received' ? 'text-green-600' : 'text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
              {mockUser.name.charAt(0)}
            </div>
            <div>
              <h2 className="font-semibold text-lg">{mockUser.name}</h2>
              <p className="text-purple-200 text-sm">{mockUser.upiId}</p>
            </div>
          </div>
          <button className="relative p-2 hover:bg-purple-500 rounded-full transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Wallet Balance */}
        <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-200 text-sm mb-1">Wallet Balance</p>
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
            <Button className="bg-white text-purple-600 hover:bg-purple-50 font-semibold">
              Add Money
            </Button>
          </div>
        </Card>
      </div>

      {/* Floating QR Button */}
      <div className="flex justify-center -mt-7">
        <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full p-5 shadow-2xl hover:shadow-purple-500/50 transition-all hover:scale-105">
          <QrCode className="w-8 h-8" />
        </button>
      </div>

      <div className="px-4 mt-8">
        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-purple-50 transition-colors group"
              >
                <div 
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: action.color }}
                >
                  {getIcon(action.icon)}
                </div>
                <span className="text-xs text-gray-700 text-center font-medium leading-tight">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Offers Banner */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Offers for You</h3>
            <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {mockOffers.map((offer) => (
              <Card key={offer.id} className="min-w-[280px] bg-gradient-to-br from-purple-100 to-pink-100 border-0 p-4 cursor-pointer hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-gray-800 mb-1">{offer.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{offer.description}</p>
                <p className="text-xs text-purple-600 font-medium">Valid till {offer.validTill}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
            <button className="text-purple-600 text-sm font-medium flex items-center gap-1">
              View All <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <Card className="divide-y">
            {mockTransactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {transaction.type === 'received' ? 
                      <ArrowDownLeft className="w-5 h-5" /> : 
                      <ArrowUpRight className="w-5 h-5" />
                    }
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.recipient}</p>
                    <p className="text-xs text-gray-500">{transaction.date} • {transaction.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${getStatusColor(transaction.type)}`}>
                    {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount}
                  </p>
                  <p className="text-xs text-green-600 capitalize">{transaction.status}</p>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;