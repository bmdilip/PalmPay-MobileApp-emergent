// Mock data for PhonePe clone

export const mockUser = {
  id: '1',
  name: 'Rahul Kumar',
  phone: '+91 98765 43210',
  upiId: 'rahulkumar@ybl',
  walletBalance: 5840.50,
  profilePic: null
};

export const mockContacts = [
  { id: '1', name: 'Priya Sharma', phone: '+91 98765 11111', upiId: 'priya@paytm' },
  { id: '2', name: 'Amit Singh', phone: '+91 98765 22222', upiId: 'amit@oksbi' },
  { id: '3', name: 'Neha Gupta', phone: '+91 98765 33333', upiId: 'neha@ybl' },
  { id: '4', name: 'Rajesh Kumar', phone: '+91 98765 44444', upiId: 'rajesh@paytm' },
  { id: '5', name: 'Anjali Reddy', phone: '+91 98765 55555', upiId: 'anjali@okhdfcbank' },
];

export const mockTransactions = [
  {
    id: 'txn1',
    type: 'sent',
    amount: 500,
    recipient: 'Priya Sharma',
    upiId: 'priya@paytm',
    date: '2025-01-28',
    time: '14:30',
    status: 'success',
    category: 'transfer'
  },
  {
    id: 'txn2',
    type: 'received',
    amount: 1200,
    recipient: 'Amit Singh',
    upiId: 'amit@oksbi',
    date: '2025-01-28',
    time: '11:15',
    status: 'success',
    category: 'transfer'
  },
  {
    id: 'txn3',
    type: 'sent',
    amount: 299,
    recipient: 'Jio Prepaid Recharge',
    upiId: 'recharge@phonepe',
    date: '2025-01-27',
    time: '18:45',
    status: 'success',
    category: 'recharge'
  },
  {
    id: 'txn4',
    type: 'sent',
    amount: 850,
    recipient: 'Electricity Bill',
    upiId: 'bescom@bill',
    date: '2025-01-26',
    time: '09:20',
    status: 'success',
    category: 'billpay'
  },
  {
    id: 'txn5',
    type: 'received',
    amount: 2500,
    recipient: 'Neha Gupta',
    upiId: 'neha@ybl',
    date: '2025-01-25',
    time: '16:00',
    status: 'success',
    category: 'transfer'
  },
  {
    id: 'txn6',
    type: 'sent',
    amount: 150,
    recipient: 'Amazon',
    upiId: 'amazon@icici',
    date: '2025-01-24',
    time: '12:30',
    status: 'success',
    category: 'shopping'
  },
  {
    id: 'txn7',
    type: 'sent',
    amount: 399,
    recipient: 'Netflix',
    upiId: 'netflix@axisbank',
    date: '2025-01-23',
    time: '10:15',
    status: 'success',
    category: 'subscription'
  },
  {
    id: 'txn8',
    type: 'sent',
    amount: 450,
    recipient: 'Swiggy',
    upiId: 'swiggy@paytm',
    date: '2025-01-22',
    time: '20:45',
    status: 'success',
    category: 'food'
  }
];

export const mockOffers = [
  {
    id: 'offer1',
    title: 'Cashback on Recharge',
    description: 'Get 10% cashback on mobile recharge',
    validTill: '31 Jan 2025',
    image: 'recharge'
  },
  {
    id: 'offer2',
    title: 'Bill Payment Rewards',
    description: 'Pay your bills and win scratch cards',
    validTill: '15 Feb 2025',
    image: 'bills'
  },
  {
    id: 'offer3',
    title: 'Send Money & Earn',
    description: 'Send ₹1000+ and get ₹50 cashback',
    validTill: '28 Feb 2025',
    image: 'transfer'
  }
];

export const quickActions = [
  { id: 'send', label: 'Send Money', icon: 'ArrowUpRight', color: '#5f259f' },
  { id: 'request', label: 'Request', icon: 'ArrowDownLeft', color: '#0066cc' },
  { id: 'recharge', label: 'Recharge', icon: 'Smartphone', color: '#ff6b00' },
  { id: 'bills', label: 'Pay Bills', icon: 'Receipt', color: '#00aa13' },
  { id: 'bank', label: 'To Bank', icon: 'Building2', color: '#9333ea' },
  { id: 'balance', label: 'Check Balance', icon: 'Wallet', color: '#dc2626' },
  { id: 'insurance', label: 'Insurance', icon: 'Shield', color: '#ea580c' },
  { id: 'gold', label: 'Gold', icon: 'Coins', color: '#d97706' },
];