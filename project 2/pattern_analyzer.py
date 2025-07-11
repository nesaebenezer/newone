"""
Pattern Analysis Module - Core DSA algorithms for crime pattern detection
"""
from collections import defaultdict
from typing import List, Dict, Any, Tuple

class CrimePatternAnalyzer:
    """Analyzes crime patterns using basic DSA concepts"""
    
    def __init__(self, data: List[Dict[str, Any]]):
        self.data = data
        self.crime_type_hash = defaultdict(int)
        self.location_hash = defaultdict(int)
        self.time_hash = defaultdict(int)
        self._build_hash_maps()
    
    def _build_hash_maps(self):
        """Build hash maps for frequency counting - O(n) time complexity"""
        for record in self.data:
            self.crime_type_hash[record['type']] += 1
            self.location_hash[record['location']] += 1
            self.time_hash[record['hour']] += 1
    
    def get_frequent_crime_types(self, top_n: int = 5) -> List[Tuple[str, int]]:
        """Get most frequent crime types using hash map - O(n log n) for sorting"""
        # Convert hash map to sorted list
        sorted_crimes = sorted(self.crime_type_hash.items(), key=lambda x: x[1], reverse=True)
        return sorted_crimes[:top_n]
    
    def get_crime_hotspots(self, top_n: int = 5) -> List[Tuple[str, int]]:
        """Get locations with highest crime frequency - O(n log n) for sorting"""
        sorted_locations = sorted(self.location_hash.items(), key=lambda x: x[1], reverse=True)
        return sorted_locations[:top_n]
    
    def get_time_patterns(self) -> Dict[str, List[Tuple[int, int]]]:
        """Analyze time-based patterns using frequency counting"""
        # Group hours into time periods
        time_periods = {
            'morning': list(range(6, 12)),
            'afternoon': list(range(12, 18)),
            'evening': list(range(18, 24)),
            'night': list(range(0, 6))
        }
        
        period_counts = defaultdict(int)
        for hour, count in self.time_hash.items():
            for period, hours in time_periods.items():
                if hour in hours:
                    period_counts[period] += count
        
        # Return both hourly and period data
        return {
            'hourly': sorted(self.time_hash.items()),
            'periods': sorted(period_counts.items(), key=lambda x: x[1], reverse=True)
        }
    
    def detect_clusters_sliding_window(self, window_size: int = 7) -> List[Dict[str, Any]]:
        """Detect crime clusters using sliding window approach"""
        if len(self.data) < window_size:
            return []
        
        clusters = []
        date_counts = defaultdict(int)
        
        # Count crimes by date
        for record in self.data:
            date_counts[record['date']] += 1
        
        # Sort dates
        sorted_dates = sorted(date_counts.keys())
        
        # Sliding window to find high-activity periods
        for i in range(len(sorted_dates) - window_size + 1):
            window_dates = sorted_dates[i:i + window_size]
            total_crimes = sum(date_counts[date] for date in window_dates)
            avg_crimes = total_crimes / window_size
            
            # Threshold for high activity (above average)
            if avg_crimes > (sum(date_counts.values()) / len(date_counts)):
                clusters.append({
                    'start_date': window_dates[0],
                    'end_date': window_dates[-1],
                    'total_crimes': total_crimes,
                    'avg_daily_crimes': round(avg_crimes, 2)
                })
        
        return clusters
    
    def search_crimes_by_type(self, crime_type: str) -> List[Dict[str, Any]]:
        """Search crimes by type - O(n) linear search"""
        matching_crimes = []
        for record in self.data:
            if record['type'].lower() == crime_type.lower():
                matching_crimes.append(record)
        return matching_crimes
    
    def search_crimes_by_location(self, location: str) -> List[Dict[str, Any]]:
        """Search crimes by location - O(n) linear search"""
        matching_crimes = []
        for record in self.data:
            if location.lower() in record['location'].lower():
                matching_crimes.append(record)
        return matching_crimes
    
    def get_comprehensive_analysis(self) -> Dict[str, Any]:
        """Get comprehensive analysis results"""
        return {
            'frequent_crimes': self.get_frequent_crime_types(),
            'hotspots': self.get_crime_hotspots(),
            'time_patterns': self.get_time_patterns(),
            'clusters': self.detect_clusters_sliding_window(),
            'total_crimes': len(self.data),
            'unique_types': len(self.crime_type_hash),
            'unique_locations': len(self.location_hash)
        }