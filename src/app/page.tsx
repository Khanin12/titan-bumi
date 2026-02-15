'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/sidebar';
import {
  TrendingUp,
  Users,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const stats = [
  { label: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign, color: 'text-blue-500' },
  { label: 'Subscriptions', value: '+2350', change: '+180.1%', icon: Users, color: 'text-purple-500' },
  { label: 'Sales', value: '+12,234', change: '+19%', icon: ShoppingBag, color: 'text-green-500' },
  { label: 'Active Now', value: '+573', change: '+201', icon: TrendingUp, color: 'text-orange-500' },
];

export default function DashboardPage() {
  return (
    <>

      <div className="p-6 space-y-8">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-1"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground">Dashboard Overview</h2>
          <p className="text-muted-foreground">Welcome back, here's what's happening today.</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md transition-shadow group lg:h-auto h-40 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-lg bg-accent group-hover:bg-primary/10 transition-colors`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <span className={cn(
                  "text-xs font-medium px-2 py-1 rounded-full",
                  stat.change.startsWith('+') ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                )}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          <div className="lg:col-span-2 p-6 bg-card border border-border rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-foreground">Revenue Analytics</h3>
                <p className="text-sm text-muted-foreground">Monthly growth performance</p>
              </div>
              <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-primary inline-block mr-1"></span>
                <span className="text-xs font-medium text-muted-foreground">Revenue</span>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(120, 120, 120, 0.1)" />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#888', fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#888', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--card)',
                      borderColor: 'var(--border)',
                      borderRadius: '12px',
                      fontSize: '12px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    fillOpacity={1}
                    fill="url(#colorValue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side Card / Recent Activity */}
          <div className="p-6 bg-card border border-border rounded-2xl shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-foreground">Recent Activity</h3>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <Users className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-foreground">New user registered</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                </div>
              ))}
            </div>
            <button className="w-full py-2 rounded-xl bg-accent hover:bg-primary hover:text-primary-foreground transition-all duration-200 text-sm font-medium">
              View All Activity
            </button>
          </div>
        </motion.div>
      </div>
    </>
  );
}


// Helper to get cn in this file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
