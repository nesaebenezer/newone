import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, trend }) => (
  <div className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow" style={{ borderLeftColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {trend && (
          <div className={`flex items-center gap-1 text-xs mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
            <span>{trend.isPositive ? '↗' : '↘'}</span>
            <span>{Math.abs(trend.value)}% vs last period</span>
          </div>
        )}
      </div>
      <Icon className="w-8 h-8" style={{ color }} />
    </div>
  </div>
);

export default StatCard;