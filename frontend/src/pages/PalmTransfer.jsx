import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ArrowLeft, Search, User, Phone, AtSign, ChevronRight } from 'lucide-react';
import { mockContacts, mockUser } from '../mockDataPalmPay';
import { useToast } from '../hooks/use-toast';

const PalmTransfer = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [amount, setAmount] = useState('');
  const { toast } = useToast();

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery) ||
    contact.upiId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
    setShowPaymentDialog(true);
  };

  const handleSendMoney = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) > mockUser.walletBalance) {
      toast({
        title: "Insufficient Balance",
        description: "You don't have enough balance",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Payment Successful!",
      description: `₹${amount} sent to ${selectedContact?.name} via Palm Biometric`,
    });
    
    setShowPaymentDialog(false);
    setAmount('');
    setSelectedContact(null);
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={() => navigate('/home')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold">Send Money</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, phone or UPI ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 bg-white/10 text-white border-white/20 h-12 placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="px-5 mt-6">
        {/* Transfer Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#586BFF]/10 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-[#586BFF]" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Phone Number</span>
          </Card>
          <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#9B62FF]/10 rounded-full flex items-center justify-center">
              <AtSign className="w-6 h-6 text-[#9B62FF]" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">UPI ID</span>
          </Card>
          <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#64E8FF]/10 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-[#64E8FF]" />
            </div>
            <span className="text-xs font-medium text-gray-700 text-center">Self Transfer</span>
          </Card>
        </div>

        {/* Contacts List */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3">Frequent Contacts</h3>
          <Card className="divide-y">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{contact.name}</p>
                        {contact.hasPalmId && (
                          <div className="bg-[#586BFF]/10 px-2 py-0.5 rounded-full border border-[#586BFF]/30">
                            <span className="text-xs text-[#586BFF] font-medium">PalmPay</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{contact.upiId}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No contacts found
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Send Money</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#586BFF]/10 to-[#9B62FF]/10 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  {selectedContact.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{selectedContact.name}</p>
                  <p className="text-sm text-gray-500">{selectedContact.upiId}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Enter Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-semibold text-gray-700">₹</span>
                  <Input
                    type="number"
                    placeholder="0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-10 text-2xl font-semibold h-14 text-center"
                  />
                </div>
              </div>

              {selectedContact.hasPalmId && (
                <div className="p-3 bg-[#586BFF]/10 rounded-lg border border-[#586BFF]/30">
                  <p className="text-sm text-gray-700 font-medium">PalmPay transfer available</p>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPaymentDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb]"
                  onClick={handleSendMoney}
                >
                  Send Money
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PalmTransfer;