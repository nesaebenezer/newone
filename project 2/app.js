// Main Application Logic
// Crime Pattern Detection System - Academic Project

class CrimeApp {
    constructor() {
        this.currentPage = 'dashboard';
        this.currentReport = null;
        this.init();
    }

    init() {
        console.log('Initializing Crime Pattern Detection System...');
        
        // Initialize navigation
        this.initNavigation();
        
        // Initialize search functionality
        this.initSearch();
        
        // Initialize reports
        this.initReports();
        
        // Load initial data and charts
        this.loadDashboard();
        
        console.log('System initialized successfully');
    }

    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const pageId = link.getAttribute('data-page');
                this.showPage(pageId);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }

    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show selected page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            this.currentPage = pageId;
            
            // Load page-specific content
            this.loadPageContent(pageId);
        }
    }

    loadPageContent(pageId) {
        switch (pageId) {
            case 'dashboard':
                this.loadDashboard();
                break;
            case 'crime-types':
                this.loadCrimeTypes();
                break;
            case 'hotspots':
                this.loadHotspots();
                break;
            case 'time-patterns':
                this.loadTimePatterns();
                break;
            case 'clusters':
                this.loadClusters();
                break;
            case 'search':
                this.loadSearch();
                break;
            case 'reports':
                this.loadReports();
                break;
        }
    }

    loadDashboard() {
        const analysis = crimeAnalyzer.getComprehensiveAnalysis();
        
        // Update summary stats
        document.getElementById('total-crimes').textContent = analysis.totalCrimes;
        document.getElementById('unique-types').textContent = analysis.uniqueTypes;
        document.getElementById('unique-locations').textContent = analysis.uniqueLocations;
        document.getElementById('most-common-crime').textContent = analysis.mostCommonCrime;
        document.getElementById('top-hotspot').textContent = analysis.topHotspot;
        document.getElementById('total-records').textContent = analysis.totalCrimes;
        
        // Update charts
        setTimeout(() => {
            updateDashboardCharts();
        }, 100);
        
        // Load recent activity
        this.loadRecentActivity();
    }

    loadRecentActivity() {
        const activities = [
            { time: '2 hours ago', event: 'New theft reported in Downtown area', type: 'alert' },
            { time: '4 hours ago', event: 'Pattern analysis completed for January data', type: 'info' },
            { time: '6 hours ago', event: 'High activity cluster detected: Jan 22-28', type: 'warning' },
            { time: '1 day ago', event: 'Monthly crime report generated', type: 'success' }
        ];
        
        const activityContainer = document.getElementById('recent-activity');
        if (activityContainer) {
            activityContainer.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-dot ${activity.type}"></div>
                    <div class="activity-content">
                        <div class="activity-event">${activity.event}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    loadCrimeTypes() {
        const analysis = crimeAnalyzer.getComprehensiveAnalysis();
        
        // Update crime types table
        const tableBody = document.querySelector('#crime-types-table tbody');
        if (tableBody) {
            tableBody.innerHTML = analysis.frequentCrimes.map(([type, count]) => {
                const percentage = ((count / analysis.totalCrimes) * 100).toFixed(1);
                const details = crimeTypeDetails[type] || {};
                
                return `
                    <tr>
                        <td>
                            <div style="display: flex; align-items: center; gap: 0.75rem;">
                                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${chartColors.primary[analysis.frequentCrimes.findIndex(([t]) => t === type)]}"></div>
                                <div>
                                    <div style="font-weight: 500;">${type}</div>
                                    <div style="font-size: 0.875rem; color: #64748b;">${details.description || 'Crime category'}</div>
                                </div>
                            </div>
                        </td>
                        <td>${count}</td>
                        <td>${percentage}%</td>
                        <td style="color: ${details.trend?.startsWith('+') ? '#ef4444' : '#10b981'}">${details.trend || 'N/A'}</td>
                        <td><span class="badge ${details.severity?.toLowerCase() || 'medium'}">${details.severity || 'Medium'}</span></td>
                        <td>${details.peakHours || 'N/A'}</td>
                    </tr>
                `;
            }).join('');
        }
        
        // Update chart
        setTimeout(() => {
            updateCrimeTypesChart();
        }, 100);
    }

    loadHotspots() {
        const analysis = crimeAnalyzer.getComprehensiveAnalysis();
        
        // Update location details
        const locationContainer = document.getElementById('location-details');
        if (locationContainer) {
            locationContainer.innerHTML = analysis.hotspots.map(([location, count], index) => {
                const details = locationDetails[location] || {};
                const percentage = ((count / analysis.totalCrimes) * 100).toFixed(1);
                
                return `
                    <div class="location-card">
                        <div class="location-header">
                            <div class="location-name">
                                <div class="location-dot" style="background: ${chartColors.locations[index]}"></div>
                                <h4>${location}</h4>
                            </div>
                            <span class="badge ${details.riskLevel?.toLowerCase() || 'medium'}">${details.riskLevel || 'Medium'} Risk</span>
                        </div>
                        <p style="color: #64748b; margin-bottom: 1rem;">${this.getLocationDescription(location)}</p>
                        <div class="location-stats">
                            <div class="stat-row">
                                <span class="stat-label">Total Crimes:</span>
                                <span class="stat-value">${count}</span>
                            </div>
                            <div class="stat-row">
                                <span class="stat-label">Population:</span>
                                <span class="stat-value">${details.population?.toLocaleString() || 'N/A'}</span>
                            </div>
                            <div class="stat-row">
                                <span class="stat-label">Crime Rate:</span>
                                <span class="stat-value">${details.crimeRate || 'N/A'} per 1000</span>
                            </div>
                            <div class="stat-row">
                                <span class="stat-label">Trend:</span>
                                <span class="stat-value" style="color: ${details.trend?.startsWith('+') ? '#ef4444' : '#10b981'}">${details.trend || 'N/A'}</span>
                            </div>
                        </div>
                        <div class="location-tags">
                            ${(details.mainCrimes || []).map(crime => `<span class="location-tag">${crime}</span>`).join('')}
                        </div>
                    </div>
                `;
            }).join('');
        }
        
        // Update chart
        setTimeout(() => {
            updateHotspotsChart();
        }, 100);
    }

    getLocationDescription(location) {
        const descriptions = {
            'Downtown': 'Business district with high foot traffic',
            'Residential Area': 'Suburban neighborhoods and housing complexes',
            'Commercial Zone': 'Office buildings and business establishments',
            'Shopping Center': 'Retail stores and shopping complexes',
            'Park District': 'Public parks and recreational areas'
        };
        return descriptions[location] || 'Urban area with mixed activities';
    }

    loadTimePatterns() {
        // Update chart
        setTimeout(() => {
            updateTimePatternsChart();
        }, 100);
    }

    loadClusters() {
        const analysis = crimeAnalyzer.getComprehensiveAnalysis();
        
        // Update cluster details
        const clusterContainer = document.getElementById('cluster-details');
        if (clusterContainer) {
            clusterContainer.innerHTML = analysis.clusters.map(cluster => `
                <div class="cluster-card">
                    <div class="cluster-header">
                        <h4 class="cluster-period">${cluster.startDate} to ${cluster.endDate}</h4>
                        <span class="badge ${cluster.riskLevel.toLowerCase()}">${cluster.riskLevel}</span>
                    </div>
                    <p style="color: #64748b; margin-bottom: 1rem;">
                        ${this.getClusterDescription(cluster.riskLevel)} activity period detected
                    </p>
                    <div class="cluster-stats">
                        <div class="cluster-stat">
                            <div class="cluster-stat-value">${cluster.totalCrimes}</div>
                            <div class="cluster-stat-label">Total Crimes</div>
                        </div>
                        <div class="cluster-stat">
                            <div class="cluster-stat-value">${cluster.avgDailyCrimes}</div>
                            <div class="cluster-stat-label">Daily Average</div>
                        </div>
                    </div>
                    <div class="cluster-details">
                        <div class="cluster-detail">
                            <span>Status:</span>
                            <span style="color: ${this.getStatusColor(cluster.riskLevel)}">${this.getClusterStatus(cluster.riskLevel)}</span>
                        </div>
                        <div class="cluster-detail">
                            <span>Duration:</span>
                            <span>7 days</span>
                        </div>
                    </div>
                </div>
            `).join('');
        }
        
        // Update chart
        setTimeout(() => {
            updateClustersChart();
        }, 100);
    }

    getClusterDescription(riskLevel) {
        const descriptions = {
            'Critical': 'Extremely high',
            'High': 'Significant',
            'Medium': 'Moderate',
            'Low': 'Reduced'
        };
        return descriptions[riskLevel] || 'Moderate';
    }

    getClusterStatus(riskLevel) {
        const statuses = {
            'Critical': 'High Alert',
            'High': 'Active Cluster',
            'Medium': 'Monitoring',
            'Low': 'Resolved'
        };
        return statuses[riskLevel] || 'Monitoring';
    }

    getStatusColor(riskLevel) {
        const colors = {
            'Critical': '#ef4444',
            'High': '#f59e0b',
            'Medium': '#3b82f6',
            'Low': '#10b981'
        };
        return colors[riskLevel] || '#3b82f6';
    }

    loadSearch() {
        // Search functionality is initialized in initSearch()
    }

    loadReports() {
        // Reports functionality is initialized in initReports()
    }

    initSearch() {
        const searchBtn = document.getElementById('search-btn');
        const clearBtn = document.getElementById('clear-filters-btn');
        const quickSearchBtns = document.querySelectorAll('.quick-search-btn');
        
        if (searchBtn) {
            searchBtn.addEventListener('click', () => this.performSearch());
        }
        
        if (clearBtn) {
            clearBtn.addEventListener('click', () => this.clearSearchFilters());
        }
        
        quickSearchBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const query = btn.getAttribute('data-query') || '';
                const type = btn.getAttribute('data-type') || '';
                this.performQuickSearch(query, type);
            });
        });
        
        // Enter key support for search
        const searchInput = document.getElementById('search-query');
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.performSearch();
                }
            });
        }
    }

    performSearch() {
        const filters = {
            query: document.getElementById('search-query')?.value || '',
            crimeType: document.getElementById('crime-type-filter')?.value || '',
            location: document.getElementById('location-filter')?.value || '',
            dateFrom: document.getElementById('date-from')?.value || '',
            dateTo: document.getElementById('date-to')?.value || ''
        };
        
        console.log('Performing search with filters:', filters);
        
        // Show loading state
        const searchBtn = document.getElementById('search-btn');
        if (searchBtn) {
            searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
            searchBtn.disabled = true;
        }
        
        // Simulate search delay for better UX
        setTimeout(() => {
            const results = crimeAnalyzer.searchCrimes(filters);
            this.displaySearchResults(results);
            
            // Reset button
            if (searchBtn) {
                searchBtn.innerHTML = '<i class="fas fa-search"></i> Search';
                searchBtn.disabled = false;
            }
        }, 500);
    }

    performQuickSearch(query, type) {
        // Set form values
        if (query) document.getElementById('search-query').value = query;
        if (type) document.getElementById('crime-type-filter').value = type;
        
        // Clear other filters
        document.getElementById('location-filter').value = '';
        document.getElementById('date-from').value = '';
        document.getElementById('date-to').value = '';
        
        // Perform search
        this.performSearch();
    }

    displaySearchResults(results) {
        const resultsCard = document.getElementById('search-results-card');
        const noResultsCard = document.getElementById('no-results');
        const resultsCount = document.getElementById('results-count');
        const resultsTable = document.querySelector('#search-results-table tbody');
        
        if (results.length > 0) {
            // Show results
            if (resultsCard) resultsCard.style.display = 'block';
            if (noResultsCard) noResultsCard.style.display = 'none';
            if (resultsCount) resultsCount.textContent = results.length;
            
            // Populate table
            if (resultsTable) {
                resultsTable.innerHTML = results.map(record => `
                    <tr>
                        <td style="font-weight: 500;">#${record.id}</td>
                        <td>
                            <div>${record.date}</div>
                            <div style="color: #64748b; font-size: 0.875rem;">${record.time}</div>
                        </td>
                        <td>
                            <span class="badge ${this.getCrimeTypeBadgeClass(record.type)}">${record.type}</span>
                        </td>
                        <td>${record.location}</td>
                        <td style="max-width: 300px; overflow: hidden; text-overflow: ellipsis;">${record.description}</td>
                    </tr>
                `).join('');
            }
        } else {
            // Show no results
            if (resultsCard) resultsCard.style.display = 'none';
            if (noResultsCard) noResultsCard.style.display = 'block';
        }
    }

    getCrimeTypeBadgeClass(type) {
        const classes = {
            'Theft': 'blue',
            'Burglary': 'red',
            'Vandalism': 'yellow',
            'Assault': 'purple'
        };
        return classes[type] || 'medium';
    }

    clearSearchFilters() {
        document.getElementById('search-query').value = '';
        document.getElementById('crime-type-filter').value = '';
        document.getElementById('location-filter').value = '';
        document.getElementById('date-from').value = '';
        document.getElementById('date-to').value = '';
        
        // Hide results
        document.getElementById('search-results-card').style.display = 'none';
        document.getElementById('no-results').style.display = 'none';
    }

    initReports() {
        const generateBtn = document.getElementById('generate-report-btn');
        
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                const reportType = document.getElementById('report-type')?.value || 'summary';
                const reportPeriod = document.getElementById('report-period')?.value || 'month';
                this.generateReport(reportType, reportPeriod);
            });
        }
        
        // Download current report button
        const downloadBtn = document.getElementById('download-current-report');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                if (this.currentReport) {
                    reportGenerator.downloadReport(this.currentReport);
                }
            });
        }
    }

    generateReport(type, period) {
        console.log(`Generating ${type} report for ${period}...`);
        
        // Show loading
        this.showLoading();
        
        // Simulate report generation delay
        setTimeout(() => {
            const report = reportGenerator.generateReport(type, period);
            this.currentReport = report;
            this.displayReportPreview(report);
            this.hideLoading();
        }, 1500);
    }

    displayReportPreview(report) {
        const previewCard = document.getElementById('report-preview');
        const contentDiv = document.getElementById('report-content');
        
        if (previewCard && contentDiv) {
            previewCard.style.display = 'block';
            
            // Generate preview content
            let content = `
                <div style="margin-bottom: 2rem;">
                    <h4>${report.title}</h4>
                    <p style="color: #64748b;">Generated: ${report.generatedAt}</p>
                    <p style="color: #64748b;">Period: ${report.period}</p>
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 2rem;">
                    <div style="text-align: center; padding: 1rem; background: #dbeafe; border-radius: 0.5rem;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #1d4ed8;">${report.summary.totalCrimes}</div>
                        <div style="font-size: 0.875rem; color: #1e40af;">Total Crimes</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #dcfce7; border-radius: 0.5rem;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #16a34a;">${report.summary.crimeTypes}</div>
                        <div style="font-size: 0.875rem; color: #15803d;">Crime Types</div>
                    </div>
                    <div style="text-align: center; padding: 1rem; background: #fef3c7; border-radius: 0.5rem;">
                        <div style="font-size: 1.5rem; font-weight: bold; color: #d97706;">${report.summary.locations}</div>
                        <div style="font-size: 0.875rem; color: #b45309;">Locations</div>
                    </div>
                </div>
            `;
            
            if (report.analysis.crimeTypes) {
                content += `
                    <div style="margin-bottom: 2rem;">
                        <h5 style="margin-bottom: 1rem;">Top Crime Types</h5>
                        ${report.analysis.crimeTypes.slice(0, 3).map(item => `
                            <div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
                                <span>${item.type}</span>
                                <span style="font-weight: 500;">${item.count} (${item.percentage}%)</span>
                            </div>
                        `).join('')}
                    </div>
                `;
            }
            
            contentDiv.innerHTML = content;
        }
    }

    showLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
}

// Global functions for report buttons
function generateReport(type) {
    if (window.crimeApp) {
        window.crimeApp.generateReport(type, 'month');
    }
}

function downloadReport(type) {
    if (window.crimeApp && window.crimeApp.currentReport) {
        reportGenerator.downloadReport(window.crimeApp.currentReport);
    } else {
        // Generate and download immediately
        const report = reportGenerator.generateReport(type, 'month');
        reportGenerator.downloadReport(report);
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.crimeApp = new CrimeApp();
    console.log('Crime Pattern Detection System loaded successfully!');
});