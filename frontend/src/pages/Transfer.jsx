import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { ArrowLeft, Search, User, Phone, AtSign, ChevronRight } from 'lucide-react';
import { mockContacts, mockUser } from '../mockData';
import { useToast } from '../hooks/use-toast';

const Transfer = () => {
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
      description: `₹${amount} sent to ${selectedContact?.name}`,
    });
    
    setShowPaymentDialog(false);
    setAmount('');
    setSelectedContact(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <button className="p-2 hover:bg-purple-500 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Send Money</h1>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by name, phone or UPI ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white text-gray-800 border-0 h-12"
          />
        </div>
      </div>

      <div className="px-4 mt-6">
        {/* Transfer Options */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Phone className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Phone Number</span>
          </Card>
          <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <AtSign className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">UPI ID</span>
          </Card>
          <Card className="p-4 flex flex-col items-center gap-2 cursor-pointer hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Self Transfer</span>
          </Card>
        </div>

        {/* Contacts List */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Frequent Contacts</h3>
          <Card className="divide-y">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => handleContactSelect(contact)}
                  className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{contact.name}</p>
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
              <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
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

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPaymentDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
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

export default Transfer;