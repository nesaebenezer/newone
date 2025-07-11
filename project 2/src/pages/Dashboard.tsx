import React, { useState, useEffect } from 'react';
import { Activity, BarChart3, MapPin, TrendingUp, AlertTriangle, Clock } from 'lucide-react';
import StatCard from '../components/StatCard';
import BarChart from '../components/charts/BarChart';
import PieChart from '../components/charts/PieChart';
import LineChart from '../components/charts/LineChart';

interface AnalysisData {
  crime_types: any;
  hotspots: any;
  time_patterns: any;
  clusters: any;
  summary: any;
}

const Dashboard: React.FC = () => {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);

  const generateSampleData = (): AnalysisData => {
    return {
      crime_types: {
        type: 'bar',
        title: 'Most Frequent Crime Types',
        data: {
          labels: ['Theft', 'Burglary', 'Vandalism', 'Assault', 'Fraud'],
          values: [12, 8, 6, 5, 3],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        }
      },
      hotspots: {
        type: 'pie',
        title: 'Crime Hotspots by Location',
        data: {
          labels: ['Downtown', 'Residential Area', 'Commercial Zone', 'Shopping Center', 'Park District'],
          values: [8, 7, 6, 4, 5],
          colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
        }
      },
      time_patterns: {
        type: 'line',
        title: 'Crime Patterns by Hour',
        data: {
          labels: Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`),
          values: [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 3, 2, 1, 2, 3, 2, 1, 2, 1, 1],
          color: '#3B82F6'
        }
      },
      clusters: {
        type: 'bar',
        title: 'Crime Clusters (7-day windows)',
        data: {
          labels: ['Jan 15-21', 'Jan 22-28', 'Jan 29-Feb 4'],
          values: [15, 18, 12],
          colors: ['#EF4444', '#EF4444', '#EF4444']
        }
      },
      summary: {
        total_crimes: 40,
        unique_types: 5,
        unique_locations: 5,
        most_common_crime: 'Theft',
        top_hotspot: 'Downtown'
      }
    };
  };

  useEffect(() => {
    const data = generateSampleData();
    setAnalysisData(data);
  }, []);

  if (!analysisData) {
    return <div className="text-center py-8">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Crime Analysis Dashboard</h1>
        <p className="text-gray-600 mt-2">Comprehensive overview of crime patterns and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Crimes"
          value={analysisData.summary.total_crimes}
          icon={Activity}
          color="#3B82F6"
          trend={{ value: 12, isPositive: false }}
        />
        <StatCard
          title="Crime Types"
          value={analysisData.summary.unique_types}
          icon={BarChart3}
          color="#10B981"
        />
        <StatCard
          title="Active Locations"
          value={analysisData.summary.unique_locations}
          icon={MapPin}
          color="#F59E0B"
        />
        <StatCard
          title="High-Risk Periods"
          value={3}
          icon={AlertTriangle}
          color="#EF4444"
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Quick Insights */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">{analysisData.summary.most_common_crime}</div>
            <div className="text-sm text-blue-700">Most Common Crime</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">{analysisData.summary.top_hotspot}</div>
            <div className="text-sm text-red-700">Top Hotspot</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <div className="text-2xl font-bold text-yellow-600">Evening</div>
            <div className="text-sm text-yellow-700">Peak Crime Time</div>
          </div>
        </div>
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChart 
          data={analysisData.crime_types.data} 
          title="Crime Type Distribution" 
        />
        <PieChart 
          data={analysisData.hotspots.data} 
          title="Location Breakdown" 
        />
      </div>

      {/* Time Analysis */}
      <div className="grid grid-cols-1 gap-8">
        <LineChart 
          data={analysisData.time_patterns.data} 
          title="24-Hour Crime Pattern Analysis" 
        />
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
        <div className="space-y-3">
          {[
            { time: '2 hours ago', event: 'New theft reported in Downtown area', type: 'alert' },
            { time: '4 hours ago', event: 'Pattern analysis completed for January data', type: 'info' },
            { time: '6 hours ago', event: 'High activity cluster detected: Jan 22-28', type: 'warning' },
            { time: '1 day ago', event: 'Monthly crime report generated', type: 'success' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className={`w-2 h-2 rounded-full ${
                activity.type === 'alert' ? 'bg-red-500' :
                activity.type === 'warning' ? 'bg-yellow-500' :
                activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1">
                <div className="text-sm text-gray-900">{activity.event}</div>
                <div className="text-xs text-gray-500">{activity.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;