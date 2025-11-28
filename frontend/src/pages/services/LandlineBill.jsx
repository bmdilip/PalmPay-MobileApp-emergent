import React, { useState } from 'react';
import { Phone, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const LandlineBill = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [billDetails, setBillDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [formData, setFormData] = useState({ provider: '', accountNumber: '', amount: 0 });

  const providers = [
    { id: 'bsnl', name: 'BSNL Landline' },
    { id: 'mtnl', name: 'MTNL' },
    { id: 'airtel', name: 'Airtel Landline' },
  ];

  const handleFetchBill = () => {
    if (!formData.provider || !formData.accountNumber) { alert('Please fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      setBillDetails({ accountNumber: formData.accountNumber, billNumber: `LND${Math.random().toString(36).substring(7).toUpperCase()}`, amount: Math.floor(Math.random() * 500) + 200, dueDate: '30 Jan 2025' });
      setFormData({ ...formData, amount: Math.floor(Math.random() * 500) + 200 });
      setLoading(false);
      setStep(2);
    }, 2000);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setReceiptData({
        transactionId: `TXN${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: formData.amount,
        serviceName: 'Landline Bill Payment',
        details: [
          { label: 'Account Number', value: billDetails.accountNumber },
          { label: 'Bill Number', value: billDetails.billNumber },
          { label: 'Provider', value: providers.find(p => p.id === formData.provider)?.name }
        ]
      });
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  if (step === 4 && receiptData) return <ServiceReceipt {...receiptData} />;

  return (
    <ServiceLayout title="Landline Bill" subtitle="Pay landline bill" icon={Phone} iconColor="#8B5CF6" headerGradient="from-[#8B5CF6] via-[#A78BFA] to-[#C4B5FD]">
      {step === 1 && !loading && (
        <Card className="p-5 space-y-5">
          <div><Label>Provider</Label><select value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} className="w-full mt-2 p-3 border rounded-lg"><option value="">Select provider</option>{providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div><Label>Account / Phone Number</Label><Input type="text" placeholder="Enter account number" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} className="mt-2" /></div>
          <Button onClick={handleFetchBill} className="w-full bg-[#8B5CF6] h-12">Fetch Bill <ChevronRight className="w-5 h-5 ml-2" /></Button>
        </Card>
      )}
      {loading && step === 1 && <LoadingSpinner message="Fetching bill..." />}
      {step === 2 && billDetails && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-purple-50 border-purple-200"><div className="text-center mb-4"><p className="text-sm text-gray-600">Bill Amount</p><p className="text-3xl font-bold">₹{billDetails.amount}</p></div><div className="text-sm"><div className="flex justify-between mb-2"><span className="text-gray-600">Due Date</span><span className="font-medium text-red-600">{billDetails.dueDate}</span></div></div></Card>
          <Button onClick={handlePayment} className="w-full bg-[#8B5CF6] h-12">Pay ₹{billDetails.amount}</Button>
        </div>
      )}
      {loading && step === 2 && <LoadingSpinner message="Processing..." />}
    </ServiceLayout>
  );
};

export default LandlineBill;