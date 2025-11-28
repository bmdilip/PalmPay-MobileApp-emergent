import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { 
  ArrowLeft, Shield, AlertTriangle, Ban, Eye, Lock, 
  Bell, CheckCircle2, XCircle, Info, UserX, Phone
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const SecurityCenter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [safetyScore] = useState(92);
  const [showBlockDialog, setShowBlockDialog] = useState(false);
  const [blockNumber, setBlockNumber] = useState('');

  const [blockedContacts] = useState([
    { id: '1', number: '+91 98765 xxxxx', reason: 'Reported as fraud', date: '2025-01-20' },
    { id: '2', number: '+91 87654 xxxxx', reason: 'Suspicious activity', date: '2025-01-15' },
  ]);

  const [securityAlerts] = useState([
    {
      id: '1',
      type: 'warning',
      title: 'Payment to New Number',
      description: 'You sent ₹5000 to a number not in your contacts',
      time: '2 hours ago',
      status: 'reviewed'
    },
    {
      id: '2',
      type: 'blocked',
      title: 'Blocked Suspicious Transaction',
      description: 'Transaction to known scam number was automatically blocked',
      time: '1 day ago',
      status: 'blocked'
    },
    {
      id: '3',
      type: 'info',
      title: 'Security Check Passed',
      description: 'Your recent payment to Cafe Coffee Day was verified safe',
      time: '2 days ago',
      status: 'safe'
    },
  ]);

  const handleBlockNumber = () => {
    if (!blockNumber || blockNumber.length < 10) {
      toast({
        title: "Invalid Number",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Number Blocked",
      description: `${blockNumber} has been added to your block list`
    });
    setShowBlockDialog(false);
    setBlockNumber('');
  };

  const getAlertIcon = (type) => {
    switch(type) {
      case 'warning': return AlertTriangle;
      case 'blocked': return XCircle;
      case 'info': return CheckCircle2;
      default: return Info;
    }
  };

  const getAlertColor = (type) => {
    switch(type) {
      case 'warning': return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' };
      case 'blocked': return { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' };
      case 'info': return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' };
      default: return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' };
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white pb-20">
      {/* Header */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/profile')} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#64E8FF]" />
              <h1 className="text-xl font-semibold">Security Center</h1>
            </div>
            <p className="text-sm text-white/60 mt-1">PalmPay Protect</p>
          </div>
        </div>
      </div>

      {/* Safety Score */}
      <div className="px-5 py-6">
        <Card className="bg-gradient-to-br from-[#586BFF]/20 to-[#9B62FF]/20 backdrop-blur-xl border-[#586BFF]/30 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/60 text-sm mb-1">Your Safety Score</p>
              <h2 className="text-5xl font-bold text-white">{safetyScore}<span className="text-2xl text-white/60">/100</span></h2>
              <p className="text-sm text-[#64E8FF] mt-2 font-medium">Excellent Security</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-xl opacity-40 animate-pulse"></div>
              <div className="relative w-20 h-20 bg-[#64E8FF]/20 rounded-full flex items-center justify-center">
                <Shield className="w-10 h-10 text-[#64E8FF]" />
              </div>
            </div>
          </div>
          <p className="text-xs text-white/60">
            Based on transaction patterns, device security, and fraud prevention settings
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="px-5 mb-6">
        <h3 className="text-lg font-bold text-white mb-3">Security Tools</h3>
        <div className="grid grid-cols-2 gap-3">
          <Card 
            onClick={() => setShowBlockDialog(true)}
            className="bg-white/3 backdrop-blur-lg border-white/10 p-4 cursor-pointer hover:border-[#586BFF]/50 transition-all"
          >
            <Ban className="w-8 h-8 text-[#586BFF] mb-2" />
            <p className="font-semibold text-white text-sm">Block Number</p>
            <p className="text-xs text-white/60 mt-1">Add to block list</p>
          </Card>
          <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-4 cursor-pointer hover:border-[#586BFF]/50 transition-all">
            <Eye className="w-8 h-8 text-[#9B62FF] mb-2" />
            <p className="font-semibold text-white text-sm">Privacy Settings</p>
            <p className="text-xs text-white/60 mt-1">Manage visibility</p>
          </Card>
          <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-4 cursor-pointer hover:border-[#586BFF]/50 transition-all">
            <Lock className="w-8 h-8 text-[#64E8FF] mb-2" />
            <p className="font-semibold text-white text-sm">App Lock</p>
            <p className="text-xs text-white/60 mt-1">Biometric security</p>
          </Card>
          <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-4 cursor-pointer hover:border-[#586BFF]/50 transition-all">
            <Bell className="w-8 h-8 text-[#586BFF] mb-2" />
            <p className="font-semibold text-white text-sm">Alerts</p>
            <p className="text-xs text-white/60 mt-1">Transaction alerts</p>
          </Card>
        </div>
      </div>

      {/* Security Alerts */}
      <div className="px-5 mb-6">
        <h3 className="text-lg font-bold text-white mb-3">Recent Security Alerts</h3>
        <div className="space-y-3">
          {securityAlerts.map((alert) => {
            const Icon = getAlertIcon(alert.type);
            const colors = getAlertColor(alert.type);
            return (
              <Card key={alert.id} className={`${colors.bg} border ${colors.border} p-4`}>
                <div className="flex items-start gap-3">
                  <Icon className={`w-5 h-5 ${colors.text} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <p className={`font-semibold ${colors.text} text-sm`}>{alert.title}</p>
                    <p className="text-white/80 text-xs mt-1">{alert.description}</p>
                    <p className="text-white/40 text-xs mt-2">{alert.time}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Blocked Contacts */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">Blocked Contacts</h3>
          <Button
            onClick={() => setShowBlockDialog(true)}
            variant="outline"
            className="border-[#586BFF]/30 text-[#586BFF] hover:bg-[#586BFF]/10 text-xs"
          >
            <Ban className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
        <Card className="bg-white/3 backdrop-blur-lg border-white/10 divide-y divide-white/10">
          {blockedContacts.length > 0 ? (
            blockedContacts.map((contact) => (
              <div key={contact.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                    <UserX className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{contact.number}</p>
                    <p className="text-xs text-white/60">{contact.reason}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="text-white/60 hover:text-white text-xs"
                >
                  Unblock
                </Button>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-white/60">
              <Ban className="w-12 h-12 mx-auto mb-2 opacity-40" />
              <p className="text-sm">No blocked contacts</p>
            </div>
          )}
        </Card>
      </div>

      {/* Security Tips */}
      <div className="px-5">
        <h3 className="text-lg font-bold text-white mb-3">Security Tips</h3>
        <div className="space-y-3">
          <Card className="bg-[#586BFF]/10 border-[#586BFF]/30 p-4">
            <p className="text-sm text-white/80">
              ⚠️ <span className="font-semibold">Never share OTP</span> with anyone, including customer support.
            </p>
          </Card>
          <Card className="bg-[#9B62FF]/10 border-[#9B62FF]/30 p-4">
            <p className="text-sm text-white/80">
              🔒 <span className="font-semibold">Verify merchant details</span> before making large payments.
            </p>
          </Card>
          <Card className="bg-[#64E8FF]/10 border-[#64E8FF]/30 p-4">
            <p className="text-sm text-white/80">
              📱 <span className="font-semibold">Enable app lock</span> for additional security.
            </p>
          </Card>
        </div>
      </div>

      {/* Block Number Dialog */}
      <Dialog open={showBlockDialog} onOpenChange={setShowBlockDialog}>
        <DialogContent className="bg-[#1a1f3a] border-[#586BFF]/30 text-white">
          <DialogHeader>
            <DialogTitle>Block Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-white/60 mb-4">
                Blocked contacts cannot send you payment requests or money.
              </p>
              <Input
                type="tel"
                placeholder="Enter phone number or UPI ID"
                value={blockNumber}
                onChange={(e) => setBlockNumber(e.target.value)}
                className="bg-white/5 border-[#586BFF]/30 text-white"
              />
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => setShowBlockDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb]"
                onClick={handleBlockNumber}
              >
                <Ban className="w-4 h-4 mr-2" />
                Block
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SecurityCenter;