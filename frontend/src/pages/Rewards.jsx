import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { ArrowLeft, Gift, Star, Trophy, Sparkles, ChevronRight, Copy } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import Logo from '../components/Logo';

const Rewards = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [points, setPoints] = useState(2450);
  const [tier] = useState('Gold');

  const offers = [
    {
      id: '1',
      title: '10% Cashback on Bills',
      description: 'Pay any utility bill and get 10% cashback up to ₹100',
      code: 'BILL10',
      validTill: '31 Jan 2025',
      category: 'bills',
      color: '#586BFF'
    },
    {
      id: '2',
      title: 'Flat ₹50 on Recharge',
      description: 'Get ₹50 cashback on mobile recharge of ₹500 or more',
      code: 'MOBILE50',
      validTill: '15 Feb 2025',
      category: 'recharge',
      color: '#9B62FF'
    },
    {
      id: '3',
      title: 'Send Money & Earn',
      description: 'Send ₹1000+ to any UPI ID and earn 100 reward points',
      code: 'SEND100',
      validTill: '28 Feb 2025',
      category: 'transfer',
      color: '#64E8FF'
    },
  ];

  const achievements = [
    { id: '1', name: 'Early Adopter', icon: Trophy, unlocked: true, points: 500 },
    { id: '2', name: 'Transaction Master', icon: Star, unlocked: true, points: 1000 },
    { id: '3', name: 'Bill Wizard', icon: Sparkles, unlocked: false, points: 2500 },
  ];

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code Copied!",
      description: `${code} copied to clipboard`
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white pb-20">
      {/* Header */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/home')} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-[#64E8FF]" />
              <h1 className="text-xl font-semibold">Rewards & Offers</h1>
            </div>
            <p className="text-sm text-white/60 mt-1">Earn points, unlock benefits</p>
          </div>
        </div>
      </div>

      {/* Points Card */}
      <div className="px-5 py-6">
        <Card className="bg-gradient-to-br from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border-[#586BFF]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">PalmPay Points</p>
              <h2 className="text-5xl font-bold text-white">{points.toLocaleString()}</h2>
              <p className="text-sm text-[#64E8FF] mt-2 font-medium">{tier} Member</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-[#64E8FF]/20 rounded-full flex items-center justify-center">
                <Trophy className="w-10 h-10 text-[#64E8FF]" />
              </div>
            </div>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-[#586BFF] to-[#64E8FF]"
              style={{ width: '65%' }}
            ></div>
          </div>
          <p className="text-xs text-white/60">550 more points to reach Platinum tier</p>
        </Card>
      </div>

      {/* Active Offers */}
      <div className="px-5 mb-6">
        <h3 className="text-lg font-bold text-white mb-3">Active Offers</h3>
        <div className="space-y-3">
          {offers.map((offer) => (
            <Card 
              key={offer.id} 
              className="bg-white/3 backdrop-blur-lg border-white/10 p-4"
            >
              <div className="flex items-start gap-4">
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${offer.color}20` }}
                >
                  <Gift className="w-6 h-6" style={{ color: offer.color }} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-white mb-1">{offer.title}</h4>
                  <p className="text-sm text-white/60 mb-2">{offer.description}</p>
                  <div className="flex items-center gap-2">
                    <div className="bg-white/10 px-3 py-1 rounded-full">
                      <code className="text-xs text-[#64E8FF] font-mono">{offer.code}</code>
                    </div>
                    <button 
                      onClick={() => copyCode(offer.code)}
                      className="p-1 hover:bg-white/10 rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                  <p className="text-xs text-white/40 mt-2">Valid till {offer.validTill}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-5 mb-6">
        <h3 className="text-lg font-bold text-white mb-3">Achievements</h3>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <Card 
                key={achievement.id}
                className={`p-4 flex flex-col items-center text-center ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-br from-[#586BFF]/20 to-[#9B62FF]/20 border-[#586BFF]/30' 
                    : 'bg-white/3 border-white/10 opacity-50'
                }`}
              >
                <Icon className="w-8 h-8 mb-2 text-[#64E8FF]" />
                <p className="text-xs font-semibold text-white mb-1">{achievement.name}</p>
                <p className="text-xs text-white/60">+{achievement.points} pts</p>
                {achievement.unlocked && (
                  <div className="mt-2 text-xs text-green-400">Unlocked</div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Referral */}
      <div className="px-5">
        <Card className="bg-gradient-to-r from-[#586BFF]/10 to-[#9B62FF]/10 border-[#586BFF]/30 p-5">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-12 h-12 bg-[#64E8FF]/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-6 h-6 text-[#64E8FF]" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1">Refer & Earn ₹100</h4>
              <p className="text-sm text-white/60">Invite friends and earn ₹100 for each successful referral</p>
            </div>
          </div>
          <Button className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb]">
            Share Referral Code
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Rewards;