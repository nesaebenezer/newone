// Chart Generation using HTML5 Canvas
// Simple chart implementations without external libraries

class ChartRenderer {
    constructor() {
        this.colors = chartColors.primary;
    }

    // Draw bar chart
    drawBarChart(canvas, data, title) {
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Chart dimensions
        const margin = { top: 40, right: 40, bottom: 80, left: 80 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        // Find max value for scaling
        const maxValue = Math.max(...data.values);
        const scale = chartHeight / maxValue;
        
        // Draw title
        ctx.fillStyle = '#1a202c';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(title, width / 2, 25);
        
        // Draw bars
        const barWidth = chartWidth / data.labels.length * 0.8;
        const barSpacing = chartWidth / data.labels.length * 0.2;
        
        data.labels.forEach((label, index) => {
            const barHeight = data.values[index] * scale;
            const x = margin.left + (index * (barWidth + barSpacing)) + barSpacing / 2;
            const y = margin.top + chartHeight - barHeight;
            
            // Draw bar
            ctx.fillStyle = data.colors ? data.colors[index] : this.colors[index % this.colors.length];
            ctx.fillRect(x, y, barWidth, barHeight);
            
            // Draw value on top of bar
            ctx.fillStyle = '#1a202c';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(data.values[index], x + barWidth / 2, y - 5);
            
            // Draw label
            ctx.save();
            ctx.translate(x + barWidth / 2, margin.top + chartHeight + 20);
            ctx.rotate(-Math.PI / 4);
            ctx.textAlign = 'right';
            ctx.fillText(label, 0, 0);
            ctx.restore();
        });
        
        // Draw axes
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top);
        ctx.lineTo(margin.left, margin.top + chartHeight);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top + chartHeight);
        ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
        ctx.stroke();
        
        // Y-axis labels
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
            const value = (maxValue / steps) * i;
            const y = margin.top + chartHeight - (value * scale);
            
            ctx.fillStyle = '#64748b';
            ctx.font = '10px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(value), margin.left - 10, y + 3);
            
