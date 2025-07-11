import React, { useState } from 'react';
import { TrendingUp, Calendar, AlertTriangle, Activity } from 'lucide-react';
import BarChart from '../components/charts/BarChart';
import LineChart from '../components/charts/LineChart';

const Clusters: React.FC = () => {
  const [selectedWindow, setSelectedWindow] = useState('7');

  const clusterData = {
    labels: ['Jan 15-21', 'Jan 22-28', 'Jan 29-Feb 4', 'Feb 5-11', 'Feb 12-18'],
    values: [15, 18, 12, 20, 8],
    colors: ['#EF4444', '#EF4444', '#F59E0B', '#EF4444', '#10B981']
  };

  const dailyTrendData = {
    labels: ['Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20', 'Jan 21', 'Jan 22', 'Jan 23', 'Jan 24', 'Jan 25', 'Jan 26', 'Jan 27', 'Jan 28'],
    values: [2, 3, 1, 2, 3, 2, 2, 4, 3, 2, 3, 3, 2, 1],
    color: '#3B82F6'
  };

  const clusterDetails = [
    {
      period: 'Jan 22-28',
      totalCrimes: 18,
      avgDaily: 2.6,
      riskLevel: 'High',
      status: 'Active Cluster',
      mainTypes: ['Theft', 'Burglary', 'Assault'],
      locations: ['Downtown', 'Commercial Zone'],
      peakDay: 'Jan 22',
      description: 'Significant spike in criminal activity during this period'
    },
    {
      period: 'Feb 5-11',
      totalCrimes: 20,
      avgDaily: 2.9,
      riskLevel: 'Critical',
      status: 'High Alert',
      mainTypes: ['Burglary', 'Theft', 'Vandalism'],
      locations: ['Residential Area', 'Park District'],
      peakDay: 'Feb 7',
      description: 'Highest activity cluster detected in the dataset'
    },
    {
      period: 'Jan 15-21',
      totalCrimes: 15,
      avgDaily: 2.1,
      riskLevel: 'Medium',
      status: 'Resolved',
      mainTypes: ['Theft', 'Vandalism'],
      locations: ['Downtown', 'Shopping Center'],
      peakDay: 'Jan 19',
      description: 'Initial cluster showing moderate activity levels'
    },
    {
      period: 'Jan 29-Feb 4',
      totalCrimes: 12,
      avgDaily: 1.7,
      riskLevel: 'Low',
      status: 'Declining',
      mainTypes: ['Vandalism', 'Theft'],
      locations: ['Park District'],
      peakDay: 'Feb 1',
      description: 'Reduced activity following previous high-activity period'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crime Cluster Analysis</h1>
          <p className="text-gray-600 mt-2">Temporal clustering and high-activity period detection</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedWindow}
            onChange={(e) => setSelectedWindow(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="3">3-Day Window</option>
            <option value="7">7-Day Window</option>
            <option value="14">14-Day Window</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Clusters</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
              <p className="text-sm text-red-600">High activity periods</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Peak Cluster</p>
              <p className="text-2xl font-bold text-gray-900">20</p>
              <p className="text-sm text-blue-600">crimes in 7 days</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Average Window</p>
              <p className="text-2xl font-bold text-gray-900">14.6</p>
              <p className="text-sm text-yellow-600">crimes per period</p>
            </div>
            <Activity className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Detection Rate</p>
              <p className="text-2xl font-bold text-gray-900">80%</p>
              <p className="text-sm text-green-600">clusters identified</p>
            </div>
            <Calendar className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <BarChart 
          data={clusterData} 
          title="Crime Clusters (7-day sliding window)" 
        />
        <LineChart 
          data={dailyTrendData} 
          title="Daily Crime Trend Analysis" 
        />
      </div>

      {/* Cluster Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Detected Crime Clusters</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          {clusterDetails.map((cluster, index) => (
            <div key={cluster.period} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{cluster.period}</h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  cluster.riskLevel === 'Critical' ? 'bg-red-100 text-red-800' :
                  cluster.riskLevel === 'High' ? 'bg-orange-100 text-orange-800' :
                  cluster.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {cluster.riskLevel}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{cluster.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-sm text-gray-600">Total Crimes</div>
                  <div className="text-xl font-bold text-gray-900">{cluster.totalCrimes}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Daily Average</div>
                  <div className="text-xl font-bold text-gray-900">{cluster.avgDaily}</div>
                </div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    cluster.status === 'High Alert' ? 'text-red-600' :
                    cluster.status === 'Active Cluster' ? 'text-orange-600' :
                    cluster.status === 'Declining' ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {cluster.status}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Peak Day:</span>
                  <span className="font-medium text-gray-900">{cluster.peakDay}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div>
                  <span className="text-sm text-gray-600">Main Crime Types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cluster.mainTypes.map((type) => (
                      <span key={type} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Affected Locations:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {cluster.locations.map((location) => (
                      <span key={location} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {location}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm Explanation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Sliding Window Cluster Detection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Algorithm Steps</h3>
            <ol className="space-y-2 text-sm text-gray-600">
              <li><strong>1. Data Preparation:</strong> Group crimes by date</li>
              <li><strong>2. Window Creation:</strong> Create 7-day sliding windows</li>
              <li><strong>3. Frequency Calculation:</strong> Count crimes per window</li>
              <li><strong>4. Threshold Detection:</strong> Identify above-average periods</li>
              <li><strong>5. Cluster Classification:</strong> Rank by activity level</li>
            </ol>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Technical Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Time Complexity:</strong> O(n) where n = number of days</li>
              <li>• <strong>Space Complexity:</strong> O(n) for date storage</li>
              <li>• <strong>Window Size:</strong> Configurable (3, 7, 14 days)</li>
              <li>• <strong>Threshold:</strong> Above dataset average</li>
              <li>• <strong>Output:</strong> Ranked list of high-activity periods</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-800 mb-2">Practical Applications</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div>
              <strong>Law Enforcement:</strong> Deploy additional patrols during predicted high-activity periods
            </div>
            <div>
              <strong>Resource Planning:</strong> Allocate emergency services based on cluster patterns
            </div>
            <div>
              <strong>Prevention:</strong> Implement targeted interventions in identified time windows
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clusters;