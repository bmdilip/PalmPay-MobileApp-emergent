import React, { useState } from 'react';
import { Home, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const HousingSociety = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [billDetails, setBillDetails] = useState(null);
  const [receiptData, setReceiptData] = useState(null);
  const [formData, setFormData] = useState({ societyName: '', flatNumber: '', amount: 0 });

  const handleFetch = () => {
    if (!formData.societyName || !formData.flatNumber) { alert('Please fill all fields'); return; }
    setLoading(true);
    setTimeout(() => {
      setBillDetails({ billNumber: `HSG${Date.now()}`, amount: Math.floor(Math.random() * 3000) + 2000, month: 'January 2025' });
      setFormData({ ...formData, amount: Math.floor(Math.random() * 3000) + 2000 });
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
        serviceName: 'Housing Society Maintenance',
        details: [
          { label: 'Society', value: formData.societyName },
          { label: 'Flat', value: formData.flatNumber },
          { label: 'Month', value: billDetails.month }
        ]
      });
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  if (step === 4 && receiptData) return <ServiceReceipt {...receiptData} />;

  return (
    <ServiceLayout title="Housing Society" subtitle="Pay maintenance" icon={Home} iconColor="#F59E0B" headerGradient="from-[#F59E0B] via-[#FB923C] to-[#FDBA74]">
      {step === 1 && !loading && (
        <Card className="p-5 space-y-5">
          <div><Label>Society Name</Label><Input placeholder="Enter society name" value={formData.societyName} onChange={(e) => setFormData({ ...formData, societyName: e.target.value })} className="mt-2" /></div>
          <div><Label>Flat / Unit Number</Label><Input placeholder="E.g. A-101" value={formData.flatNumber} onChange={(e) => setFormData({ ...formData, flatNumber: e.target.value })} className="mt-2" /></div>
          <Button onClick={handleFetch} className="w-full bg-[#F59E0B] h-12">Fetch Bill <ChevronRight className="w-5 h-5 ml-2" /></Button>
        </Card>
      )}
      {loading && step === 1 && <LoadingSpinner message="Fetching..." />}
      {step === 2 && billDetails && !loading && (
        <div className="space-y-4">
          <Card className="p-5 bg-amber-50 border-amber-200"><div className="text-center mb-4"><p className="text-sm text-gray-600">Maintenance Amount</p><p className="text-3xl font-bold">₹{billDetails.amount}</p></div></Card>
          <Button onClick={handlePayment} className="w-full bg-[#F59E0B] h-12">Pay ₹{billDetails.amount}</Button>
        </div>
      )}
      {loading && step === 2 && <LoadingSpinner message="Processing..." />}
    </ServiceLayout>
  );
};

export default HousingSociety;