            // Grid lines
            ctx.strokeStyle = '#f1f5f9';
            ctx.beginPath();
            ctx.moveTo(margin.left, y);
            ctx.lineTo(margin.left + chartWidth, y);
            ctx.stroke();
        }
    }

    // Draw pie chart
    drawPieChart(canvas, data, title) {
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Chart dimensions
        const centerX = width / 2;
        const centerY = height / 2 + 20;
        const radius = Math.min(width, height) / 3;
        
        // Calculate total and angles
        const total = data.values.reduce((sum, val) => sum + val, 0);
        let currentAngle = -Math.PI / 2; // Start from top
        
        // Draw title
        ctx.fillStyle = '#1a202c';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(title, width / 2, 25);
        
        // Draw pie slices
        data.labels.forEach((label, index) => {
            const sliceAngle = (data.values[index] / total) * 2 * Math.PI;
            const color = data.colors ? data.colors[index] : this.colors[index % this.colors.length];
            
            // Draw slice
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
            
            // Draw percentage label
            const labelAngle = currentAngle + sliceAngle / 2;
            const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
            const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
            const percentage = ((data.values[index] / total) * 100).toFixed(1);
            
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(`${percentage}%`, labelX, labelY);
            
            currentAngle += sliceAngle;
        });
        
        // Draw legend
        const legendY = height - 60;
        const legendItemWidth = width / data.labels.length;
        
        data.labels.forEach((label, index) => {
            const x = (index * legendItemWidth) + (legendItemWidth / 2);
            const color = data.colors ? data.colors[index] : this.colors[index % this.colors.length];
            
            // Legend color box
            ctx.fillStyle = color;
            ctx.fillRect(x - 30, legendY, 15, 15);
            
            // Legend text
            ctx.fillStyle = '#1a202c';
            ctx.font = '10px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(label, x - 10, legendY + 12);
        });
    }

    // Draw line chart
    drawLineChart(canvas, data, title) {
        const ctx = canvas.getContext('2d');
        const { width, height } = canvas;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Chart dimensions
        const margin = { top: 40, right: 40, bottom: 60, left: 60 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
        
        // Find max value for scaling
        const maxValue = Math.max(...data.values);
        const minValue = Math.min(...data.values);
        const valueRange = maxValue - minValue || 1;
        
        // Draw title
        ctx.fillStyle = '#1a202c';
        ctx.font = 'bold 16px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(title, width / 2, 25);
        
        // Draw axes
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        
        // Y-axis
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top);
        ctx.lineTo(margin.left, margin.top + chartHeight);
        ctx.stroke();
        
        // X-axis
        ctx.beginPath();
        ctx.moveTo(margin.left, margin.top + chartHeight);
        ctx.lineTo(margin.left + chartWidth, margin.top + chartHeight);
        ctx.stroke();
        
        // Draw grid lines and Y-axis labels
        const steps = 5;
        for (let i = 0; i <= steps; i++) {
            const value = minValue + (valueRange / steps) * i;
            const y = margin.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
            
            ctx.fillStyle = '#64748b';
            ctx.font = '10px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(Math.round(value), margin.left - 10, y + 3);
            
            // Grid lines
            ctx.strokeStyle = '#f1f5f9';
            ctx.beginPath();
            ctx.moveTo(margin.left, y);
            ctx.lineTo(margin.left + chartWidth, y);
            ctx.stroke();
        }
        
        // Draw line
        ctx.strokeStyle = data.color || '#3b82f6';
        ctx.lineWidth = 3;
        ctx.beginPath();
        
        const pointSpacing = chartWidth / (data.values.length - 1);
        
        data.values.forEach((value, index) => {
            const x = margin.left + (index * pointSpacing);
            const y = margin.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.stroke();
        
        // Draw points
        ctx.fillStyle = data.color || '#3b82f6';
        data.values.forEach((value, index) => {
            const x = margin.left + (index * pointSpacing);
            const y = margin.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fill();
        });
        
        // Draw X-axis labels (show every 4th label to avoid crowding)
        ctx.fillStyle = '#64748b';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        
        data.labels.forEach((label, index) => {
            if (index % 4 === 0) {
                const x = margin.left + (index * pointSpacing);
                ctx.fillText(label, x, margin.top + chartHeight + 20);
            }
        });
    }
}

// Initialize chart renderer
const chartRenderer = new ChartRenderer();

// Chart update functions
function updateDashboardCharts() {
    const analysis = crimeAnalyzer.getComprehensiveAnalysis();
    
    // Crime types chart
    const crimeTypesCanvas = document.getElementById('crimeTypesChart');
    if (crimeTypesCanvas) {
        const crimeTypesData = {
            labels: analysis.frequentCrimes.map(([type]) => type),
            values: analysis.frequentCrimes.map(([, count]) => count),
            colors: chartColors.primary
        };
        chartRenderer.drawBarChart(crimeTypesCanvas, crimeTypesData, 'Crime Type Distribution');
    }
    
    // Locations chart
    const locationsCanvas = document.getElementById('locationsChart');
    if (locationsCanvas) {
        const locationsData = {
            labels: analysis.hotspots.map(([location]) => location),
            values: analysis.hotspots.map(([, count]) => count),
            colors: chartColors.locations
        };
        chartRenderer.drawPieChart(locationsCanvas, locationsData, 'Location Breakdown');
    }
}

function updateCrimeTypesChart() {
    const analysis = crimeAnalyzer.getComprehensiveAnalysis();
    const canvas = document.getElementById('crimeTypesDetailChart');
    
    if (canvas) {
        const data = {
            labels: analysis.frequentCrimes.map(([type]) => type),
            values: analysis.frequentCrimes.map(([, count]) => count),
            colors: chartColors.primary
        };
        chartRenderer.drawBarChart(canvas, data, 'Crime Type Frequency Distribution');
    }
}

function updateHotspotsChart() {
    const analysis = crimeAnalyzer.getComprehensiveAnalysis();
    const canvas = document.getElementById('hotspotsChart');
    
    if (canvas) {
        const data = {
            labels: analysis.hotspots.map(([location]) => location),
            values: analysis.hotspots.map(([, count]) => count),
            colors: chartColors.locations
        };
        chartRenderer.drawBarChart(canvas, data, 'Crime Distribution by Location');
    }
}

function updateTimePatternsChart() {
    const analysis = crimeAnalyzer.getComprehensiveAnalysis();
    const canvas = document.getElementById('timePatternsChart');
    
    if (canvas) {
        const hourlyData = analysis.timePatterns.hourly;
        const data = {
            labels: hourlyData.map(([hour]) => `${hour.toString().padStart(2, '0')}:00`),
            values: hourlyData.map(([, count]) => count),
            color: '#3b82f6'
        };
        chartRenderer.drawLineChart(canvas, data, '24-Hour Crime Distribution');
    }
}

function updateClustersChart() {
    const analysis = crimeAnalyzer.getComprehensiveAnalysis();
    const canvas = document.getElementById('clustersChart');
    
    if (canvas) {
        const data = {
            labels: analysis.clusters.map(cluster => `${cluster.startDate} to ${cluster.endDate}`),
            values: analysis.clusters.map(cluster => cluster.totalCrimes),
            colors: analysis.clusters.map(() => '#ef4444')
        };
        chartRenderer.drawBarChart(canvas, data, 'Crime Clusters (7-day sliding window)');
    }
}

// Export chart renderer
window.chartRenderer = chartRenderer;