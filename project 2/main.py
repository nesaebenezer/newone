"""
Main Crime Pattern Detection System
Academic Project - 2nd Year CSE Internship
Uses basic DSA concepts for pattern detection
"""
import json
from data_loader import CrimeDataLoader
from pattern_analyzer import CrimePatternAnalyzer
from chart_generator import ChartDataGenerator

def main():
    """Main function to run the crime pattern detection system"""
    print("=" * 60)
    print("CRIME PATTERN DETECTION SYSTEM")
    print("=" * 60)
    
    # Step 1: Load crime data
    print("\n1. Loading crime data...")
    loader = CrimeDataLoader('crime_data.csv')
    data = loader.load_data()
    
    if not data:
        print("Failed to load data. Exiting...")
        return
    
    print(f"Loaded {len(data)} crime records")
    
    # Step 2: Analyze patterns using DSA
    print("\n2. Analyzing crime patterns...")
    analyzer = CrimePatternAnalyzer(data)
    results = analyzer.get_comprehensive_analysis()
    
    # Step 3: Display analysis results
    print("\n3. ANALYSIS RESULTS")
    print("-" * 40)
    
    print(f"\nTotal Crimes: {results['total_crimes']}")
    print(f"Unique Crime Types: {results['unique_types']}")
    print(f"Unique Locations: {results['unique_locations']}")
    
    print("\nMost Frequent Crime Types:")
    for i, (crime_type, count) in enumerate(results['frequent_crimes'], 1):
        print(f"  {i}. {crime_type}: {count} incidents")
    
    print("\nCrime Hotspots:")
    for i, (location, count) in enumerate(results['hotspots'], 1):
        print(f"  {i}. {location}: {count} incidents")
    
    print("\nTime Pattern Analysis:")
    periods = results['time_patterns']['periods']
    for period, count in periods:
        print(f"  {period.title()}: {count} incidents")
    
    if results['clusters']:
        print(f"\nDetected {len(results['clusters'])} high-activity clusters:")
        for i, cluster in enumerate(results['clusters'], 1):
            print(f"  {i}. {cluster['start_date']} to {cluster['end_date']}: {cluster['total_crimes']} crimes")
    
    # Step 4: Generate visualization data
    print("\n4. Generating visualization data...")
    chart_gen = ChartDataGenerator(results)
    chart_data = chart_gen.save_charts_to_json()
    
    if chart_data:
        print("Chart data generated successfully!")
        print("\nVisualization data saved to 'chart_data.json'")
        print("You can now view the web dashboard for interactive charts.")
    
    # Step 5: Demonstrate search functionality
    print("\n5. SEARCH FUNCTIONALITY DEMO")
    print("-" * 40)
    
    # Search by crime type
    theft_crimes = analyzer.search_crimes_by_type('theft')
    print(f"\nFound {len(theft_crimes)} theft incidents:")
    for crime in theft_crimes[:3]:  # Show first 3
        print(f"  {crime['date']} at {crime['time']} in {crime['location']}")
    
    # Search by location
    downtown_crimes = analyzer.search_crimes_by_location('downtown')
    print(f"\nFound {len(downtown_crimes)} crimes in downtown area:")
    for crime in downtown_crimes[:3]:  # Show first 3
        print(f"  {crime['type']} on {crime['date']} at {crime['time']}")
    
    print("\n" + "=" * 60)
    print("ANALYSIS COMPLETE!")
    print("Check the web dashboard for interactive visualizations.")
    print("=" * 60)

if __name__ == "__main__":
    main()