// Data Structures and Algorithms Implementation
// Academic Project - 2nd Year CSE

class CrimeAnalyzer {
    constructor(data) {
        this.data = data;
        this.crimeTypeHash = new Map(); // Hash Map for O(1) operations
        this.locationHash = new Map();
        this.timeHash = new Map();
        this.buildHashMaps();
    }

    // Build hash maps for frequency counting - O(n) time complexity
    buildHashMaps() {
        console.log('Building hash maps for frequency analysis...');
        
        this.data.forEach(record => {
            // Crime type frequency counting
            const crimeType = record.type;
            this.crimeTypeHash.set(crimeType, (this.crimeTypeHash.get(crimeType) || 0) + 1);
            
            // Location frequency counting
            const location = record.location;
            this.locationHash.set(location, (this.locationHash.get(location) || 0) + 1);
            
            // Time pattern analysis
            const hour = parseInt(record.time.split(':')[0]);
            this.timeHash.set(hour, (this.timeHash.get(hour) || 0) + 1);
        });
        
        console.log('Hash maps built successfully');
        console.log('Crime types:', this.crimeTypeHash);
        console.log('Locations:', this.locationHash);
    }

    // Get most frequent crime types - O(n log n) for sorting
    getFrequentCrimeTypes(topN = 5) {
        const sortedCrimes = Array.from(this.crimeTypeHash.entries())
            .sort((a, b) => b[1] - a[1]); // Sort by frequency (descending)
        
        return sortedCrimes.slice(0, topN);
    }

    // Get crime hotspots - O(n log n) for sorting
    getCrimeHotspots(topN = 5) {
        const sortedLocations = Array.from(this.locationHash.entries())
            .sort((a, b) => b[1] - a[1]);
        
        return sortedLocations.slice(0, topN);
    }

    // Analyze time patterns using frequency counting
    getTimePatterns() {
        // Group hours into time periods
        const timePeriods = {
            'Night (00-06)': [0, 1, 2, 3, 4, 5],
            'Morning (06-12)': [6, 7, 8, 9, 10, 11],
            'Afternoon (12-18)': [12, 13, 14, 15, 16, 17],
            'Evening (18-24)': [18, 19, 20, 21, 22, 23]
        };

        const periodCounts = new Map();
        
        // Count crimes by time period
        for (const [period, hours] of Object.entries(timePeriods)) {
            let count = 0;
            hours.forEach(hour => {
                count += this.timeHash.get(hour) || 0;
            });
            periodCounts.set(period, count);
        }

        return {
            hourly: Array.from(this.timeHash.entries()).sort((a, b) => a[0] - b[0]),
            periods: Array.from(periodCounts.entries()).sort((a, b) => b[1] - a[1])
        };
    }

    // Sliding window algorithm for cluster detection - O(n * w) where w is window size
    detectClusters(windowSize = 7) {
        console.log(`Detecting clusters using sliding window (size: ${windowSize})...`);
        
        if (this.data.length < windowSize) {
            return [];
        }

        const dateCounts = new Map();
        
        // Count crimes by date - O(n)
        this.data.forEach(record => {
            const date = record.date;
            dateCounts.set(date, (dateCounts.get(date) || 0) + 1);
        });

        // Sort dates
        const sortedDates = Array.from(dateCounts.keys()).sort();
        const clusters = [];
        
        // Calculate average crimes per day for threshold
        const totalCrimes = Array.from(dateCounts.values()).reduce((sum, count) => sum + count, 0);
        const avgCrimesPerDay = totalCrimes / dateCounts.size;
        
        console.log(`Average crimes per day: ${avgCrimesPerDay.toFixed(2)}`);

        // Sliding window to find high-activity periods - O(n * w)
        for (let i = 0; i <= sortedDates.length - windowSize; i++) {
            const windowDates = sortedDates.slice(i, i + windowSize);
            const totalCrimesInWindow = windowDates.reduce((sum, date) => sum + (dateCounts.get(date) || 0), 0);
            const avgCrimesInWindow = totalCrimesInWindow / windowSize;

            // Threshold for high activity (above average)
            if (avgCrimesInWindow > avgCrimesPerDay) {
                clusters.push({
                    startDate: windowDates[0],
                    endDate: windowDates[windowSize - 1],
                    totalCrimes: totalCrimesInWindow,
                    avgDailyCrimes: parseFloat(avgCrimesInWindow.toFixed(2)),
                    riskLevel: this.calculateRiskLevel(avgCrimesInWindow, avgCrimesPerDay)
                });
            }
        }

        console.log(`Found ${clusters.length} clusters`);
        return clusters.sort((a, b) => b.totalCrimes - a.totalCrimes);
    }

