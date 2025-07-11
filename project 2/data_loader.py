"""
Data Loading Module - Handles CSV data loading and preprocessing
"""
import csv
from datetime import datetime
from typing import List, Dict, Any

class CrimeDataLoader:
    """Handles loading and preprocessing of crime data from CSV files"""
    
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.data = []
    
    def load_data(self) -> List[Dict[str, Any]]:
        """Load crime data from CSV file"""
        try:
            with open(self.file_path, 'r', newline='', encoding='utf-8') as file:
                reader = csv.DictReader(file)
                self.data = list(reader)
                self._preprocess_data()
                return self.data
        except FileNotFoundError:
            print(f"Error: File {self.file_path} not found")
            return []
        except Exception as e:
            print(f"Error loading data: {e}")
            return []
    
    def _preprocess_data(self):
        """Preprocess data - convert dates, clean strings"""
        for record in self.data:
            # Convert date string to datetime object
            try:
                record['datetime'] = datetime.strptime(record['date'], '%Y-%m-%d')
                record['hour'] = int(record['time'].split(':')[0])
            except:
                record['datetime'] = None
                record['hour'] = 0
            
            # Clean and normalize strings
            record['type'] = record['type'].strip().title()
            record['location'] = record['location'].strip().title()
    
    def get_data_summary(self) -> Dict[str, Any]:
        """Get basic summary of loaded data"""
        if not self.data:
            return {}
        
        return {
            'total_records': len(self.data),
            'date_range': {
                'start': min(record['date'] for record in self.data),
                'end': max(record['date'] for record in self.data)
            },
            'unique_types': len(set(record['type'] for record in self.data)),
            'unique_locations': len(set(record['location'] for record in self.data))
        }