# Crime Pattern Detection System

A comprehensive HTML/CSS/JavaScript crime analysis platform built as part of a 2nd-year Computer Science Engineering internship project. This system uses fundamental Data Structures and Algorithms (DSA) concepts to analyze crime patterns from sample datasets.

## 🚀 Live Demo

**GitHub Pages:** [https://yourusername.github.io/crime-pattern-detection](https://yourusername.github.io/crime-pattern-detection)

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [DSA Concepts Used](#dsa-concepts-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [GitHub Pages Setup](#github-pages-setup)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🔍 Core Analysis Features
- **Crime Type Analysis**: Frequency counting using hash maps
- **Hotspot Detection**: Geographic crime distribution analysis
- **Time Pattern Recognition**: Temporal crime clustering
- **Advanced Search**: Multi-criteria crime record filtering
- **Report Generation**: Comprehensive crime analysis reports with download functionality

### 📊 Visualization Dashboard
- Custom HTML5 Canvas charts (no external dependencies)
- Interactive bar charts for crime type distribution
- Pie charts for location-based analysis
- Line charts for time pattern visualization
- Real-time data filtering and sorting

### 🔧 Data Management
- Sample crime dataset included
- Data validation and quality assessment
- Export functionality for reports
- Real-time data statistics

## 🛠 Technology Stack

### Frontend
- **HTML5** with semantic markup
- **CSS3** with modern features (Grid, Flexbox, Animations)
- **Vanilla JavaScript** (ES6+)
- **HTML5 Canvas** for chart rendering
- **Font Awesome** for icons

### No External Dependencies
- Pure JavaScript implementation
- Custom chart rendering
- No frameworks or libraries required
- Lightweight and fast loading

## 🧮 DSA Concepts Used

### 1. Hash Maps (O(1) Operations)
```javascript
// Crime type frequency counting
buildHashMaps() {
    this.data.forEach(record => {
        const crimeType = record.type;
        this.crimeTypeHash.set(crimeType, (this.crimeTypeHash.get(crimeType) || 0) + 1);
    });
}
```

### 2. Linear Search (O(n) Complexity)
```javascript
// Multi-criteria search implementation
searchCrimes(filters) {
    return this.data.filter(record => {
        // Apply multiple search criteria
        return this.matchesAllFilters(record, filters);
    });
}
```

### 3. Sorting Algorithms (O(n log n))
```javascript
// Sort crime types by frequency
getFrequentCrimeTypes(topN = 5) {
    const sortedCrimes = Array.from(this.crimeTypeHash.entries())
        .sort((a, b) => b[1] - a[1]);
    return sortedCrimes.slice(0, topN);
}
```

### 4. Sliding Window Algorithm
```javascript
// Detect crime clusters using sliding window
detectClusters(windowSize = 7) {
    for (let i = 0; i <= sortedDates.length - windowSize; i++) {
        const windowDates = sortedDates.slice(i, i + windowSize);
        const totalCrimesInWindow = windowDates.reduce((sum, date) => 
            sum + (dateCounts.get(date) || 0), 0);
        // Analyze cluster patterns
    }
}
```

## 🚀 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (for cloning)
- Text editor (VS Code, Sublime Text, etc.)

### Clone Repository
```bash
git clone https://github.com/yourusername/crime-pattern-detection.git
cd crime-pattern-detection
```

### Local Development
```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Use a local server (recommended)
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js (if you have it installed)
npx http-server

# Then open http://localhost:8000 in your browser
```

## 📖 Usage

### 1. Dashboard Overview
- View comprehensive crime statistics
- Explore different visualization types
- Monitor system status and recent activity

### 2. Crime Type Analysis
- Detailed breakdown of crime categories
- Frequency distribution charts
- Trend analysis and severity levels

### 3. Hotspot Detection
- Geographic crime distribution
- Location risk assessment
- Population and crime rate analysis

### 4. Time Pattern Analysis
- 24-hour crime distribution
- Peak hours identification
- Weekly and seasonal patterns

### 5. Cluster Detection
- Sliding window algorithm implementation
- High-activity period identification
- Risk level classification

### 6. Search Functionality
- Multi-criteria filtering
- Real-time search results
- Export search results

### 7. Report Generation
- Multiple report types
- Downloadable text files
- Comprehensive analysis summaries

## 📁 Project Structure

```
crime-pattern-detection/
├── index.html              # Main HTML file
├── styles.css              # CSS styles and responsive design
├── data.js                 # Sample crime dataset
├── dsa.js                  # DSA implementations and algorithms
├── charts.js               # Custom chart rendering with Canvas
├── app.js                  # Main application logic
├── README.md               # Project documentation
└── assets/                 # Additional assets (if any)
```

## 🌐 GitHub Pages Setup

### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and **/ (root)** folder
6. Click **Save**

### 2. Access Your Site
Your site will be available at:
```
https://yourusername.github.io/crime-pattern-detection
```

### 3. Custom Domain (Optional)
1. Add a `CNAME` file to your repository root
2. Add your custom domain to the file
3. Configure DNS settings with your domain provider

## 🔧 Key Algorithms

### 1. Crime Frequency Analysis
- **Time Complexity**: O(n) for counting, O(n log n) for sorting
- **Space Complexity**: O(k) where k is unique crime types
- **Implementation**: Hash map for frequency counting

### 2. Hotspot Detection
- **Time Complexity**: O(n) for location counting
- **Space Complexity**: O(m) where m is unique locations
- **Implementation**: Geographic frequency analysis

### 3. Time Pattern Recognition
- **Time Complexity**: O(n) for hour extraction and counting
- **Space Complexity**: O(24) for hourly buckets
- **Implementation**: Time-based clustering

### 4. Cluster Detection
- **Time Complexity**: O(n * w) where w is window size
- **Space Complexity**: O(n) for date storage
- **Implementation**: Sliding window algorithm

## 📊 Sample Data Format

The system includes a sample dataset with 40 crime records:

```javascript
{
    id: 1,
    date: '2024-01-15',
    time: '14:30',
    type: 'Theft',
    location: 'Downtown',
    description: 'Shoplifting incident at retail store on Main Street'
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow JavaScript ES6+ standards
- Maintain consistent code formatting
- Add comments for complex algorithms
- Update documentation for new features
- Test across different browsers

## 📝 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎓 Academic Context

This project was developed as part of a 2nd-year Computer Science Engineering internship, focusing on:

- **Data Structures**: Hash maps, arrays, sets
- **Algorithms**: Searching, sorting, sliding window
- **Web Development**: HTML5, CSS3, Vanilla JavaScript
- **Data Visualization**: Custom chart implementations
- **Software Engineering**: Modular design, clean code principles

## 📞 Contact

**Project Maintainer**: [Your Name]
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [@yourusername](https://github.com/yourusername)

## 🙏 Acknowledgments

- Thanks to the Computer Science Engineering department for project guidance
- Inspiration from real-world crime analysis systems
- Font Awesome for icons
- Modern web standards and best practices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**⭐ Star this repository if you found it helpful!**

**🔗 Perfect for GitHub Pages deployment - no build process required!**