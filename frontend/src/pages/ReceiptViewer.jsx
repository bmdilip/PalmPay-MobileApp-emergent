import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ArrowLeft, Download, Share2, CheckCircle2, Copy, Eye, EyeOff } from 'lucide-react';
import { mockReceipts } from '../mockDataPalmPay';
import { useToast } from '../hooks/use-toast';
import Logo from '../components/Logo';

const ReceiptViewer = () => {
  const navigate = useNavigate();
  const { receiptId } = useParams();
  const { toast } = useToast();
  const [showCrypto, setShowCrypto] = useState(false);
  
  const receipt = mockReceipts.find(r => r.id === receiptId);

  if (!receipt) {
    return (
      <div className="min-h-screen bg-[#0A0F1F] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-white/60">Receipt not found</p>
          <Button onClick={() => navigate('/history')} className="mt-4">
            Go to History
          </Button>
        </div>
      </div>
    );
  }

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`
    });
  };

  return (
    <div className="min-h-screen bg-[#0A0F1F] text-white pb-6">
      {/* Header */}
      <div className="px-5 py-6 border-b border-white/10">
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate('/history')} 
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-semibold">Transaction Receipt</h1>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Download className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Success Badge */}
      <div className="px-5 py-6 flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full bg-[#64E8FF] blur-2xl opacity-40 animate-pulse"></div>
          <div className="relative w-20 h-20 bg-[#64E8FF]/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-10 h-10 text-[#64E8FF]" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-1">Payment Successful</h2>
        <p className="text-sm text-white/60">Authorized via PalmPe Device</p>
      </div>

      {/* Receipt Details */}
      <div className="px-5 space-y-4">
        {/* Amount */}
        <Card className="bg-gradient-to-r from-[#586BFF]/10 to-[#9B62FF]/10 border-[#586BFF]/30 p-6 text-center">
          <p className="text-sm text-white/60 mb-2">Amount Paid</p>
          <p className="text-4xl font-bold text-white">₹{receipt.amount.toFixed(2)}</p>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="readable" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-white/5">
            <TabsTrigger 
              value="readable"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#586BFF] data-[state=active]:to-[#9B62FF] data-[state=active]:text-white"
            >
              Readable
            </TabsTrigger>
            <TabsTrigger 
              value="cryptographic"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#586BFF] data-[state=active]:to-[#9B62FF] data-[state=active]:text-white"
            >
              Cryptographic
            </TabsTrigger>
          </TabsList>

          {/* Readable View */}
          <TabsContent value="readable" className="mt-4">
            <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Merchant</span>
                  <span className="text-white font-medium">{receipt.merchantName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Merchant ID</span>
                  <span className="text-white font-mono text-sm">{receipt.merchantId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Amount</span>
                  <span className="text-white font-semibold">₹{receipt.amount} {receipt.currency}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Date & Time</span>
                  <span className="text-white">{new Date(receipt.timestamp).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Status</span>
                  <span className="text-green-400 capitalize">{receipt.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Device ID</span>
                  <span className="text-white font-mono text-sm">{receipt.deviceId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">User ID</span>
                  <span className="text-white font-mono text-sm">{receipt.userId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Bank Account</span>
                  <span className="text-white font-mono">****{receipt.bankLastFour}</span>
                </div>
                {receipt.location && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Location</span>
                    <span className="text-white text-sm">{receipt.location}</span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Receipt ID</span>
                  <button 
                    onClick={() => copyToClipboard(receipt.id, 'Receipt ID')}
                    className="text-[#64E8FF] text-sm flex items-center gap-1"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                </div>
                <p className="text-white font-mono text-sm break-all">{receipt.id}</p>
              </div>
            </Card>
          </TabsContent>

          {/* Cryptographic View */}
          <TabsContent value="cryptographic" className="mt-4">
            <Card className="bg-white/3 backdrop-blur-lg border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-white">Cryptographic Proof</h3>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-xs text-green-400 font-medium">Verified</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm">Triple Hash</span>
                    <button 
                      onClick={() => copyToClipboard(receipt.tripleHash, 'Triple Hash')}
                      className="text-[#64E8FF] text-sm flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-white/80 font-mono text-xs break-all">{receipt.tripleHash}</p>
                  </div>
                  <p className="text-xs text-white/40 mt-1">H(palm_hash || merchant_id || amount || nonce)</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm">Device Signature</span>
                    <button 
                      onClick={() => copyToClipboard(receipt.deviceSignature, 'Device Signature')}
                      className="text-[#64E8FF] text-sm flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy
                    </button>
                  </div>
                  <div className="bg-black/30 p-3 rounded-lg">
                    <p className="text-white/80 font-mono text-xs break-all">{receipt.deviceSignature}</p>
                  </div>
                  <p className="text-xs text-white/40 mt-1">ECDSA signature from device SE/TEE</p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white/60 text-sm">Signed Blob (Base64)</span>
                    <button 
                      onClick={() => setShowCrypto(!showCrypto)}
                      className="text-[#64E8FF] text-sm flex items-center gap-1"
                    >
                      {showCrypto ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      {showCrypto ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {showCrypto && (
                    <div className="bg-black/30 p-3 rounded-lg max-h-32 overflow-y-auto">
                      <p className="text-white/80 font-mono text-xs break-all">{receipt.signedBlob}</p>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10">
                  <h4 className="text-white font-medium mb-3">Verification Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Signature Valid</span>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Device Certificate</span>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Triple Hash Match</span>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-sm">Timestamp Valid</span>
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <Button 
            className="w-full bg-gradient-to-r from-[#586BFF] to-[#9B62FF] hover:from-[#4a5ceb] hover:to-[#8a51eb]"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Receipt
          </Button>
          <Button 
            variant="outline"
            className="w-full border-white/20 text-white hover:bg-white/10"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share Receipt
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptViewer;