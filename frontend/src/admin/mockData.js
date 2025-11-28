// Mock data for Admin Dashboard

export const mockAdminUsers = [
  {
    id: 'user-001',
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    phone: '+91 98765 43210',
    balance: 12450.75,
    role: 'user',
    palmLeft: true,
    palmRight: true,
    kycStatus: 'verified',
    status: 'active',
    created: '2025-01-15',
    lastLogin: '2025-01-28 15:30'
  },
  {
    id: 'user-002',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 98765 11111',
    balance: 5600.00,
    role: 'user',
    palmLeft: true,
    palmRight: false,
    kycStatus: 'verified',
    status: 'active',
    created: '2025-01-20',
    lastLogin: '2025-01-28 14:20'
  },
  {
    id: 'user-003',
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    phone: '+91 98765 22222',
    balance: 850.50,
    role: 'user',
    palmLeft: false,
    palmRight: false,
    kycStatus: 'pending',
    status: 'active',
    created: '2025-01-25',
    lastLogin: '2025-01-27 10:15'
  },
  {
    id: 'user-004',
    name: 'Neha Gupta',
    email: 'neha@example.com',
    phone: '+91 98765 33333',
    balance: 15200.00,
    role: 'user',
    palmLeft: true,
    palmRight: true,
    kycStatus: 'verified',
    status: 'active',
    created: '2025-01-18',
    lastLogin: '2025-01-28 16:45'
  },
  {
    id: 'user-005',
    name: 'Amit Singh',
    email: 'amit@example.com',
    phone: '+91 98765 44444',
    balance: 0,
    role: 'user',
    palmLeft: false,
    palmRight: false,
    kycStatus: 'pending',
    status: 'suspended',
    created: '2025-01-22',
    lastLogin: '2025-01-26 09:30'
  }
];

export const mockDevices = [
  {
    id: 'device-001',
    deviceId: 'PALMPOS-001',
    serialNumber: 'PP-2025-001',
    merchantId: 'merchant-001',
    merchantName: 'Cafe Coffee Day - MG Road',
    status: 'online',
    location: 'Bangalore, Karnataka',
    lastPing: '2025-01-28 16:50',
    firmwareVersion: '2.1.5',
    transactionsToday: 45,
    revenueToday: 12500,
    registered: '2025-01-10'
  },
  {
    id: 'device-002',
    deviceId: 'PALMPOS-002',
    serialNumber: 'PP-2025-002',
    merchantId: 'merchant-002',
    merchantName: 'BigBazaar - Indiranagar',
    status: 'online',
    location: 'Bangalore, Karnataka',
    lastPing: '2025-01-28 16:48',
    firmwareVersion: '2.1.5',
    transactionsToday: 128,
    revenueToday: 45600,
    registered: '2025-01-12'
  },
  {
    id: 'device-003',
    deviceId: 'PALMPOS-003',
    serialNumber: 'PP-2025-003',
    merchantId: 'merchant-003',
    merchantName: 'StarBucks - Whitefield',
    status: 'offline',
    location: 'Bangalore, Karnataka',
    lastPing: '2025-01-28 14:22',
    firmwareVersion: '2.1.3',
    transactionsToday: 67,
    revenueToday: 23400,
    registered: '2025-01-08'
  },
  {
    id: 'device-004',
    deviceId: 'PALMPOS-004',
    serialNumber: 'PP-2025-004',
    merchantId: null,
    merchantName: 'Unassigned',
    status: 'inactive',
    location: 'Warehouse',
    lastPing: null,
    firmwareVersion: '2.1.5',
    transactionsToday: 0,
    revenueToday: 0,
    registered: '2025-01-26'
  }
];

