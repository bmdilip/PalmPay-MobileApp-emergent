import React, { useState } from 'react';
import { Wifi, ChevronRight } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import ServiceLayout from '../../components/ServiceLayout';
import HoverCard3D from '../../components/premium/HoverCard3D';
import ServiceReceipt from '../../components/ServiceReceipt';
import { LoadingSpinner } from '../../components/StateComponents';

const DataCard = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [receiptData, setReceiptData] = useState(null);
  const [formData, setFormData] = useState({ provider: '', number: '', amount: '', planId: null });

  const providers = [
    { id: 'airtel', name: 'Airtel' },
    { id: 'jio', name: 'Jio' },
    { id: 'vi', name: 'Vi' },
    { id: 'bsnl', name: 'BSNL' },
  ];

  const mockPlans = [
    { id: 1, amount: 98, data: '1 GB', validity: '28 days' },
    { id: 2, amount: 148, data: '2 GB', validity: '28 days' },
    { id: 3, amount: 298, data: '5 GB', validity: '28 days' },
  ];

  const handleNext = () => {
    if (!formData.provider || !formData.number) {
      alert('Please fill all fields');
      return;
    }
    setStep(2);
  };

  const handlePlanSelect = (plan) => {
    setFormData({ ...formData, planId: plan.id, amount: plan.amount });
    setStep(3);
  };

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      setReceiptData({
        transactionId: `TXN${Date.now()}`,
        date: new Date().toLocaleDateString('en-IN'),
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        amount: formData.amount,
        serviceName: 'Data Card Recharge',
        details: [
          { label: 'Provider', value: providers.find(p => p.id === formData.provider)?.name },
          { label: 'Number', value: formData.number },
          { label: 'Amount', value: `₹${formData.amount}` }
        ]
      });
      setLoading(false);
      setStep(4);
    }, 2000);
  };

  if (step === 4 && receiptData) return <ServiceReceipt {...receiptData} />;

  return (
    <ServiceLayout title="Data Card Recharge" subtitle="Recharge your data card" icon={Wifi}>
      {step === 1 && (
        <Card className="p-5 space-y-5">
          <div>
            <Label>Select Provider</Label>
            <select value={formData.provider} onChange={(e) => setFormData({ ...formData, provider: e.target.value })} className="w-full mt-2 p-3 border rounded-lg">
              <option value="">Select provider</option>
              {providers.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <Label>Card Number</Label>
            <Input type="text" maxLength={10} placeholder="Enter number" value={formData.number} onChange={(e) => setFormData({ ...formData, number: e.target.value })} className="mt-2" />
          </div>
          <Button onClick={handleNext} className="w-full bg-[#586BFF] h-12">Browse Plans <ChevronRight className="w-5 h-5 ml-2" /></Button>
        </Card>
      )}
      {step === 2 && (
        <div className="space-y-4">
          {mockPlans.map((plan) => (
            <Card key={plan.id} className="p-4 cursor-pointer hover:shadow-lg" onClick={() => handlePlanSelect(plan)}>
              <div className="flex justify-between items-center">
                <div><p className="text-lg font-bold">₹{plan.amount}</p><p className="text-sm text-gray-500">{plan.data} • {plan.validity}</p></div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </Card>
          ))}
          <Button onClick={() => setStep(1)} variant="outline" className="w-full">Back</Button>
        </div>
      )}
      {step === 3 && !loading && (
        <div className="space-y-4">
          <Card className="p-5 space-y-4">
            <h3 className="font-bold text-lg">Confirm Recharge</h3>
            <div className="space-y-3 pt-3 border-t text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Provider</span><span className="font-medium">{providers.find(p => p.id === formData.provider)?.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Number</span><span className="font-medium">{formData.number}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Amount</span><span className="font-medium">₹{formData.amount}</span></div>
            </div>
          </Card>
          <Button onClick={handlePayment} className="w-full bg-[#586BFF] h-12">Pay ₹{formData.amount}</Button>
        </div>
      )}
      {loading && <LoadingSpinner message="Processing..." />}
    </ServiceLayout>
  );
};

export default DataCard;