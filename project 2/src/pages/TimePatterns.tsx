import React, { useState } from 'react';
import { Clock, Sun, Moon, Sunset, Sunrise } from 'lucide-react';
import LineChart from '../components/charts/LineChart';
import BarChart from '../components/charts/BarChart';

const TimePatterns: React.FC = () => {
  const [selectedView, setSelectedView] = useState('hourly');

  const hourlyData = {
    labels: Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`),
    values: [1, 2, 3, 1, 2, 1, 2, 3, 2, 1, 2, 3, 2, 1, 3, 2, 1, 2, 3, 2, 1, 2, 1, 1],
    color: '#3B82F6'
  };

  const periodData = {
    labels: ['Night (00-06)', 'Morning (06-12)', 'Afternoon (12-18)', 'Evening (18-24)'],
    values: [12, 8, 10, 10],
    colors: ['#1E293B', '#F59E0B', '#10B981', '#8B5CF6']
  };

  const dayOfWeekData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    values: [5, 4, 6, 5, 8, 7, 5],
    colors: ['#3B82F6', '#3B82F6', '#3B82F6', '#3B82F6', '#EF4444', '#EF4444', '#3B82F6']
  };

  const timeInsights = [
    {
      period: 'Peak Hours',
      time: '18:00 - 22:00',
      crimes: 8,
      icon: Sunset,
      color: '#EF4444',
      description: 'Evening rush hour with highest crime activity'
    },
    {
      period: 'Safest Hours',
      time: '04:00 - 08:00',
      crimes: 2,
      icon: Sunrise,
      color: '#10B981',
      description: 'Early morning hours with minimal activity'
    },
    {
      period: 'Day Activity',
      time: '12:00 - 18:00',
      crimes: 10,
      icon: Sun,
      color: '#F59E0B',
      description: 'Afternoon period with moderate crime levels'
    },
    {
      period: 'Night Activity',
      time: '00:00 - 06:00',
      crimes: 12,
      icon: Moon,
      color: '#8B5CF6',
      description: 'Late night period with burglary incidents'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Time Pattern Analysis</h1>
          <p className="text-gray-600 mt-2">Temporal crime distribution and timing insights</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedView}
            onChange={(e) => setSelectedView(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="hourly">Hourly View</option>
            <option value="periods">Time Periods</option>
            <option value="weekly">Day of Week</option>
          </select>
        </div>
      </div>

      {/* Time Period Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {timeInsights.map((insight) => (
          <div key={insight.period} className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: insight.color }}>
            <div className="flex items-center justify-between mb-3">
              <insight.icon className="w-8 h-8" style={{ color: insight.color }} />
              <span className="text-2xl font-bold text-gray-900">{insight.crimes}</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{insight.period}</h3>
            <p className="text-sm font-medium text-gray-600 mb-2">{insight.time}</p>
            <p className="text-xs text-gray-500">{insight.description}</p>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 gap-8">
        {selectedView === 'hourly' && (
          <LineChart 
            data={hourlyData} 
            title="24-Hour Crime Distribution" 
          />
        )}
        {selectedView === 'periods' && (
          <BarChart 
            data={periodData} 
            title="Crime Distribution by Time Period" 
          />
        )}
        {selectedView === 'weekly' && (
          <BarChart 
            data={dayOfWeekData} 
            title="Crime Distribution by Day of Week" 
          />
        )}
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Peak Hours Analysis */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Peak Hours Analysis</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <div>
                <div className="font-medium text-red-800">High Activity Period</div>
                <div className="text-sm text-red-600">18:00 - 22:00</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-red-800">8 crimes</div>
                <div className="text-xs text-red-600">20% of daily total</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
              <div>
                <div className="font-medium text-yellow-800">Moderate Activity</div>
                <div className="text-sm text-yellow-600">12:00 - 18:00</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-yellow-800">10 crimes</div>
                <div className="text-xs text-yellow-600">25% of daily total</div>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <div>
                <div className="font-medium text-green-800">Low Activity Period</div>
                <div className="text-sm text-green-600">04:00 - 08:00</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-green-800">2 crimes</div>
                <div className="text-xs text-green-600">5% of daily total</div>
              </div>
            </div>
          </div>
        </div>

        {/* Crime Type by Time */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Crime Types by Time Period</h2>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <div className="font-medium text-gray-800">Morning (06:00 - 12:00)</div>
              <div className="text-sm text-gray-600">Primary: Theft, Vandalism</div>
              <div className="text-xs text-gray-500">Business hours, commuter activity</div>
            </div>
            
            <div className="border-l-4 border-green-500 pl-4">
              <div className="font-medium text-gray-800">Afternoon (12:00 - 18:00)</div>
              <div className="text-sm text-gray-600">Primary: Theft, Fraud</div>
              <div className="text-xs text-gray-500">Shopping hours, high foot traffic</div>
            </div>
            
            <div className="border-l-4 border-red-500 pl-4">
              <div className="font-medium text-gray-800">Evening (18:00 - 24:00)</div>
              <div className="text-sm text-gray-600">Primary: Assault, Theft</div>
              <div className="text-xs text-gray-500">Entertainment district activity</div>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <div className="font-medium text-gray-800">Night (00:00 - 06:00)</div>
              <div className="text-sm text-gray-600">Primary: Burglary, Vandalism</div>
              <div className="text-xs text-gray-500">Reduced surveillance, fewer witnesses</div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Pattern Analysis */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Weekly Pattern Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">Weekdays</div>
            <div className="text-sm text-blue-700 mb-2">Monday - Thursday</div>
            <div className="text-xs text-gray-600">Consistent moderate activity</div>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">Weekends</div>
            <div className="text-sm text-red-700 mb-2">Friday - Saturday</div>
            <div className="text-xs text-gray-600">Peak activity periods</div>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">Sunday</div>
            <div className="text-sm text-green-700 mb-2">Lowest Activity</div>
            <div className="text-xs text-gray-600">Quietest day of the week</div>
          </div>
        </div>
      </div>

      {/* Algorithm Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Time Pattern Detection Algorithm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Implementation</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Time Parsing:</strong> Extract hour from timestamp</li>
              <li>• <strong>Frequency Counting:</strong> Hash map for O(1) operations</li>
              <li>• <strong>Period Grouping:</strong> Categorize hours into periods</li>
              <li>• <strong>Pattern Recognition:</strong> Identify peak and low activity times</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Applications</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Patrol scheduling optimization</li>
              <li>• Resource allocation by time</li>
              <li>• Preventive measure timing</li>
              <li>• Community awareness programs</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimePatterns;