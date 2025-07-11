import React, { useState } from 'react';
import { BarChart3, TrendingUp, AlertCircle, Info } from 'lucide-react';
import BarChart from '../components/charts/BarChart';

const CrimeTypes: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const crimeData = {
    labels: ['Theft', 'Burglary', 'Vandalism', 'Assault', 'Fraud', 'Drug Offense', 'Robbery'],
    values: [12, 8, 6, 5, 3, 2, 1],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316']
  };

  const crimeDetails = [
    {
      type: 'Theft',
      count: 12,
      percentage: 32.4,
      trend: '+15%',
      severity: 'Medium',
      description: 'Property theft including shoplifting and pickpocketing',
      commonLocations: ['Downtown', 'Shopping Centers'],
      peakHours: '14:00 - 18:00'
    },
    {
      type: 'Burglary',
      count: 8,
      percentage: 21.6,
      trend: '-8%',
      severity: 'High',
      description: 'Breaking and entering into buildings',
      commonLocations: ['Residential Areas'],
      peakHours: '02:00 - 06:00'
    },
    {
      type: 'Vandalism',
      count: 6,
      percentage: 16.2,
      trend: '+5%',
      severity: 'Low',
      description: 'Property damage and graffiti',
      commonLocations: ['Park District', 'Public Buildings'],
      peakHours: '20:00 - 24:00'
    },
    {
      type: 'Assault',
      count: 5,
      percentage: 13.5,
      trend: '-12%',
      severity: 'High',
      description: 'Physical attacks and violent confrontations',
      commonLocations: ['Commercial Zone', 'Entertainment District'],
      peakHours: '22:00 - 02:00'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crime Type Analysis</h1>
          <p className="text-gray-600 mt-2">Detailed breakdown of crime categories and patterns</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="month">This Month</option>
            <option value="week">This Week</option>
            <option value="day">Today</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Most Frequent</p>
              <p className="text-xl font-bold text-gray-900">Theft</p>
              <p className="text-sm text-blue-600">32.4% of all crimes</p>
            </div>
            <BarChart3 className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Highest Severity</p>
              <p className="text-xl font-bold text-gray-900">Burglary</p>
              <p className="text-sm text-red-600">High risk category</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Trending Up</p>
              <p className="text-xl font-bold text-gray-900">Theft</p>
              <p className="text-sm text-green-600">+15% increase</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Categories</p>
              <p className="text-xl font-bold text-gray-900">7</p>
              <p className="text-sm text-yellow-600">Active crime types</p>
            </div>
            <Info className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Main Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <BarChart 
            data={crimeData} 
            title="Crime Type Frequency Distribution" 
          />
        </div>
        
        {/* Algorithm Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">Analysis Method</h3>
          <div className="space-y-4 text-sm text-gray-600">
            <div>
              <h4 className="font-medium text-gray-800">Hash Map Implementation</h4>
              <p>Uses O(1) frequency counting for crime type analysis</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Sorting Algorithm</h4>
              <p>O(n log n) merge sort for ranking by frequency</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-800">Time Complexity</h4>
              <p>Overall: O(n log n) for complete analysis</p>
            </div>
            <div className="pt-2 border-t">
              <h4 className="font-medium text-gray-800">Data Structure Benefits</h4>
              <ul className="list-disc list-inside space-y-1 text-xs">
                <li>Fast lookups and updates</li>
                <li>Memory efficient storage</li>
                <li>Scalable to large datasets</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Crime Analysis */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Detailed Crime Type Analysis</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crime Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Peak Hours</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Common Locations</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crimeDetails.map((crime, index) => (
                <tr key={crime.type} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-3"
                        style={{ backgroundColor: crimeData.colors[index] }}
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{crime.type}</div>
                        <div className="text-sm text-gray-500">{crime.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crime.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crime.percentage}%</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm ${crime.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'}`}>
                      {crime.trend}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      crime.severity === 'High' ? 'bg-red-100 text-red-800' :
                      crime.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {crime.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{crime.peakHours}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {crime.commonLocations.join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CrimeTypes;