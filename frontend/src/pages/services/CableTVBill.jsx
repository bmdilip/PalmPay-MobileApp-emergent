import React, { useState } from 'react';
import { Tv, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const CableTVBill = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [billDetails, setBillDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [formData, setFormData] = useState({ provider: '', subscriberId: '', amount: 0 });

  const providers = [
    { id: 'local1', name: 'Local Cable Operator' },
    { id: 'den', name: 'DEN Networks' },
    { id: 'hathway', name: 'Hathway Cable' },
  ];

  const handleFetch = () => {
    if (!formData.provider || !formData.subscriberId) { alert('Please fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      setBillDetails({ billNumber: `CBL${Date.now()}`, amount: Math.floor(Math.random() * 500) + 200, month: 'January 2025' });
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
        serviceName: 'Cable TV Bill Payment',
        details: [
          { label: 'Provider', value: providers.find(p => p.id === formData.provider)?.name },
          { label: 'Subscriber ID', value: formData.subscriberId },
          { label: 'Month', value: billDetails.month }
        ]
      });
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  if (step === 4 && receiptData) return <ServiceReceipt {...receiptData} />;

  return (
    <ServiceLayout title="Cable TV Bill" subtitle="Pay cable bill" icon={Tv} iconColor="#EC4899" headerGradient="from-[#EC4899] via-[#F472B6] to-[#FBCFE8]">
      {step === 1 && !loading && (
        <Card className="p-5 space-y-5">
          <div><Label>Cable Provider</Label><select value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} className="w-full mt-2 p-3 border rounded-lg"><option value="">Select provider</option>{providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></div>
          <div><Label>Subscriber ID</Label><Input placeholder="Enter subscriber ID" value={formData.subscriberId} onChange={(e) => setFormData({ ...formData, subscriberId: e.target.value })} className="mt-2" /></div>
          <Button onClick={handleFetch} className="w-full bg-[#EC4899] h-12">Fetch Bill <ChevronRight className="w-5 h-5 ml-2" /></Button>
        </Card>
      )}
      {loading && step === 1 && <LoadingSpinner message="Fetching..." />}
      {step === 2 && billDetails && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-pink-50 border-pink-200"><div className="text-center mb-4"><p className="text-sm text-gray-600">Bill Amount</p><p className="text-3xl font-bold">₹{billDetails.amount}</p></div></Card>
          <Button onClick={handlePayment} className="w-full bg-[#EC4899] h-12">Pay ₹{billDetails.amount}</Button>
        </div>
      )}
      {loading && step === 2 && <LoadingSpinner message="Processing..." />}
    </ServiceLayout>
  );
};

export default CableTVBill;