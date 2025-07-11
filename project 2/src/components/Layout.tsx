import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, BarChart3, MapPin, Clock, TrendingUp, Activity, Database, Settings, Users, FileText } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Activity },
    { name: 'Crime Types', href: '/crime-types', icon: BarChart3 },
    { name: 'Hotspots', href: '/hotspots', icon: MapPin },
    { name: 'Time Patterns', href: '/time-patterns', icon: Clock },
    { name: 'Clusters', href: '/clusters', icon: TrendingUp },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Data Management', href: '/data', icon: Database },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Search className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Crime Pattern Detection System</h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                CSE Internship Project
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* System Status */}
          <div className="mt-8 mx-4 p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center gap-2 text-green-700 text-sm font-medium mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              System Status
            </div>
            <div className="text-xs text-green-600 space-y-1">
              <div>• Data Loaded: 40 records</div>
              <div>• Analysis: Complete</div>
              <div>• Last Update: Just now</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <main className="p-8">
            {children}
          </main>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div>
              Data Structures & Algorithms: Hash Maps, Frequency Counting, Sliding Window, Linear Search
            </div>
            <div>
              Academic Project - 2nd Year CSE
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;