import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { 
  ArrowLeft, HelpCircle, MessageCircle, Phone, Mail, 
  FileText, AlertCircle, Send, Clock, CheckCircle2
} from 'lucide-react';
import { useToast } from '../hooks/use-toast';

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const faqs = [
    {
      id: '1',
      question: 'How do I register my palm at a PalmPe device?',
      answer: 'Visit any PalmPe device, enter your phone number, place your palm on the scanner, and receive a 6-digit code to activate in the app.'
    },
    {
      id: '2',
      question: 'Is my biometric data stored on my phone?',
      answer: 'No. Your palm biometric data never leaves the PalmPe device. Only encrypted tokens are stored.'
    },
    {
      id: '3',
      question: 'How do I add money to Quick Wallet?',
      answer: 'Go to Quick Wallet, tap "Top Up", enter amount (max ₹2000), and select your payment method.'
    },
    {
      id: '4',
      question: 'What should I do if a transaction fails?',
      answer: 'Check your transaction history. If amount was deducted but transaction failed, raise a dispute within 24 hours.'
    },
  ];

  const tickets = [
    {
      id: 'TKT-001',
      subject: 'Payment not received',
      status: 'resolved',
      date: '2025-01-25',
      category: 'transaction'
    },
    {
      id: 'TKT-002',
      subject: 'Palm registration issue',
      status: 'in_progress',
      date: '2025-01-27',
      category: 'biometric'
    },
  ];

  const handleSubmitTicket = () => {
    if (!subject || !description) {
      toast({
        title: "Incomplete Form",
        description: "Please fill all fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Ticket Created!",
      description: "We'll respond within 24 hours"
    });
    setShowTicketDialog(false);
    setSubject('');
    setDescription('');
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'resolved': return { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' };
      case 'in_progress': return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' };
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
              <HelpCircle className="w-5 h-5 text-[#64E8FF]" />
              <h1 className="text-xl font-semibold">Help & Support</h1>
            </div>
            <p className="text-sm text-white/60 mt-1">We're here to help</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-5 py-6">
        <div className="grid grid-cols-2 gap-3">
          <Card 
            className="bg-white/3 backdrop-blur-lg border-white/10 p-4 cursor-pointer hover:border-[#586BFF]/50 transition-all"
          >
            <MessageCircle className="w-8 h-8 text-[#586BFF] mb-2" />
            <p className="font-semibold text-white text-sm">Live Chat</p>
            <p className="text-xs text-white/60 mt-1">Available 24/7</p>
          </Card>
          <Card 
            onClick={() => setShowTicketDialog(true)}
            className="bg-white/3 backdrop-blur-lg border-white/10 p-4 cursor-pointer hover:border-[#9B62FF]/50 transition-all"
          >
            <FileText className="w-8 h-8 text-[#9B62FF] mb-2" />
            <p className="font-semibold text-white text-sm">Raise Ticket</p>
            <p className="text-xs text-white/60 mt-1">Get help via email</p>
          </Card>
        </div>
      </div>

      {/* Contact Info */}
      <div className="px-5 mb-6">
        <Card className="bg-gradient-to-r from-[#586BFF]/10 to-[#9B62FF]/10 border-[#586BFF]/30 p-4">
          <h3 className="font-semibold text-white mb-3">Contact Us</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-[#64E8FF]" />
              <div>
                <p className="text-sm text-white font-medium">1800-123-4567</p>
                <p className="text-xs text-white/60">Toll-free helpline</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#9B62FF]" />
              <div>
                <p className="text-sm text-white font-medium">support@palmpay.in</p>
                <p className="text-xs text-white/60">Email support</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* My Tickets */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold text-white">My Tickets</h3>
          <Button
            onClick={() => setShowTicketDialog(true)}
            variant="outline"
            className="border-[#586BFF]/30 text-[#586BFF] hover:bg-[#586BFF]/10 text-xs"
          >
            New Ticket
          </Button>
        </div>
        <div className="space-y-3">
          {tickets.map((ticket) => {
            const colors = getStatusColor(ticket.status);
            return (
              <Card key={ticket.id} className="bg-white/3 backdrop-blur-lg border-white/10 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-white mb-1">{ticket.subject}</p>
                    <p className="text-xs text-white/60">{ticket.id} • {ticket.date}</p>
                  </div>
                  <div className={`${colors.bg} border ${colors.border} px-2 py-1 rounded-full`}>
                    <span className={`text-xs font-medium ${colors.text} capitalize`}>
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* FAQs */}
      <div className="px-5">
        <h3 className="text-lg font-bold text-white mb-3">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <Card key={faq.id} className="bg-white/3 backdrop-blur-lg border-white/10 p-4">
              <h4 className="font-semibold text-white mb-2 text-sm">{faq.question}</h4>
              <p className="text-sm text-white/60">{faq.answer}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Raise Ticket Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="bg-[#1a1f3a] border-[#586BFF]/30 text-white">
          <DialogHeader>
            <DialogTitle>Raise Support Ticket</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Subject</label>
              <Input
                type="text"
                placeholder="Brief description of issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-white/5 border-[#586BFF]/30 text-white"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-white/80 mb-2 block">Description</label>
              <Textarea
                placeholder="Provide detailed information about your issue"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="bg-white/5 border-[#586BFF]/30 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-white hover:bg-white/10"
                onClick={() => setShowTicketDialog(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb]"
                onClick={handleSubmitTicket}
              >
                <Send className="w-4 h-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Support;