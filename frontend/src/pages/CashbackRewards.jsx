import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft, 
  Gift,
  Coins,
  TrendingUp,
  Star,
  Trophy,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CashbackRewards = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cashback'); // 'cashback', 'rewards', 'offers'

  const cashbackHistory = [
    { id: 1, merchant: 'Cafe Coffee Day', amount: 25, date: '2 days ago', status: 'credited' },
    { id: 2, merchant: 'Mobile Recharge', amount: 10, date: '3 days ago', status: 'credited' },
    { id: 3, merchant: 'Electricity Bill', amount: 50, date: '5 days ago', status: 'pending' },
  ];

  const rewardPoints = {
    total: 2450,
    thisMonth: 350,
    level: 'Gold',
    nextLevel: 'Platinum',
    pointsToNext: 550
  };

  const offers = [
    {
      id: 1,
      title: '10% Cashback on Recharge',
      merchant: 'All Operators',
      validTill: '31 Jan 2025',
      maxCashback: 50,
      minAmount: 200,
      featured: true
    },
    {
      id: 2,
      title: 'Flat ₹100 Off on Bills',
      merchant: 'Electricity & Water',
      validTill: '28 Feb 2025',
      maxCashback: 100,
      minAmount: 1000,
      featured: false
    },
    {
      id: 3,
      title: '5% Cashback on Travel',
      merchant: 'Flights & Hotels',
      validTill: '15 Mar 2025',
      maxCashback: 500,
      minAmount: 5000,
      featured: true
    },
  ];

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
              <h1 className="text-xl font-semibold">Rewards & Cashback</h1>
              <p className="text-xs text-white/80">Earn with every transaction</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-gradient-to-br from-emerald-500 to-teal-600 border-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Coins className="w-5 h-5 text-white" />
                <span className="text-xs text-white/80 font-bold uppercase">Cashback</span>
              </div>
              <p className="text-3xl font-bold text-white">₹245</p>
              <p className="text-xs text-white/80 mt-1">Available</p>
            </Card>

            <Card className="bg-gradient-to-br from-amber-500 to-orange-600 border-0 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-white" />
                <span className="text-xs text-white/80 font-bold uppercase">Points</span>
              </div>
              <p className="text-3xl font-bold text-white">{rewardPoints.total}</p>
              <p className="text-xs text-white/80 mt-1">{rewardPoints.level} Member</p>
            </Card>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Tabs */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab('cashback')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'cashback'
                ? 'bg-white text-[#586BFF] shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Cashback
          </button>
          <button
            onClick={() => setActiveTab('rewards')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'rewards'
                ? 'bg-white text-[#586BFF] shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Rewards
          </button>
          <button
            onClick={() => setActiveTab('offers')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'offers'
                ? 'bg-white text-[#586BFF] shadow-sm'
                : 'text-gray-600'
            }`}
          >
            Offers
          </button>
        </div>

        {/* Cashback Tab */}
        {activeTab === 'cashback' && (
          <div className="space-y-4">
            <Card className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Total Cashback Earned</p>
                  <p className="text-3xl font-bold text-gray-800">₹1,245</p>
                </div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Transfer to Wallet
              </Button>
            </Card>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">Cashback History</h3>
              <div className="space-y-2">
                {cashbackHistory.map((item) => (
                  <Card key={item.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-800">{item.merchant}</p>
                        <p className="text-xs text-gray-500">{item.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">+₹{item.amount}</p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.status === 'credited' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-orange-100 text-orange-700'
                        }`}>
                          {item.status === 'credited' ? 'Credited' : 'Pending'}
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="space-y-4">
            <Card className="p-5 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-amber-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 mb-1">Your Level</p>
                  <p className="text-2xl font-bold text-gray-800">{rewardPoints.level}</p>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                    <div 
                      className="h-full bg-amber-500 rounded-full"
                      style={{ width: `${(rewardPoints.total / (rewardPoints.total + rewardPoints.pointsToNext)) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {rewardPoints.pointsToNext} points to {rewardPoints.nextLevel}
                  </p>
                </div>
              </div>
            </Card>

            <div>
              <h3 className="font-bold text-gray-800 mb-3">How to Earn Points</h3>
              <div className="space-y-2">
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Coins className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Every ₹100 Spent = 10 Points</p>
                      <p className="text-xs text-gray-500">On all transactions</p>
                    </div>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Referral Bonus</p>
                      <p className="text-xs text-gray-500">500 points per successful referral</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        )}

        {/* Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-3">
            {offers.map((offer) => (
              <Card key={offer.id} className={`p-5 ${offer.featured ? 'border-2 border-[#586BFF]' : ''}`}>
                {offer.featured && (
                  <div className="flex items-center gap-1 mb-2">
                    <Sparkles className="w-4 h-4 text-[#586BFF]" />
                    <span className="text-xs font-bold text-[#586BFF] uppercase">Featured Offer</span>
                  </div>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{offer.title}</h3>
                    <p className="text-sm text-gray-600">{offer.merchant}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center flex-shrink-0">
                    <Gift className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>Max ₹{offer.maxCashback}</span>
                  <span>•</span>
                  <span>Min ₹{offer.minAmount}</span>
                  <span>•</span>
                  <span>Valid till {offer.validTill}</span>
                </div>
                <Button className="w-full bg-[#586BFF] h-10">
                  Use Offer
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CashbackRewards;