    // Calculate risk level based on crime frequency
    calculateRiskLevel(windowAvg, overallAvg) {
        const ratio = windowAvg / overallAvg;
        if (ratio >= 2.0) return 'Critical';
        if (ratio >= 1.5) return 'High';
        if (ratio >= 1.2) return 'Medium';
        return 'Low';
    }

    // Linear search implementation - O(n) time complexity
    searchCrimes(filters) {
        console.log('Performing linear search with filters:', filters);
        
        return this.data.filter(record => {
            // Text search across multiple fields
            if (filters.query && filters.query.trim()) {
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
            if (filters.crimeType && filters.crimeType !== '') {
                if (record.type.toLowerCase() !== filters.crimeType.toLowerCase()) {
                    return false;
                }
            }

            // Location filter
            if (filters.location && filters.location.trim()) {
                if (!record.location.toLowerCase().includes(filters.location.toLowerCase())) {
                    return false;
                }
            }

            // Date range filters
            if (filters.dateFrom && record.date < filters.dateFrom) {
                return false;
            }

            if (filters.dateTo && record.date > filters.dateTo) {
                return false;
            }

            return true;
        });
    }

    // Get comprehensive analysis results
    getComprehensiveAnalysis() {
        const frequentCrimes = this.getFrequentCrimeTypes();
        const hotspots = this.getCrimeHotspots();
        const timePatterns = this.getTimePatterns();
        const clusters = this.detectClusters();

        return {
            totalCrimes: this.data.length,
            uniqueTypes: this.crimeTypeHash.size,
            uniqueLocations: this.locationHash.size,
            frequentCrimes,
            hotspots,
            timePatterns,
            clusters,
            mostCommonCrime: frequentCrimes.length > 0 ? frequentCrimes[0][0] : 'N/A',
            topHotspot: hotspots.length > 0 ? hotspots[0][0] : 'N/A'
        };
    }

    // Generate summary statistics
    getSummaryStats() {
        const analysis = this.getComprehensiveAnalysis();
        
        return {
            totalCrimes: analysis.totalCrimes,
            uniqueTypes: analysis.uniqueTypes,
            uniqueLocations: analysis.uniqueLocations,
            mostCommonCrime: analysis.mostCommonCrime,
            topHotspot: analysis.topHotspot,
            activeClusters: analysis.clusters.filter(c => c.riskLevel === 'High' || c.riskLevel === 'Critical').length
        };
    }
}

// Report Generator Class
class ReportGenerator {
    constructor(analyzer) {
        this.analyzer = analyzer;
    }

    // Generate comprehensive report
    generateReport(type = 'summary', period = 'month') {
        const analysis = this.analyzer.getComprehensiveAnalysis();
        const timestamp = new Date().toLocaleString();
        
        let report = {
            title: this.getReportTitle(type),
            generatedAt: timestamp,
            period: period,
            summary: {
                totalCrimes: analysis.totalCrimes,
                crimeTypes: analysis.uniqueTypes,
                locations: analysis.uniqueLocations,
                dateRange: this.getDateRange()
            }
        };

        switch (type) {
            case 'summary':
                report.analysis = this.generateSummaryAnalysis(analysis);
                break;
            case 'trends':
                report.analysis = this.generateTrendAnalysis(analysis);
                break;
            case 'hotspots':
                report.analysis = this.generateHotspotAnalysis(analysis);
                break;
            case 'detailed':
                report.analysis = this.generateDetailedAnalysis(analysis);
                break;
        }

        return report;
    }

