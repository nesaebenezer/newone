import React, { useState } from 'react';
import { MapPin, AlertTriangle, TrendingUp, Users } from 'lucide-react';
import PieChart from '../components/charts/PieChart';
import BarChart from '../components/charts/BarChart';

const Hotspots: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState('all');

  const locationData = {
    labels: ['Downtown', 'Residential Area', 'Commercial Zone', 'Shopping Center', 'Park District'],
    values: [8, 7, 6, 4, 5],
    colors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
  };

  const locationDetails = [
    {
      name: 'Downtown',
      crimes: 8,
      riskLevel: 'High',
      population: '15,000',
      crimeRate: '5.3 per 1000',
      mainCrimes: ['Theft', 'Assault'],
      trend: '+12%',
      lastIncident: '2 hours ago',
      description: 'Business district with high foot traffic'
    },
    {
      name: 'Residential Area',
      crimes: 7,
      riskLevel: 'Medium',
      population: '25,000',
      crimeRate: '2.8 per 1000',
      mainCrimes: ['Burglary', 'Vandalism'],
      trend: '-5%',
      lastIncident: '1 day ago',
      description: 'Suburban neighborhoods and housing complexes'
    },
    {
      name: 'Commercial Zone',
      crimes: 6,
      riskLevel: 'Medium',
      population: '8,000',
      crimeRate: '7.5 per 1000',
      mainCrimes: ['Assault', 'Theft'],
      trend: '+8%',
      lastIncident: '6 hours ago',
      description: 'Office buildings and business establishments'
    },
    {
      name: 'Shopping Center',
      crimes: 4,
      riskLevel: 'Low',
      population: '12,000',
      crimeRate: '3.3 per 1000',
      mainCrimes: ['Theft', 'Fraud'],
      trend: '-15%',
      lastIncident: '3 days ago',
      description: 'Retail stores and shopping complexes'
    },
    {
      name: 'Park District',
      crimes: 5,
      riskLevel: 'Low',
      population: '5,000',
      crimeRate: '10.0 per 1000',
      mainCrimes: ['Vandalism', 'Drug Offense'],
      trend: '+20%',
      lastIncident: '12 hours ago',
      description: 'Public parks and recreational areas'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Crime Hotspot Analysis</h1>
          <p className="text-gray-600 mt-2">Geographic distribution and location-based crime patterns</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Locations</option>
            <option value="high-risk">High Risk Only</option>
            <option value="trending">Trending Up</option>
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Highest Risk</p>
              <p className="text-xl font-bold text-gray-900">Downtown</p>
              <p className="text-sm text-red-600">8 incidents</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Locations</p>
              <p className="text-xl font-bold text-gray-900">5</p>
              <p className="text-sm text-blue-600">Active areas</p>
            </div>
            <MapPin className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Trending Up</p>
              <p className="text-xl font-bold text-gray-900">Park District</p>
              <p className="text-sm text-yellow-600">+20% increase</p>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Population Covered</p>
              <p className="text-xl font-bold text-gray-900">65K</p>
              <p className="text-sm text-green-600">Total residents</p>
            </div>
            <Users className="w-8 h-8 text-green-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PieChart 
          data={locationData} 
          title="Crime Distribution by Location" 
        />
        <BarChart 
          data={locationData} 
          title="Crime Count by Hotspot" 
        />
      </div>

      {/* Location Details */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Detailed Location Analysis</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
          {locationDetails.map((location, index) => (
            <div key={location.name} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: locationData.colors[index] }}
                  />
                  <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  location.riskLevel === 'High' ? 'bg-red-100 text-red-800' :
                  location.riskLevel === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {location.riskLevel} Risk
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">{location.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Crimes:</span>
                  <span className="text-sm font-medium text-gray-900">{location.crimes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Population:</span>
                  <span className="text-sm font-medium text-gray-900">{location.population}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Crime Rate:</span>
                  <span className="text-sm font-medium text-gray-900">{location.crimeRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Trend:</span>
                  <span className={`text-sm font-medium ${
                    location.trend.startsWith('+') ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {location.trend}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last Incident:</span>
                  <span className="text-sm font-medium text-gray-900">{location.lastIncident}</span>
                </div>
                <div className="pt-2 border-t">
                  <span className="text-sm text-gray-600">Main Crime Types:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {location.mainCrimes.map((crime) => (
                      <span key={crime} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {crime}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Algorithm Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Hotspot Detection Algorithm</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Implementation Details</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Hash Map:</strong> O(1) location frequency counting</li>
              <li>• <strong>Sorting:</strong> O(n log n) for ranking by crime count</li>
              <li>• <strong>Risk Calculation:</strong> Crime rate per population</li>
              <li>• <strong>Trend Analysis:</strong> Comparative period analysis</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Use Cases</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Police patrol route optimization</li>
              <li>• Resource allocation planning</li>
              <li>• Community safety awareness</li>
              <li>• Urban planning considerations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hotspots;