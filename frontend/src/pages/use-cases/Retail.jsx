import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, MapPin, Check, ChevronRight, ArrowLeft, Store, Percent } from 'lucide-react';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import HoverCard3D from '../../components/premium/HoverCard3D';

const Retail = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedRetail, setSelectedRetail] = useState(null);

  const retailers = [
    { id: 'ret-1', name: 'Reliance Fresh', category: 'Supermarket', address: 'Koramangala, Bangalore', distance: '1.2 km', offers: ['5% cashback', 'Instant checkout'], palmPay: true },
    { id: 'ret-2', name: 'Phoenix Marketcity', category: 'Mall', address: 'Whitefield, Bangalore', distance: '3.5 km', offers: ['Mall-wide access', '10% off on brands'], palmPay: true },
    { id: 'ret-3', name: 'More Megastore', category: 'Supermarket', address: 'Indiranagar, Bangalore', distance: '2.8 km', offers: ['No queues', '3% rewards'], palmPay: true },
    { id: 'ret-4', name: 'Orion Mall', category: 'Mall', address: 'Rajajinagar, Bangalore', distance: '5.1 km', offers: ['VIP parking', 'Fast-track billing'], palmPay: true }
  ];

  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white p-5 flex items-center justify-center">
        <Card className="p-8 text-center max-w-md">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center">
            <Check className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome to {selectedRetail.name}!</h2>
          <p className="text-gray-600 mb-4">Shop with your palm, skip queues, and enjoy exclusive offers</p>
          <Button onClick={() => navigate('/home')} className="w-full bg-orange-600 hover:bg-orange-700">Go to Home</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-white">
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white p-5">
        <div className="flex items-center gap-3">
          <button onClick={() => step === 1 ? navigate(-1) : setStep(step - 1)} className="p-2 hover:bg-white/20 rounded-full">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Retail & Shopping</h1>
            <p className="text-sm text-orange-100">Shop smart with palm authentication</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="text-xl font-bold text-gray-800 mb-4">Partner Stores & Malls</h2>
            <div className="space-y-3">
              {retailers.map((retail, idx) => (
                <motion.div key={retail.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }} onClick={() => { setSelectedRetail(retail); setStep(2); }}>
                  <HoverCard3D>
                    <Card className="p-4 cursor-pointer hover:shadow-xl border-green-300">
                      <div className="flex items-start gap-3 mb-3">
                        <Store className="w-10 h-10 text-orange-600" />
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">{retail.name}</h3>
                          <p className="text-xs text-gray-500">{retail.category} • {retail.distance}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {retail.offers.map(offer => (
                          <span key={offer} className="flex items-center gap-1 px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                            <Percent className="w-3 h-3" />
                            {offer}
                          </span>
                        ))}
                      </div>
                    </Card>
                  </HoverCard3D>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {step === 2 && selectedRetail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="p-5 mb-4">
              <h3 className="font-bold text-gray-800 mb-3">{selectedRetail.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Start shopping with palm authentication. Enjoy faster checkout and exclusive member benefits.</p>
            </Card>
            <Button onClick={() => setStep(3)} className="w-full bg-orange-600 hover:bg-orange-700 h-12">
              Start Shopping
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Retail;