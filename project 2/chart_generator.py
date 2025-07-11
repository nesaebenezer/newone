"""
Chart Generation Module - Creates visualization data for frontend
"""
import json
from typing import List, Dict, Any, Tuple

class ChartDataGenerator:
    """Generates chart data in JSON format for frontend visualization"""
    
    def __init__(self, analysis_results: Dict[str, Any]):
        self.analysis_results = analysis_results
    
    def generate_crime_type_chart(self) -> Dict[str, Any]:
        """Generate data for crime type bar chart"""
        frequent_crimes = self.analysis_results['frequent_crimes']
        
        return {
            'type': 'bar',
            'title': 'Most Frequent Crime Types',
            'data': {
                'labels': [crime[0] for crime in frequent_crimes],
                'values': [crime[1] for crime in frequent_crimes],
                'colors': ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
            }
        }
    
    def generate_hotspot_chart(self) -> Dict[str, Any]:
        """Generate data for crime hotspot pie chart"""
        hotspots = self.analysis_results['hotspots']
        
        return {
            'type': 'pie',
            'title': 'Crime Hotspots by Location',
            'data': {
                'labels': [location[0] for location in hotspots],
                'values': [location[1] for location in hotspots],
                'colors': ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
            }
        }
    
    def generate_time_pattern_chart(self) -> Dict[str, Any]:
        """Generate data for time pattern chart"""
        time_patterns = self.analysis_results['time_patterns']
        
        return {
            'type': 'line',
            'title': 'Crime Patterns by Hour',
            'data': {
                'labels': [f"{hour:02d}:00" for hour, _ in time_patterns['hourly']],
                'values': [count for _, count in time_patterns['hourly']],
                'color': '#3B82F6'
            }
        }
    
    def generate_cluster_chart(self) -> Dict[str, Any]:
        """Generate data for crime cluster visualization"""
        clusters = self.analysis_results['clusters']
        
        return {
            'type': 'bar',
            'title': 'Crime Clusters (7-day windows)',
            'data': {
                'labels': [f"{cluster['start_date']} to {cluster['end_date']}" for cluster in clusters],
                'values': [cluster['total_crimes'] for cluster in clusters],
                'colors': ['#EF4444'] * len(clusters)
            }
        }
    
    def generate_summary_stats(self) -> Dict[str, Any]:
        """Generate summary statistics"""
        return {
            'total_crimes': self.analysis_results['total_crimes'],
            'unique_types': self.analysis_results['unique_types'],
            'unique_locations': self.analysis_results['unique_locations'],
            'most_common_crime': self.analysis_results['frequent_crimes'][0][0] if self.analysis_results['frequent_crimes'] else 'N/A',
            'top_hotspot': self.analysis_results['hotspots'][0][0] if self.analysis_results['hotspots'] else 'N/A'
        }
    
    def save_charts_to_json(self, filename: str = 'chart_data.json'):
        """Save all chart data to JSON file"""
        chart_data = {
            'crime_types': self.generate_crime_type_chart(),
            'hotspots': self.generate_hotspot_chart(),
            'time_patterns': self.generate_time_pattern_chart(),
            'clusters': self.generate_cluster_chart(),
            'summary': self.generate_summary_stats()
        }
        
        try:
            with open(filename, 'w', encoding='utf-8') as f:
                json.dump(chart_data, f, indent=2, ensure_ascii=False)
            print(f"Chart data saved to {filename}")
            return chart_data
        except Exception as e:
            print(f"Error saving chart data: {e}")
            return None