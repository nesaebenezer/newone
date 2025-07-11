import React, { useState } from 'react';
import { Search as SearchIcon, Filter, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { crimeData, CrimeRecord } from '../data/crimeData';
import { CrimeSearchEngine, SearchFilters } from '../utils/searchUtils';

const Search: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [results, setResults] = useState<CrimeRecord[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const searchEngine = new CrimeSearchEngine(crimeData);

  const handleSearch = () => {
    setIsSearching(true);
    
    // Simulate search delay for better UX
    setTimeout(() => {
      const filters: SearchFilters = {
        query: searchQuery,
        crimeType: searchType,
        location: locationFilter,
        dateFrom,
        dateTo
      };
      
      const searchResults = searchEngine.search(filters);
      setResults(searchResults);
      setHasSearched(true);
      setIsSearching(false);
    }, 500);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchType('all');
    setDateFrom('');
    setDateTo('');
    setLocationFilter('');
    setResults([]);
    setHasSearched(false);
  };

  const executeQuickSearch = (query: string, type: string = 'all') => {
    setSearchQuery(query);
    setSearchType(type);
    setLocationFilter('');
    setDateFrom('');
    setDateTo('');
    
    const filters: SearchFilters = {
      query,
      crimeType: type,
      location: '',
      dateFrom: '',
      dateTo: ''
    };
    
    const searchResults = searchEngine.search(filters);
    setResults(searchResults);
    setHasSearched(true);
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Crime Data Search</h1>
        <p className="text-gray-600 mt-2">Search and filter crime records using various criteria</p>
      </div>

      {/* Search Interface */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Search Input */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Query</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by crime type, location, or description..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Crime Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Crime Types</option>
                <option value="theft">Theft</option>
                <option value="burglary">Burglary</option>
                <option value="vandalism">Vandalism</option>
                <option value="assault">Assault</option>
                <option value="fraud">Fraud</option>
              </select>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date From</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date To</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location Filter</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  placeholder="Filter by location..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSearching ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <SearchIcon className="w-4 h-4" />
                Search
              </>
            )}
          </button>
          <button
            onClick={clearFilters}
            className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Clear Filters
          </button>
        </div>
      </div>

      {/* Search Results */}
      {hasSearched && results.length > 0 && (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Search Results ({results.length} {results.length === 1 ? 'record' : 'records'} found)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Crime Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{record.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div>{record.date}</div>
                      <div className="text-gray-500">{record.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        record.type === 'Theft' ? 'bg-blue-100 text-blue-800' :
                        record.type === 'Burglary' ? 'bg-red-100 text-red-800' :
                        record.type === 'Vandalism' ? 'bg-yellow-100 text-yellow-800' :
                        record.type === 'Assault' ? 'bg-purple-100 text-purple-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {record.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {record.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {record.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* No Results */}
      {hasSearched && results.length === 0 && (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600">Try adjusting your search criteria or clearing the filters.</p>
        </div>
      )}

      {/* Search Algorithm Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Search Algorithm Implementation</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Linear Search Algorithm</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <strong>Time Complexity:</strong> O(n) for each search operation</li>
              <li>• <strong>Space Complexity:</strong> O(1) additional space</li>
              <li>• <strong>Search Types:</strong> Exact match and substring search</li>
              <li>• <strong>Filter Combination:</strong> Multiple criteria support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Search Features</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Case-insensitive text matching</li>
              <li>• Multi-field search capability</li>
              <li>• Date range filtering</li>
              <li>• Location-based filtering</li>
              <li>• Crime type categorization</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Search Examples */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Quick Search Examples</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => executeQuickSearch('theft')}
            className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-gray-900">Search "theft"</div>
            <div className="text-sm text-gray-600">Find all theft-related crimes</div>
          </button>
          
          <button
            onClick={() => executeQuickSearch('', 'burglary')}
            className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-gray-900">Burglary crimes</div>
            <div className="text-sm text-gray-600">Filter by crime type</div>
          </button>
          
          <button
            onClick={() => executeQuickSearch('downtown')}
            className="p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="font-medium text-gray-900">Downtown area</div>
            <div className="text-sm text-gray-600">Search by location</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;