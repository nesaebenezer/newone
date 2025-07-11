import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CrimeTypes from './pages/CrimeTypes';
import Hotspots from './pages/Hotspots';
import TimePatterns from './pages/TimePatterns';
import Clusters from './pages/Clusters';
import Search from './pages/Search';
import Reports from './pages/Reports';
import DataManagement from './pages/DataManagement';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/crime-types" element={<CrimeTypes />} />
          <Route path="/hotspots" element={<Hotspots />} />
          <Route path="/time-patterns" element={<TimePatterns />} />
          <Route path="/clusters" element={<Clusters />} />
          <Route path="/search" element={<Search />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/data" element={<DataManagement />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;