import React, { useState } from 'react';
import { Database, Upload, Download, RefreshCw, AlertCircle, CheckCircle, FileText } from 'lucide-react';

const DataManagement: React.FC = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const dataStats = {
    totalRecords: 40,
    lastUpdated: '2024-02-15 10:30 AM',
    fileSize: '2.4 KB',
    dataQuality: 98.5,
    missingFields: 0,
    duplicates: 0
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsProcessing(true);
      // Simulate file processing
      setTimeout(() => {
        setIsProcessing(false);
        setUploadStatus('success');
        setTimeout(() => setUploadStatus('idle'), 3000);
      }, 2000);
    }
  };

  const runAnalysis = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert('Analysis completed successfully!');
    }, 3000);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Data Management</h1>
        <p className="text-gray-600 mt-2">Manage crime data, upload new datasets, and monitor data quality</p>
      </div>

      {/* Data Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Records</p>
              <p className="text-2xl font-bold text-gray-900">{dataStats.totalRecords}</p>
              <p className="text-sm text-blue-600">Crime incidents</p>
            </div>
            <Database className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Data Quality</p>
              <p className="text-2xl font-bold text-gray-900">{dataStats.dataQuality}%</p>
              <p className="text-sm text-green-600">Excellent quality</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">File Size</p>
              <p className="text-2xl font-bold text-gray-900">{dataStats.fileSize}</p>
              <p className="text-sm text-yellow-600">Current dataset</p>
            </div>
            <FileText className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Upload New Data</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Upload CSV File</h3>
          <p className="text-gray-600 mb-4">
            Select a CSV file with crime data. Required columns: id, date, time, type, location
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
          >
            <Upload className="w-4 h-4" />
            Choose File
          </label>
          
          {isProcessing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-blue-600">
              <RefreshCw className="w-4 h-4 animate-spin" />
              Processing file...
            </div>
          )}
          
          {uploadStatus === 'success' && (
            <div className="mt-4 flex items-center justify-center gap-2 text-green-600">
              <CheckCircle className="w-4 h-4" />
              File uploaded successfully!
            </div>
          )}
        </div>
      </div>

      {/* Current Dataset Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Current Dataset Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">File Name:</span>
              <span className="font-medium text-gray-900">crime_data.csv</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Last Updated:</span>
              <span className="font-medium text-gray-900">{dataStats.lastUpdated}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Records:</span>
              <span className="font-medium text-gray-900">{dataStats.totalRecords}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">File Size:</span>
              <span className="font-medium text-gray-900">{dataStats.fileSize}</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Data Quality Score:</span>
              <span className="font-medium text-green-600">{dataStats.dataQuality}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Missing Fields:</span>
              <span className="font-medium text-gray-900">{dataStats.missingFields}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duplicate Records:</span>
              <span className="font-medium text-gray-900">{dataStats.duplicates}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Date Range:</span>
              <span className="font-medium text-gray-900">Jan 15 - Feb 3, 2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Data Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={runAnalysis}
          disabled={isProcessing}
          className="flex items-center justify-center gap-2 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isProcessing ? (
            <RefreshCw className="w-5 h-5 animate-spin" />
          ) : (
            <RefreshCw className="w-5 h-5" />
          )}
          {isProcessing ? 'Processing...' : 'Run Analysis'}
        </button>
        
        <button className="flex items-center justify-center gap-2 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Download className="w-5 h-5" />
          Export Data
        </button>
        
        <button className="flex items-center justify-center gap-2 p-4 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors">
          <AlertCircle className="w-5 h-5" />
          Validate Data
        </button>
        
        <button className="flex items-center justify-center gap-2 p-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
          <Database className="w-5 h-5" />
          Backup Data
        </button>
      </div>

      {/* Data Schema */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Data Schema</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Column</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Required</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Example</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { column: 'id', type: 'Integer', required: 'Yes', description: 'Unique identifier for each crime record', example: '1, 2, 3...' },
                { column: 'date', type: 'Date', required: 'Yes', description: 'Date when the crime occurred', example: '2024-01-15' },
                { column: 'time', type: 'Time', required: 'Yes', description: 'Time when the crime occurred', example: '14:30' },
                { column: 'type', type: 'String', required: 'Yes', description: 'Type/category of the crime', example: 'Theft, Burglary' },
                { column: 'location', type: 'String', required: 'Yes', description: 'Location where the crime occurred', example: 'Downtown, Park District' },
              ].map((field, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {field.column}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {field.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      field.required === 'Yes' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {field.required}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {field.description}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {field.example}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">System Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Data Processing</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Hash Maps:</strong> O(1) frequency counting</li>
              <li>• <strong>Sorting:</strong> O(n log n) for pattern ranking</li>
              <li>• <strong>Search:</strong> O(n) linear search implementation</li>
              <li>• <strong>Clustering:</strong> Sliding window algorithm</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">File Support</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• CSV files with UTF-8 encoding</li>
              <li>• Maximum file size: 10MB</li>
              <li>• Required columns: id, date, time, type, location</li>
              <li>• Date format: YYYY-MM-DD</li>
              <li>• Time format: HH:MM</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;