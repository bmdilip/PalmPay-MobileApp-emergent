import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { 
  ArrowLeft, 
  Phone,
  AtSign,
  Building2,
  User,
  Search,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockContacts } from '../mockDataPalmPay';
import ServiceReceipt from '../components/ServiceReceipt';
import { LoadingSpinner } from '../components/StateComponents';

const SendMoney = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Method, 2: Details, 3: Amount, 4: Confirm, 5: Receipt
  const [method, setMethod] = useState(null); // 'phone', 'upi', 'bank', 'self'
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [formData, setFormData] = useState({
    recipient: '',
    upiId: '',
    bankAccount: '',
    ifsc: '',
    amount: '',
    note: ''
  });

  const methods = [
    { id: 'phone', label: 'Phone Number', icon: Phone, desc: 'Send via mobile number' },
    { id: 'upi', label: 'UPI ID', icon: AtSign, desc: 'Send to UPI address' },
    { id: 'bank', label: 'Bank Account', icon: Building2, desc: 'Transfer to bank account' },
    { id: 'self', label: 'Self Transfer', icon: User, desc: 'Transfer to your account' },
  ];

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const handleMethodSelect = (methodId) => {
    setMethod(methodId);
    setStep(2);
  };

  const handleContactSelect = (contact) => {
    setFormData({ ...formData, recipient: contact.name, upiId: contact.upiId });
    setStep(3);
  };

  const handleProceed = () => {
    if (step === 2) {
      if (method === 'phone' && !formData.recipient) {
        alert('Please select a contact or enter phone number');
        return;
      }
      if (method === 'upi' && !formData.upiId) {
        alert('Please enter UPI ID');
        return;
      }
      if (method === 'bank' && (!formData.bankAccount || !formData.ifsc)) {
        alert('Please enter bank details');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!formData.amount || parseFloat(formData.amount) < 1) {
        alert('Please enter a valid amount');
        return;
      }
      setStep(4);
    }
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      const receiptData = {
        transactionId: `TXN${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: parseFloat(formData.amount),
        serviceName: 'Money Transfer',
        title: 'Payment Successful',
        details: [
          { label: 'To', value: formData.recipient || formData.upiId || 'Bank Account' },
          { label: 'Method', value: method === 'phone' ? 'Phone Number' : method === 'upi' ? 'UPI' : method === 'bank' ? 'Bank Transfer' : 'Self Transfer' },
          { label: 'Note', value: formData.note || 'No note' }
        ]
      };
      setReceipt(receiptData);
      setLoading(false);
      setStep(5);
    }, 2000);
  };

  if (step === 5 && receipt) {
    return <ServiceReceipt {...receipt} />;
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#0A0F1F] via-[#1a1f3a] to-[#0A0F1F] text-white px-5 py-6 rounded-b-[2.5rem] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#586BFF] rounded-full blur-3xl opacity-20 animate-pulse"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-xl font-semibold">Send Money</h1>
              <p className="text-xs text-white/80">
                {step === 1 && 'Choose transfer method'}
                {step === 2 && 'Enter recipient details'}
                {step === 3 && 'Enter amount'}
                {step === 4 && 'Confirm payment'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* Step 1: Method Selection */}
        {step === 1 && (
          <div className="space-y-3">
            {methods.map((m) => {
              const Icon = m.icon;
              return (
                <Card
                  key={m.id}
                  className="p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleMethodSelect(m.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{m.label}</p>
                      <p className="text-sm text-gray-500">{m.desc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </Card>
              );
            })}
          </div>
        )}

        {/* Step 2: Recipient Details */}
        {step === 2 && !loading && (
          <>
            {method === 'phone' && (
              <div className="space-y-5">
                <Card className="p-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search by name or number"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </Card>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Contacts</h3>
                  <div className="space-y-2">
                    {(searchQuery ? filteredContacts : mockContacts.slice(0, 5)).map((contact) => (
                      <Card
                        key={contact.id}
                        className="p-4 cursor-pointer hover:shadow-lg transition-all"
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-[#586BFF] to-[#9B62FF] rounded-full flex items-center justify-center text-white font-bold text-lg">
                            {contact.avatar}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{contact.name}</p>
                            <p className="text-sm text-gray-500">{contact.phone}</p>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {method === 'upi' && (
              <Card className="p-5 space-y-5">
                <div>
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input
                    id="upiId"
                    type="text"
                    placeholder="name@upi"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleProceed} className="w-full bg-[#586BFF] h-12">
                  Continue
                </Button>
              </Card>
            )}

            {method === 'bank' && (
              <Card className="p-5 space-y-5">
                <div>
                  <Label htmlFor="bankAccount">Account Number</Label>
                  <Input
                    id="bankAccount"
                    type="text"
                    placeholder="Enter account number"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="ifsc">IFSC Code</Label>
                  <Input
                    id="ifsc"
                    type="text"
                    placeholder="Enter IFSC code"
                    value={formData.ifsc}
                    onChange={(e) => setFormData({ ...formData, ifsc: e.target.value.toUpperCase() })}
                    className="mt-2"
                  />
                </div>
                <Button onClick={handleProceed} className="w-full bg-[#586BFF] h-12">
                  Continue
                </Button>
              </Card>
            )}

            {method === 'self' && (
              <Card className="p-5 space-y-5">
                <p className="text-sm text-gray-600">Transfer money between your linked bank accounts</p>
                <Button onClick={handleProceed} className="w-full bg-[#586BFF] h-12">
                  Continue to Amount
                </Button>
              </Card>
            )}
          </>
        )}

        {/* Step 3: Amount */}
        {step === 3 && !loading && (
          <Card className="p-5 space-y-5">
            <div>
              <Label htmlFor="amount">Enter Amount</Label>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-2xl text-gray-500">₹</span>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="text-3xl font-bold"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="note">Add Note (Optional)</Label>
              <Input
                id="note"
                type="text"
                placeholder="What's this for?"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                className="mt-2"
              />
            </div>

            <Button onClick={handleProceed} className="w-full bg-[#586BFF] h-12 text-lg font-semibold">
              Continue
            </Button>
          </Card>
        )}

        {/* Step 4: Confirm */}
        {step === 4 && !loading && (
          <div className="space-y-4">
            <Card className="p-5 space-y-4">
              <h3 className="font-bold text-lg text-gray-800">Confirm Payment</h3>
              
              <div className="space-y-3 pt-3 border-t text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">To</span>
                  <span className="font-medium">{formData.recipient || formData.upiId || formData.bankAccount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Amount</span>
                  <span className="font-medium">₹{parseFloat(formData.amount).toLocaleString()}</span>
                </div>
                {formData.note && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Note</span>
                    <span className="font-medium">{formData.note}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold text-[#586BFF]">₹{parseFloat(formData.amount).toLocaleString()}</span>
                </div>
              </div>
            </Card>

            <Button onClick={handlePayment} className="w-full bg-[#586BFF] h-12 text-lg font-semibold">
              Pay ₹{parseFloat(formData.amount).toLocaleString()}
            </Button>
          </div>
        )}

        {loading && <LoadingSpinner message="Processing payment..." />}
      </div>
    </div>
  );
};

export default SendMoney;