    getReportTitle(type) {
        const titles = {
            'summary': 'Crime Summary Report',
            'trends': 'Crime Trend Analysis Report',
            'hotspots': 'Crime Hotspot Analysis Report',
            'detailed': 'Detailed Crime Log Report'
        };
        return titles[type] || 'Crime Analysis Report';
    }

    getDateRange() {
        const dates = this.analyzer.data.map(r => r.date).sort();
        return dates.length > 0 ? `${dates[0]} to ${dates[dates.length - 1]}` : 'No data';
    }

    generateSummaryAnalysis(analysis) {
        return {
            crimeTypes: analysis.frequentCrimes.map(([type, count]) => ({
                type,
                count,
                percentage: ((count / analysis.totalCrimes) * 100).toFixed(1)
            })),
            locations: analysis.hotspots.map(([location, count]) => ({
                location,
                count,
                percentage: ((count / analysis.totalCrimes) * 100).toFixed(1)
            })),
            timePatterns: analysis.timePatterns.periods,
            clusters: analysis.clusters.length
        };
    }

    generateTrendAnalysis(analysis) {
        return {
            dailyTrends: this.calculateDailyTrends(),
            timePatterns: analysis.timePatterns,
            clusters: analysis.clusters,
            predictions: this.generatePredictions(analysis)
        };
    }

    generateHotspotAnalysis(analysis) {
        return {
            hotspots: analysis.hotspots.map(([location, count]) => ({
                location,
                count,
                percentage: ((count / analysis.totalCrimes) * 100).toFixed(1),
                riskLevel: this.calculateLocationRisk(count, analysis.totalCrimes)
            })),
            recommendations: this.generateLocationRecommendations(analysis.hotspots)
        };
    }

    generateDetailedAnalysis(analysis) {
        return {
            records: this.analyzer.data,
            byType: this.groupByField('type'),
            byLocation: this.groupByField('location'),
            chronological: this.analyzer.data.sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
        };
    }

    calculateDailyTrends() {
        const dailyCounts = new Map();
        this.analyzer.data.forEach(record => {
            dailyCounts.set(record.date, (dailyCounts.get(record.date) || 0) + 1);
        });
        return Array.from(dailyCounts.entries()).sort();
    }

    generatePredictions(analysis) {
        const recentData = this.analyzer.data.slice(-7);
        const avgRecent = recentData.length / 7;
        
        return {
            nextWeekPrediction: Math.round(avgRecent * 7),
            confidence: recentData.length > 3 ? 'Medium' : 'Low',
            recommendation: avgRecent > 2 ? 'Increase patrol presence' : 'Maintain current security level'
        };
    }

    calculateLocationRisk(count, total) {
        const percentage = (count / total) * 100;
        if (percentage > 25) return 'High';
        if (percentage > 15) return 'Medium';
        return 'Low';
    }

    generateLocationRecommendations(hotspots) {
        return hotspots.slice(0, 3).map(([location, count]) => ({
            location,
            recommendation: `Increase security measures in ${location} - ${count} incidents reported`
        }));
    }

    groupByField(field) {
        const grouped = new Map();
        this.analyzer.data.forEach(record => {
            const key = record[field];
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }
            grouped.get(key).push(record);
        });
        return Object.fromEntries(grouped);
    }

    // Download report as text file
    downloadReport(reportData) {
        const content = this.formatReportContent(reportData);
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

    formatReportContent(reportData) {
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
            reportData.analysis.crimeTypes.forEach((item, index) => {
                content += `${index + 1}. ${item.type}: ${item.count} incidents (${item.percentage}%)\n`;
            });
            content += '\n';
        }
        
        if (reportData.analysis.locations) {
            content += `LOCATION ANALYSIS\n`;
            content += `${'='.repeat(20)}\n`;
            reportData.analysis.locations.forEach((item, index) => {
                content += `${index + 1}. ${item.location}: ${item.count} incidents (${item.percentage}%)\n`;
            });
            content += '\n';
        }
        
        return content;
    }
}

// Initialize analyzer with crime data
const crimeAnalyzer = new CrimeAnalyzer(crimeData);
const reportGenerator = new ReportGenerator(crimeAnalyzer);

// Export for use in other files
window.crimeAnalyzer = crimeAnalyzer;
window.reportGenerator = reportGenerator;