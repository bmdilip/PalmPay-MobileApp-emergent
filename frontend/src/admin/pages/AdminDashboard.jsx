import React from 'react';
import { Card } from '../../components/ui/card';
import { 
  Users, 
  Store, 
  Smartphone, 
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
  Activity
} from 'lucide-react';
import { mockAdminStats, mockAdminTransactions } from '../mockData';
import AdminLayout from '../AdminLayout';

const AdminDashboard = () => {
  const stats = mockAdminStats;

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      subtitle: `${stats.activeUsers.toLocaleString()} active`,
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      bg: 'bg-blue-50'
    },
    {
      title: 'Merchants',
      value: stats.totalMerchants.toLocaleString(),
      subtitle: `${stats.activeMerchants} active`,
      icon: Store,
      color: 'from-green-500 to-green-600',
      bg: 'bg-green-50'
    },
    {
      title: 'Devices',
      value: stats.totalDevices.toLocaleString(),
      subtitle: `${stats.onlineDevices} online`,
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600',
      bg: 'bg-purple-50'
    },
    {
      title: 'Revenue Today',
      value: `₹${(stats.revenueToday / 1000).toFixed(1)}K`,
      subtitle: `${stats.transactionsToday} transactions`,
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Activity className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.subtitle}</p>
              </Card>
            );
          })}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Revenue Overview</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Revenue chart visualization</p>
                <p className="text-xs mt-1">Monthly: ₹{(stats.revenueMonth / 100000).toFixed(2)}L</p>
              </div>
            </div>
          </Card>

          {/* Transactions Chart */}
          <Card className="p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Transaction Volume</h3>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center text-gray-500">
                <Activity className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-sm">Transaction chart visualization</p>
                <p className="text-xs mt-1">This Month: {stats.transactionsMonth.toLocaleString()}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800">Recent Transactions</h3>
            <button className="text-sm text-[#586BFF] font-semibold hover:underline">
              View All →
            </button>
          </div>
          <div className="space-y-3">
            {mockAdminTransactions.slice(0, 5).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
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
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">{txn.userName}</p>
                    <p className="text-xs text-gray-500">
                      {txn.merchantName} • {txn.date} {txn.time}
                    </p>
                    <p className="text-xs text-gray-600 mt-0.5">{txn.method}</p>
                  </div>
                </div>
                <div className="text-right">
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
                  <span className="text-xs text-gray-500">{txn.walletType === 'upi' ? '💳' : txn.walletType === 'e-money' ? '💰' : '🏛️'}</span>
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