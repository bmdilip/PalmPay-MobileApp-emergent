// Mock data for PalmPay - Palm Biometric Payment App

export const mockUser = {
  id: '1',
  name: 'Arjun Mehta',
  phone: '+91 98765 43210',
  upiId: 'arjun@palmpay',
  palmId: 'PALM-AMH-8472',
  walletBalance: 12450.75,
  cbdcBalance: 2500.00,
  isPalmRegistered: true,
  kycStatus: 'verified',
  secureElementStatus: 'active',
  profilePic: null,
  registeredDate: '2025-01-15'
};

export const mockBanks = [
  { id: '1', name: 'HDFC Bank', accountNumber: '****1234', ifsc: 'HDFC0001234', isPrimary: true },
  { id: '2', name: 'ICICI Bank', accountNumber: '****5678', ifsc: 'ICIC0005678', isPrimary: false },
];

export const mockContacts = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 11111', upiId: 'priya@palmpay', hasPalmId: true },
  { id: '2', name: 'Ravi Kumar', phone: '+91 98765 22222', upiId: 'ravi@paytm', hasPalmId: false },
  { id: '3', name: 'Neha Gupta', phone: '+91 98765 33333', upiId: 'neha@palmpay', hasPalmId: true },
  { id: '4', name: 'Amit Singh', phone: '+91 98765 44444', upiId: 'amit@oksbi', hasPalmId: false },
  { id: '5', name: 'Anjali Reddy', phone: '+91 98765 55555', upiId: 'anjali@palmpay', hasPalmId: true },
];

export const mockTransactions = [
  {
    id: 'txn1',
    type: 'sent',
    amount: 850,
    recipient: 'Priya Sharma',
    upiId: 'priya@palmpay',
    date: '2025-01-28',
    time: '15:30',
    status: 'success',
    category: 'palm2qr',
    method: 'Palm Biometric',
    location: 'Cafe Coffee Day, Bangalore'
  },
  {
    id: 'txn2',
    type: 'received',
    amount: 2500,
    recipient: 'Ravi Kumar',
    upiId: 'ravi@paytm',
    date: '2025-01-28',
    time: '11:15',
    status: 'success',
    category: 'transfer',
    method: 'UPI'
  },
  {
    id: 'txn3',
    type: 'sent',
    amount: 350,
    recipient: 'PalmPe POS - Retail Store',
    upiId: 'merchant@palmpay',
    date: '2025-01-27',
    time: '18:45',
    status: 'success',
    category: 'pos',
    method: 'Palm Biometric (Phone-less)',
    location: 'BigBazaar, Mumbai'
  },
  {
    id: 'txn4',
    type: 'sent',
    amount: 1200,
    recipient: 'Electricity Bill - BESCOM',
    upiId: 'bescom@bill',
    date: '2025-01-26',
    time: '09:20',
    status: 'success',
    category: 'billpay',
    method: 'UPI'
  },
  {
    id: 'txn5',
    type: 'received',
    amount: 5000,
    recipient: 'Neha Gupta',
    upiId: 'neha@palmpay',
    date: '2025-01-25',
    time: '16:00',
    status: 'success',
    category: 'transfer',
    method: 'Palm Biometric'
  },
  {
    id: 'txn6',
    type: 'sent',
    amount: 499,
    recipient: 'Amazon India',
    upiId: 'amazon@icici',
    date: '2025-01-24',
    time: '12:30',
    status: 'success',
    category: 'shopping',
    method: 'Palm2QR'
  },
];

export const services = [
  { id: 'recharge', label: 'Mobile Recharge', icon: 'Smartphone', color: '#64E8FF' },
  { id: 'electricity', label: 'Electricity', icon: 'Zap', color: '#586BFF' },
  { id: 'gas', label: 'Gas', icon: 'Flame', color: '#9B62FF' },
  { id: 'dth', label: 'DTH', icon: 'Tv', color: '#64E8FF' },
  { id: 'fastag', label: 'FASTag', icon: 'Car', color: '#586BFF' },
  { id: 'flights', label: 'Flights', icon: 'Plane', color: '#9B62FF' },
  { id: 'hotels', label: 'Hotels', icon: 'Hotel', color: '#64E8FF' },
  { id: 'broadband', label: 'Broadband', icon: 'Wifi', color: '#586BFF' },
  { id: 'education', label: 'Education', icon: 'GraduationCap', color: '#9B62FF' },
  { id: 'water', label: 'Water', icon: 'Droplet', color: '#64E8FF' },
  { id: 'subscriptions', label: 'Subscriptions', icon: 'Repeat', color: '#586BFF' },
  { id: 'wallet', label: 'Wallet Recharge', icon: 'Wallet', color: '#9B62FF' },
];