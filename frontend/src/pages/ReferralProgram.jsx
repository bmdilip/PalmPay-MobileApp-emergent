import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  ArrowLeft, 
  Gift,
  Share2,
  Copy,
  Check,
  Users,
  TrendingUp,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ReferralProgram = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const referralCode = 'ARJUN2025';
  const referralLink = `https://palmpay.in/ref/${referralCode}`;
  
  const stats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarned: 800,
    pendingRewards: 200
  };

  const mockReferrals = [
    { name: 'Priya Sharma', status: 'completed', reward: 100, date: '2 days ago' },
    { name: 'Ravi Kumar', status: 'completed', reward: 100, date: '5 days ago' },
    { name: 'Neha Gupta', status: 'pending', reward: 50, date: '1 week ago' },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Join PalmPay',
        text: `Join PalmPay using my referral code ${referralCode} and get ₹100! Download now:`,
        url: referralLink
      });
    } else {
      handleCopyLink();
    }
  };

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
              <h1 className="text-xl font-semibold">Referral Program</h1>
              <p className="text-xs text-white/80">Invite friends & earn rewards</p>
            </div>
          </div>

          {/* Reward Card */}
          <Card className="bg-gradient-to-r from-emerald-500 to-teal-600 border-0 p-6 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="relative z-10 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Gift className="w-6 h-6" />
                <span className="text-sm font-bold uppercase tracking-wide">Limited Offer</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Invite & Earn ₹100</h2>
              <p className="text-white/90 text-sm mb-4">
                For every friend who joins and makes their first transaction
              </p>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-white/80 text-xs mb-1">Your Code</p>
                  <p className="font-mono font-bold text-xl tracking-wider">{referralCode}</p>
                </div>
                <Button 
                  onClick={handleCopyLink}
                  className="bg-white text-emerald-600 hover:bg-gray-100"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Share Options */}
        <Card className="p-5">
          <h3 className="font-bold text-gray-800 mb-4">Share Your Link</h3>
          
          <div className="p-3 bg-gray-50 rounded-lg mb-4 break-all">
            <p className="text-sm text-gray-600 font-mono">{referralLink}</p>
          </div>

          <Button 
            onClick={handleShare}
            className="w-full bg-[#586BFF] h-12 font-semibold"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Referral Link
          </Button>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.totalReferrals}</p>
            <p className="text-xs text-gray-500">Total Invites</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">₹{stats.totalEarned}</p>
            <p className="text-xs text-gray-500">Total Earned</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">{stats.successfulReferrals}</p>
            <p className="text-xs text-gray-500">Successful</p>
          </Card>

          <Card className="p-4 text-center">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-2xl font-bold text-gray-800">₹{stats.pendingRewards}</p>
            <p className="text-xs text-gray-500">Pending</p>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="p-5">
          <h3 className="font-bold text-gray-800 mb-4">How It Works</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-medium text-gray-800">Share Your Code</p>
                <p className="text-sm text-gray-600">Send your referral link to friends</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-medium text-gray-800">Friend Signs Up</p>
                <p className="text-sm text-gray-600">They create account using your code</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-[#586BFF] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-medium text-gray-800">First Transaction</p>
                <p className="text-sm text-gray-600">They make their first payment</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                ₹
              </div>
              <div>
                <p className="font-medium text-gray-800">You Both Earn!</p>
                <p className="text-sm text-gray-600">₹100 for you, ₹100 for them</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Referral History */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Referral History</h3>
          <div className="space-y-3">
            {mockReferrals.map((referral, idx) => (
              <Card key={idx} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{referral.name}</p>
                    <p className="text-xs text-gray-500">{referral.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">₹{referral.reward}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      referral.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {referral.status === 'completed' ? 'Earned' : 'Pending'}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralProgram;
