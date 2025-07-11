import { CrimeRecord } from '../data/crimeData';

export interface ReportData {
  title: string;
  generatedAt: string;
  period: string;
  summary: {
    totalCrimes: number;
    crimeTypes: number;
    locations: number;
    dateRange: string;
  };
  analysis: any;
}

export class ReportGenerator {
  private data: CrimeRecord[];

  constructor(data: CrimeRecord[]) {
    this.data = data;
  }

  generateSummaryReport(period: string): ReportData {
    const filteredData = this.filterByPeriod(period);
    
    return {
      title: 'Crime Summary Report',
      generatedAt: new Date().toLocaleString(),
      period,
      summary: this.generateSummary(filteredData),
      analysis: {
        crimeTypes: this.analyzeCrimeTypes(filteredData),
        locations: this.analyzeLocations(filteredData),
        timePatterns: this.analyzeTimePatterns(filteredData),
        trends: this.analyzeTrends(filteredData)
      }
    };
  }

  generateTrendReport(period: string): ReportData {
    const filteredData = this.filterByPeriod(period);
    
    return {
      title: 'Crime Trend Analysis Report',
      generatedAt: new Date().toLocaleString(),
      period,
      summary: this.generateSummary(filteredData),
      analysis: {
        dailyTrends: this.analyzeDailyTrends(filteredData),
        weeklyPatterns: this.analyzeWeeklyPatterns(filteredData),
        monthlyComparison: this.analyzeMonthlyComparison(filteredData),
        predictions: this.generatePredictions(filteredData)
      }
    };
  }

  generateHotspotReport(period: string): ReportData {
    const filteredData = this.filterByPeriod(period);
    
    return {
      title: 'Crime Hotspot Analysis Report',
      generatedAt: new Date().toLocaleString(),
      period,
      summary: this.generateSummary(filteredData),
      analysis: {
        hotspots: this.analyzeLocations(filteredData),
        riskAssessment: this.assessLocationRisk(filteredData),
        recommendations: this.generateLocationRecommendations(filteredData)
      }
    };
  }

  generateDetailedLog(period: string): ReportData {
    const filteredData = this.filterByPeriod(period);
    
    return {
      title: 'Detailed Crime Log',
      generatedAt: new Date().toLocaleString(),
      period,
      summary: this.generateSummary(filteredData),
      analysis: {
        records: filteredData,
        chronological: this.sortByDate(filteredData),
        byLocation: this.groupByLocation(filteredData),
        byType: this.groupByType(filteredData)
      }
    };
  }

  private filterByPeriod(period: string): CrimeRecord[] {
    const now = new Date();
    let startDate: Date;

    switch (period) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
        break;
      case 'quarter':
        startDate = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        break;
      case 'year':
        startDate = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
        break;
      default:
        return this.data;
    }

