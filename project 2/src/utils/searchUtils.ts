import { CrimeRecord } from '../data/crimeData';

export interface SearchFilters {
  query: string;
  crimeType: string;
  location: string;
  dateFrom: string;
  dateTo: string;
}

export class CrimeSearchEngine {
  private data: CrimeRecord[];

  constructor(data: CrimeRecord[]) {
    this.data = data;
  }

  // Linear search implementation - O(n) time complexity
  search(filters: SearchFilters): CrimeRecord[] {
    return this.data.filter(record => {
      // Text search across multiple fields
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const searchableText = [
          record.type,
          record.location,
          record.description
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Crime type filter
      if (filters.crimeType && filters.crimeType !== 'all') {
        if (record.type.toLowerCase() !== filters.crimeType.toLowerCase()) {
          return false;
        }
      }

      // Location filter
      if (filters.location) {
        if (!record.location.toLowerCase().includes(filters.location.toLowerCase())) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateFrom) {
        if (record.date < filters.dateFrom) {
          return false;
        }
      }

      if (filters.dateTo) {
        if (record.date > filters.dateTo) {
          return false;
        }
      }

      return true;
    });
  }

  // Get search suggestions based on partial input
  getSuggestions(query: string, field: 'type' | 'location'): string[] {
    const values = new Set<string>();
    const queryLower = query.toLowerCase();

    this.data.forEach(record => {
      const value = record[field];
      if (value.toLowerCase().includes(queryLower)) {
        values.add(value);
      }
    });

    return Array.from(values).slice(0, 5);
  }

  // Get unique values for filters
  getUniqueValues(field: keyof CrimeRecord): string[] {
    const values = new Set<string>();
    this.data.forEach(record => {
      values.add(record[field] as string);
    });
    return Array.from(values).sort();
  }
}