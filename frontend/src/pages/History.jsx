import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Filter, Download, Search, X } from 'lucide-react';
import { mockTransactions } from '../mockData';
import { SkeletonTransaction } from '../components/Skeleton';
import { motion, AnimatePresence } from 'framer-motion';

const History = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const filteredTransactions = mockTransactions
    .filter(t => activeTab === 'all' || t.type === activeTab)
    .filter(t => 
      searchQuery === '' || 
      t.recipient?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.amount?.toString().includes(searchQuery)
    );

  const getCategoryBadge = (category) => {
    const colors = {
      transfer: 'bg-blue-100 text-blue-700',
      recharge: 'bg-orange-100 text-orange-700',
      billpay: 'bg-green-100 text-green-700',
      shopping: 'bg-purple-100 text-purple-700',
      subscription: 'bg-pink-100 text-pink-700',
      food: 'bg-yellow-100 text-yellow-700'
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-purple-500 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Transaction History</h1>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-purple-500 rounded-full transition-colors">
              <Filter className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-purple-500 rounded-full transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="all" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">All</TabsTrigger>
            <TabsTrigger value="sent" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Sent</TabsTrigger>
            <TabsTrigger value="received" className="data-[state=active]:bg-purple-600 data-[state=active]:text-white">Received</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            <Card className="divide-y">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="p-4 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          transaction.type === 'received' ? 'bg-green-100 text-green-600' : 'bg-purple-100 text-purple-600'
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
                          <p className="text-sm text-gray-500">{transaction.upiId}</p>
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

export default History;