    return this.data.filter(record => new Date(record.date) >= startDate);
  }

  private generateSummary(data: CrimeRecord[]) {
    const dates = data.map(r => r.date).sort();
    return {
      totalCrimes: data.length,
      crimeTypes: new Set(data.map(r => r.type)).size,
      locations: new Set(data.map(r => r.location)).size,
      dateRange: dates.length > 0 ? `${dates[0]} to ${dates[dates.length - 1]}` : 'No data'
    };
  }

  private analyzeCrimeTypes(data: CrimeRecord[]) {
    const typeCount = new Map<string, number>();
    data.forEach(record => {
      typeCount.set(record.type, (typeCount.get(record.type) || 0) + 1);
    });
    
    return Array.from(typeCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([type, count]) => ({
        type,
        count,
        percentage: ((count / data.length) * 100).toFixed(1)
      }));
  }

  private analyzeLocations(data: CrimeRecord[]) {
    const locationCount = new Map<string, number>();
    data.forEach(record => {
      locationCount.set(record.location, (locationCount.get(record.location) || 0) + 1);
    });
    
    return Array.from(locationCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([location, count]) => ({
        location,
        count,
        percentage: ((count / data.length) * 100).toFixed(1)
      }));
  }

  private analyzeTimePatterns(data: CrimeRecord[]) {
    const hourCount = new Map<number, number>();
    data.forEach(record => {
      const hour = parseInt(record.time.split(':')[0]);
      hourCount.set(hour, (hourCount.get(hour) || 0) + 1);
    });
    
    return Array.from(hourCount.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([hour, count]) => ({ hour, count }));
  }

  private analyzeTrends(data: CrimeRecord[]) {
    // Simple trend analysis
    const dailyCount = new Map<string, number>();
    data.forEach(record => {
      dailyCount.set(record.date, (dailyCount.get(record.date) || 0) + 1);
    });
    
    const sortedDays = Array.from(dailyCount.entries()).sort();
    const avgCrimesPerDay = data.length / sortedDays.length;
    
    return {
      averagePerDay: avgCrimesPerDay.toFixed(1),
      peakDay: sortedDays.reduce((max, current) => current[1] > max[1] ? current : max),
      trend: sortedDays.length > 1 ? 
        (sortedDays[sortedDays.length - 1][1] > sortedDays[0][1] ? 'increasing' : 'decreasing') : 'stable'
    };
  }

  private analyzeDailyTrends(data: CrimeRecord[]) {
    const dailyCount = new Map<string, number>();
    data.forEach(record => {
      dailyCount.set(record.date, (dailyCount.get(record.date) || 0) + 1);
    });
    return Array.from(dailyCount.entries()).sort();
  }

  private analyzeWeeklyPatterns(data: CrimeRecord[]) {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayCount = new Map<number, number>();
    
    data.forEach(record => {
      const dayOfWeek = new Date(record.date).getDay();
      dayCount.set(dayOfWeek, (dayCount.get(dayOfWeek) || 0) + 1);
    });
    
    return dayNames.map((name, index) => ({
      day: name,
      count: dayCount.get(index) || 0
    }));
  }

  private analyzeMonthlyComparison(data: CrimeRecord[]) {
    const monthCount = new Map<string, number>();
    data.forEach(record => {
      const month = record.date.substring(0, 7); // YYYY-MM
      monthCount.set(month, (monthCount.get(month) || 0) + 1);
    });
    return Array.from(monthCount.entries()).sort();
  }

  private generatePredictions(data: CrimeRecord[]) {
    const recent = data.slice(-7); // Last 7 records
    const avgRecent = recent.length / 7;
    
    return {
      nextWeekPrediction: Math.round(avgRecent * 7),
      confidence: recent.length > 3 ? 'Medium' : 'Low',
      recommendation: avgRecent > 2 ? 'Increase patrol presence' : 'Maintain current security level'
    };
  }

  private assessLocationRisk(data: CrimeRecord[]) {
    const locations = this.analyzeLocations(data);
    return locations.map(loc => ({
      ...loc,
      riskLevel: parseInt(loc.percentage) > 25 ? 'High' : 
                 parseInt(loc.percentage) > 15 ? 'Medium' : 'Low'
    }));
  }

  private generateLocationRecommendations(data: CrimeRecord[]) {
    const hotspots = this.analyzeLocations(data).slice(0, 3);
    return hotspots.map(spot => ({
      location: spot.location,
      recommendation: `Increase security measures in ${spot.location} - ${spot.count} incidents (${spot.percentage}%)`
    }));
  }

  private sortByDate(data: CrimeRecord[]): CrimeRecord[] {
    return [...data].sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());
  }

  private groupByLocation(data: CrimeRecord[]) {
    const grouped = new Map<string, CrimeRecord[]>();
    data.forEach(record => {
      if (!grouped.has(record.location)) {
        grouped.set(record.location, []);
      }
      grouped.get(record.location)!.push(record);
    });
    return Object.fromEntries(grouped);
  }

  private groupByType(data: CrimeRecord[]) {
    const grouped = new Map<string, CrimeRecord[]>();
    data.forEach(record => {
      if (!grouped.has(record.type)) {
        grouped.set(record.type, []);
      }
      grouped.get(record.type)!.push(record);
    });
    return Object.fromEntries(grouped);
  }

  // Generate downloadable report content
  generateReportContent(reportData: ReportData): string {
    let content = `${reportData.title}\n`;
    content += `Generated: ${reportData.generatedAt}\n`;
    content += `Period: ${reportData.period}\n`;
    content += `${'='.repeat(50)}\n\n`;
    
    content += `SUMMARY\n`;
    content += `${'='.repeat(20)}\n`;
    content += `Total Crimes: ${reportData.summary.totalCrimes}\n`;
    content += `Crime Types: ${reportData.summary.crimeTypes}\n`;
    content += `Locations: ${reportData.summary.locations}\n`;
    content += `Date Range: ${reportData.summary.dateRange}\n\n`;
    
    if (reportData.analysis.crimeTypes) {
      content += `CRIME TYPES ANALYSIS\n`;
      content += `${'='.repeat(20)}\n`;
      reportData.analysis.crimeTypes.forEach((item: any, index: number) => {
        content += `${index + 1}. ${item.type}: ${item.count} incidents (${item.percentage}%)\n`;
      });
      content += '\n';
    }
    
    if (reportData.analysis.locations) {
      content += `LOCATION ANALYSIS\n`;
      content += `${'='.repeat(20)}\n`;
      reportData.analysis.locations.forEach((item: any, index: number) => {
        content += `${index + 1}. ${item.location}: ${item.count} incidents (${item.percentage}%)\n`;
      });
      content += '\n';
    }
    
    return content;
  }

  // Download report as text file
  downloadReport(reportData: ReportData): void {
    const content = this.generateReportContent(reportData);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${reportData.title.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}