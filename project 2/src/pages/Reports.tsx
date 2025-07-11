import React, { useState } from 'react';
import { FileText, Download, Calendar, BarChart3, TrendingUp, AlertCircle } from 'lucide-react';
import { crimeData } from '../data/crimeData';
import { ReportGenerator, ReportData } from '../utils/reportGenerator';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('summary');
  const [dateRange, setDateRange] = useState('month');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGeneratedReport, setLastGeneratedReport] = useState<ReportData | null>(null);

  const reportGenerator = new ReportGenerator(crimeData);

  const reportTypes = [
    {
      id: 'summary',
      title: 'Crime Summary Report',
      description: 'Comprehensive overview of all crime statistics',
      icon: BarChart3,
      lastGenerated: '2024-02-15 10:30 AM'
    },
    {
      id: 'trends',
      title: 'Trend Analysis Report',
      description: 'Time-based patterns and trending analysis',
      icon: TrendingUp,
      lastGenerated: '2024-02-15 09:15 AM'
    },
    {
      id: 'hotspots',
      title: 'Hotspot Analysis Report',
      description: 'Geographic crime distribution and hotspots',
      icon: AlertCircle,
      lastGenerated: '2024-02-14 04:45 PM'
    },
    {
      id: 'detailed',
      title: 'Detailed Crime Log',
      description: 'Complete record of all crime incidents',
      icon: FileText,
      lastGenerated: '2024-02-15 11:00 AM'
    }
  ];

  const generateReport = (reportType: string) => {
    setIsGenerating(true);
    
    // Simulate report generation delay
    setTimeout(() => {
      let report: ReportData;
      
      switch (reportType) {
        case 'summary':
          report = reportGenerator.generateSummaryReport(dateRange);
          break;
        case 'trends':
          report = reportGenerator.generateTrendReport(dateRange);
          break;
        case 'hotspots':
          report = reportGenerator.generateHotspotReport(dateRange);
          break;
        case 'detailed':
          report = reportGenerator.generateDetailedLog(dateRange);
          break;
        default:
          report = reportGenerator.generateSummaryReport(dateRange);
      }
      
      setLastGeneratedReport(report);
      setIsGenerating(false);
    }, 1500);
  };

  const downloadReport = (report: ReportData) => {
    reportGenerator.downloadReport(report);
  };

  const summaryData = {
    totalCrimes: 40,
    crimeTypes: 5,
    locations: 5,
    timeSpan: 'January 2024',
    topCrime: 'Theft (30%)',
    topLocation: 'Downtown (20%)',
    peakTime: '18:00-22:00',
    trend: '+12% vs previous month'
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Crime Reports</h1>
        <p className="text-gray-600 mt-2">Generate and download comprehensive crime analysis reports</p>
      </div>

      {/* Report Generation Controls */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="summary">Crime Summary</option>
              <option value="trends">Trend Analysis</option>
              <option value="hotspots">Hotspot Analysis</option>
              <option value="detailed">Detailed Log</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={() => generateReport(selectedReport)}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Generate Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((report) => (
          <div key={report.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <report.icon className="w-8 h-8 text-blue-600" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
                  <p className="text-sm text-gray-600">{report.description}</p>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-4">
              Last generated: {report.lastGenerated}
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => generateReport(report.id)}
                disabled={isGenerating}
                className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FileText className="w-4 h-4" />
                {isGenerating ? 'Generating...' : 'Generate'}
              </button>
              <button 
                onClick={() => lastGeneratedReport && downloadReport(lastGeneratedReport)}
                disabled={!lastGeneratedReport}
                className="flex items-center gap-2 px-3 py-2 bg-gray-600 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Preview */}
      {lastGeneratedReport && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Report Preview - {lastGeneratedReport.title}</h2>
            <button
              onClick={() => downloadReport(lastGeneratedReport)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download Report
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{lastGeneratedReport.summary.totalCrimes}</div>
              <div className="text-sm text-blue-700">Total Crimes</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{lastGeneratedReport.summary.crimeTypes}</div>
              <div className="text-sm text-green-700">Crime Types</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">{lastGeneratedReport.summary.locations}</div>
              <div className="text-sm text-yellow-700">Locations</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <div className="text-2xl font-bold text-red-600">{lastGeneratedReport.period}</div>
              <div className="text-sm text-red-700">Period</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">Report Information</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Generated:</span>
                  <span className="font-medium">{lastGeneratedReport.generatedAt}</span>
                </div>
                <div className="flex justify-between">
                  <span>Period:</span>
                  <span className="font-medium">{lastGeneratedReport.period}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date Range:</span>
                  <span className="font-medium">{lastGeneratedReport.summary.dateRange}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-gray-800">Top Crime Types</h3>
              {lastGeneratedReport.analysis.crimeTypes && (
                <div className="space-y-2 text-sm text-gray-600">
                  {lastGeneratedReport.analysis.crimeTypes.slice(0, 3).map((item: any, index: number) => (
                    <div key={index} className="flex justify-between">
                      <span>{item.type}:</span>
                      <span className="font-medium">{item.count} ({item.percentage}%)</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Report History */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Report History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { type: 'Crime Summary', date: '2024-02-15 10:30 AM', period: 'January 2024', status: 'Ready' },
                { type: 'Trend Analysis', date: '2024-02-15 09:15 AM', period: 'Q4 2023', status: 'Ready' },
                { type: 'Hotspot Analysis', date: '2024-02-14 04:45 PM', period: 'Last 30 days', status: 'Ready' },
                { type: 'Detailed Log', date: '2024-02-14 02:20 PM', period: 'Last Week', status: 'Ready' },
              ].map((report, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {report.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {report.period}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      {report.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button 
                      onClick={() => generateReport(report.type.toLowerCase().replace(' ', ''))}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      Generate
                    </button>
                    <button 
                      onClick={() => lastGeneratedReport && downloadReport(lastGeneratedReport)}
                      disabled={!lastGeneratedReport}
                      className="text-blue-600 hover:text-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Download
                    </button>
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

export default Reports;