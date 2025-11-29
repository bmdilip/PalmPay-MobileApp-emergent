import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter, Download, Hand, Smartphone } from 'lucide-react';
import { mockTransactions } from '../mockDataPalmPay';
import { LayoutSwitcher, ThreeDHoverCard, GlowBorderCard } from '../components/premium';
import { fadeInUp, staggerContainer, staggerItem } from '../lib/animations';

const PalmHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [filterType, setFilterType] = useState('all'); // New comprehensive filter
  const [showFilters, setShowFilters] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Transactions' },
    { value: 'upi', label: 'UPI' },
    { value: 'device', label: 'Device Auth' },
    { value: 'wallet', label: 'Wallet' },
    { value: 'billpay', label: 'Bill Payments' },
    { value: 'recharge', label: 'Recharge' },
    { value: 'rewards', label: 'Rewards' },
    { value: 'mandates', label: 'Auto-Pay' },
    { value: 'circlepay', label: 'CirclePay' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending' },
    { value: 'offline', label: 'Offline Queue' },
  ];

  const filteredTransactions = mockTransactions.filter(t => {
    if (activeTab !== 'all' && t.type !== activeTab) return false;
    if (filterType === 'all') return true;
    if (filterType === 'device' && t.method.includes('Palm')) return true;
    if (filterType === 'upi' && t.method.includes('UPI')) return true;
    if (filterType === 'wallet' && t.method.includes('Wallet')) return true;
    if (filterType === 'billpay' && t.category === 'billpay') return true;
    if (filterType === 'recharge' && t.category === 'recharge') return true;
    if (filterType === 'failed' && t.status === 'failed') return true;
    if (filterType === 'pending' && t.status === 'pending') return true;
    if (filterType === 'offline' && t.status === 'offline') return true;
    return false;
  });

  const getCategoryBadge = (category) => {
    const colors = {
      palm2qr: 'bg-[#586BFF]/10 text-[#586BFF]',
      pos: 'bg-[#9B62FF]/10 text-[#9B62FF]',
      transfer: 'bg-[#64E8FF]/10 text-[#64E8FF]',
      billpay: 'bg-green-100 text-green-700',
      shopping: 'bg-purple-100 text-purple-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getMethodIcon = (method) => {
    if (method.includes('Palm')) return <Hand className="w-4 h-4" />;
    return <Smartphone className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/home')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-xl font-semibold">Transaction History</h1>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        {/* Filter Dropdown */}
        {showFilters && (
          <Card className="p-4 mb-4">
            <h3 className="font-bold text-gray-800 mb-3">Filter Transactions</h3>
            <div className="grid grid-cols-2 gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    setFilterType(option.value);
                    setShowFilters(false);
                  }}
                  className={`p-2 rounded-lg text-sm transition-all ${
                    filterType === option.value
                      ? 'bg-[#586BFF] text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </Card>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#586BFF] data-[state=active]:to-[#9B62FF] data-[state=active]:text-white"
            >
              All
            </TabsTrigger>
            <TabsTrigger 
              value="sent" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#586BFF] data-[state=active]:to-[#9B62FF] data-[state=active]:text-white"
            >
              Sent
            </TabsTrigger>
            <TabsTrigger 
              value="received" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#586BFF] data-[state=active]:to-[#9B62FF] data-[state=active]:text-white"
            >
              Received
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <Card className="divide-y">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          transaction.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-[#586BFF]/10 text-[#586BFF]'
                        }`}>
                          {transaction.type === 'received' ? 
                            <ArrowDownLeft className="w-5 h-5" /> : 
                            <ArrowUpRight className="w-5 h-5" />
                          }
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-gray-800">{transaction.recipient}</p>
                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryBadge(transaction.category)}`}>
                              {transaction.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-1">
                            {getMethodIcon(transaction.method)}
                            <p className="text-sm text-gray-600">{transaction.method}</p>
                          </div>
                          {transaction.location && (
                            <p className="text-xs text-gray-400">{transaction.location}</p>
                          )}
                          <p className="text-xs text-gray-400 mt-1">{transaction.date} at {transaction.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold text-lg ${
                          transaction.type === 'received' ? 'text-green-600' : 'text-gray-700'
                        }`}>
                          {transaction.type === 'received' ? '+' : '-'}₹{transaction.amount}
                        </p>
                        <p className="text-xs text-green-600 capitalize mt-1">{transaction.status}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  No transactions found
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PalmHistory;