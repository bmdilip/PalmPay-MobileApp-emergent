import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../../components/ui/card';
import { 
  Users, 
  Store, 
  Smartphone, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft
} from 'lucide-react';
import { mockAdminStats, mockAdminTransactions } from '../mockData';
import AdminLayout from '../AdminLayout';
import { useNavigate } from 'react-router-dom';
import { ThreeDHoverCard, GlowBorderCard } from '../../components/premium';
import { fadeInUp, staggerContainer, staggerItem } from '../../lib/animations';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const stats = mockAdminStats;

  const statCards = [
    {
      title: 'Total Users',
      value: (stats.totalUsers / 1000).toFixed(1) + 'K',
      subtitle: `${(stats.activeUsers / 1000).toFixed(1)}K active`,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      path: '/admin/users'
    },
    {
      title: 'Merchants',
      value: stats.totalMerchants,
      subtitle: `${stats.activeMerchants} active`,
      icon: Store,
      color: 'from-green-500 to-green-600',
      path: '/admin/merchants'
    },
    {
      title: 'Devices',
      value: stats.totalDevices,
      subtitle: `${stats.onlineDevices} online`,
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600',
      path: '/admin/devices'
    },
    {
      title: 'Revenue Today',
      value: `₹${(stats.revenueToday / 100000).toFixed(1)}L`,
      subtitle: `${stats.transactionsToday} txns`,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      path: '/admin/transactions'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-600 mt-1">System overview and analytics</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card 
                key={index} 
                className="p-4 hover:shadow-lg transition-all cursor-pointer"
                onClick={() => navigate(stat.path)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </Card>
            );
          })}
        </div>

        {/* Recent Transactions */}
        <Card className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
            <button 
              onClick={() => navigate('/admin/transactions')}
              className="text-sm text-[#586BFF] font-semibold hover:underline"
            >
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {mockAdminTransactions.slice(0, 5).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    txn.status === 'success' ? 'bg-green-100' : 'bg-red-100'
                  }`}>
                    {txn.type === 'payment' ? (
                      <ArrowUpRight className={`w-5 h-5 ${
                        txn.status === 'success' ? 'text-green-600' : 'text-red-600'
                      }`} />
                    ) : (
                      <ArrowDownLeft className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{txn.userName}</p>
                    <p className="text-xs text-gray-500 truncate">
                      {txn.merchantName} • {txn.time}
                    </p>
                  </div>
                </div>
                <div className="text-right ml-3 flex-shrink-0">
                  <p className={`font-bold text-sm ${
                    txn.status === 'success' ? 'text-gray-800' : 'text-red-600'
                  }`}>
                    ₹{txn.amount.toLocaleString()}
                  </p>
                  <p className={`text-xs capitalize ${
                    txn.status === 'success' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {txn.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;