export const mockMerchants = [
  {
    id: 'merchant-001',
    businessName: 'Cafe Coffee Day',
    ownerName: 'Rajesh Patel',
    email: 'rajesh@ccd.com',
    phone: '+91 98765 55555',
    category: 'Food & Beverage',
    location: 'MG Road, Bangalore',
    status: 'active',
    verified: true,
    devicesAssigned: 1,
    transactionsTotal: 1250,
    revenueTotal: 456000,
    joined: '2025-01-10'
  },
  {
    id: 'merchant-002',
    businessName: 'BigBazaar',
    ownerName: 'Anita Desai',
    email: 'anita@bigbazaar.com',
    phone: '+91 98765 66666',
    category: 'Retail',
    location: 'Indiranagar, Bangalore',
    status: 'active',
    verified: true,
    devicesAssigned: 1,
    transactionsTotal: 3420,
    revenueTotal: 1234000,
    joined: '2025-01-12'
  },
  {
    id: 'merchant-003',
    businessName: 'StarBucks',
    ownerName: 'Vikram Singh',
    email: 'vikram@starbucks.com',
    phone: '+91 98765 77777',
    category: 'Food & Beverage',
    location: 'Whitefield, Bangalore',
    status: 'active',
    verified: true,
    devicesAssigned: 1,
    transactionsTotal: 2180,
    revenueTotal: 789000,
    joined: '2025-01-08'
  },
  {
    id: 'merchant-004',
    businessName: 'Metro Stores',
    ownerName: 'Sunita Reddy',
    email: 'sunita@metro.com',
    phone: '+91 98765 88888',
    category: 'Retail',
    location: 'HSR Layout, Bangalore',
    status: 'pending',
    verified: false,
    devicesAssigned: 0,
    transactionsTotal: 0,
    revenueTotal: 0,
    joined: '2025-01-27'
  }
];

export const mockAdminTransactions = [
  {
    id: 'txn-admin-001',
    transactionId: 'TXN2025012801234',
    userId: 'user-001',
    userName: 'Arjun Mehta',
    merchantId: 'merchant-001',
    merchantName: 'Cafe Coffee Day',
    amount: 850,
    type: 'payment',
    walletType: 'upi',
    status: 'success',
    method: 'Palm Biometric',
    deviceId: 'PALMPOS-001',
    date: '2025-01-28',
    time: '15:30'
  },
  {
    id: 'txn-admin-002',
    transactionId: 'TXN2025012801235',
    userId: 'user-002',
    userName: 'Priya Sharma',
    merchantId: 'merchant-002',
    merchantName: 'BigBazaar',
    amount: 1250,
    type: 'payment',
    walletType: 'e-money',
    status: 'success',
    method: 'QR Code',
    deviceId: null,
    date: '2025-01-28',
    time: '14:20'
  },
  {
    id: 'txn-admin-003',
    transactionId: 'TXN2025012801236',
    userId: 'user-004',
    userName: 'Neha Gupta',
    merchantId: 'merchant-003',
    merchantName: 'StarBucks',
    amount: 450,
    type: 'payment',
    walletType: 'cbdc',
    status: 'success',
    method: 'Palm Biometric (Offline)',
    deviceId: 'PALMPOS-003',
    date: '2025-01-28',
    time: '12:30'
  },
  {
    id: 'txn-admin-004',
    transactionId: 'TXN2025012801237',
    userId: 'user-003',
    userName: 'Ravi Kumar',
    merchantId: 'merchant-001',
    merchantName: 'Cafe Coffee Day',
    amount: 320,
    type: 'payment',
    walletType: 'upi',
    status: 'failed',
    method: 'UPI',
    deviceId: null,
    date: '2025-01-28',
    time: '11:15'
  }
];

export const mockAdminStats = {
  totalUsers: 15234,
  activeUsers: 12456,
  totalMerchants: 342,
  activeMerchants: 298,
  totalDevices: 356,
  onlineDevices: 289,
  transactionsToday: 4567,
  revenueToday: 2345678,
  transactionsMonth: 89234,
  revenueMonth: 45678900
};