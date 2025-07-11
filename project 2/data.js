// Crime Data - Sample dataset for analysis
const crimeData = [
    { id: 1, date: '2024-01-15', time: '14:30', type: 'Theft', location: 'Downtown', description: 'Shoplifting incident at retail store on Main Street' },
    { id: 2, date: '2024-01-15', time: '22:15', type: 'Burglary', location: 'Residential Area', description: 'Break-in at apartment complex on Oak Avenue' },
    { id: 3, date: '2024-01-16', time: '08:45', type: 'Vandalism', location: 'Park District', description: 'Graffiti on public property at Central Park' },
    { id: 4, date: '2024-01-16', time: '19:20', type: 'Theft', location: 'Downtown', description: 'Purse snatching incident near bus station' },
    { id: 5, date: '2024-01-17', time: '03:10', type: 'Burglary', location: 'Residential Area', description: 'Residential break-in on Elm Street' },
    { id: 6, date: '2024-01-17', time: '16:55', type: 'Assault', location: 'Commercial Zone', description: 'Physical altercation outside office building' },
    { id: 7, date: '2024-01-18', time: '11:30', type: 'Theft', location: 'Shopping Center', description: 'Vehicle theft from parking lot at mall' },
    { id: 8, date: '2024-01-18', time: '23:45', type: 'Burglary', location: 'Residential Area', description: 'Home invasion attempt on Pine Street' },
    { id: 9, date: '2024-01-19', time: '07:20', type: 'Vandalism', location: 'Park District', description: 'Property damage at playground equipment' },
    { id: 10, date: '2024-01-19', time: '18:30', type: 'Theft', location: 'Downtown', description: 'Bicycle theft near metro station' },
    { id: 11, date: '2024-01-20', time: '12:15', type: 'Assault', location: 'Commercial Zone', description: 'Workplace violence incident' },
    { id: 12, date: '2024-01-20', time: '21:40', type: 'Theft', location: 'Shopping Center', description: 'Shoplifting at electronics store' },
    { id: 13, date: '2024-01-21', time: '04:25', type: 'Burglary', location: 'Residential Area', description: 'Break-in at single family home' },
    { id: 14, date: '2024-01-21', time: '15:10', type: 'Vandalism', location: 'Park District', description: 'Damage to park benches and signs' },
    { id: 15, date: '2024-01-22', time: '09:35', type: 'Theft', location: 'Downtown', description: 'Wallet theft in crowded area' },
    { id: 16, date: '2024-01-22', time: '20:50', type: 'Assault', location: 'Commercial Zone', description: 'Bar fight escalation' },
    { id: 17, date: '2024-01-23', time: '06:45', type: 'Burglary', location: 'Residential Area', description: 'Garage break-in on Maple Drive' },
    { id: 18, date: '2024-01-23', time: '17:20', type: 'Theft', location: 'Shopping Center', description: 'Purse theft in department store' },
    { id: 19, date: '2024-01-24', time: '13:55', type: 'Vandalism', location: 'Park District', description: 'Spray paint on public restrooms' },
    { id: 20, date: '2024-01-24', time: '22:30', type: 'Theft', location: 'Downtown', description: 'Phone theft on public transport' },
    { id: 21, date: '2024-01-25', time: '10:15', type: 'Assault', location: 'Commercial Zone', description: 'Road rage incident in parking lot' },
    { id: 22, date: '2024-01-25', time: '19:40', type: 'Burglary', location: 'Residential Area', description: 'Apartment burglary on Cedar Street' },
    { id: 23, date: '2024-01-26', time: '05:50', type: 'Theft', location: 'Shopping Center', description: 'Car break-in at shopping plaza' },
    { id: 24, date: '2024-01-26', time: '14:25', type: 'Vandalism', location: 'Park District', description: 'Broken windows at community center' },
    { id: 25, date: '2024-01-27', time: '08:10', type: 'Assault', location: 'Commercial Zone', description: 'Altercation at restaurant' },
    { id: 26, date: '2024-01-27', time: '21:15', type: 'Theft', location: 'Downtown', description: 'Laptop theft from coffee shop' },
    { id: 27, date: '2024-01-28', time: '12:40', type: 'Burglary', location: 'Residential Area', description: 'House break-in during daytime' },
    { id: 28, date: '2024-01-28', time: '18:55', type: 'Vandalism', location: 'Park District', description: 'Damage to sports equipment' },
    { id: 29, date: '2024-01-29', time: '07:30', type: 'Theft', location: 'Shopping Center', description: 'Package theft from delivery area' },
    { id: 30, date: '2024-01-29', time: '23:20', type: 'Assault', location: 'Commercial Zone', description: 'Late night altercation' },
    { id: 31, date: '2024-01-30', time: '11:45', type: 'Burglary', location: 'Residential Area', description: 'Attempted break-in at townhouse' },
    { id: 32, date: '2024-01-30', time: '16:10', type: 'Theft', location: 'Downtown', description: 'Credit card theft and fraud' },
    { id: 33, date: '2024-01-31', time: '09:25', type: 'Vandalism', location: 'Park District', description: 'Graffiti on memorial statue' },
    { id: 34, date: '2024-01-31', time: '20:35', type: 'Assault', location: 'Commercial Zone', description: 'Dispute outside nightclub' },
    { id: 35, date: '2024-02-01', time: '06:15', type: 'Theft', location: 'Shopping Center', description: 'Early morning store break-in' },
    { id: 36, date: '2024-02-01', time: '15:50', type: 'Burglary', location: 'Residential Area', description: 'Condo break-in on Birch Lane' },
    { id: 37, date: '2024-02-02', time: '12:30', type: 'Vandalism', location: 'Park District', description: 'Damage to picnic tables' },
    { id: 38, date: '2024-02-02', time: '19:45', type: 'Theft', location: 'Downtown', description: 'Jewelry theft from display case' },
    { id: 39, date: '2024-02-03', time: '08:20', type: 'Assault', location: 'Commercial Zone', description: 'Customer service dispute escalation' },
    { id: 40, date: '2024-02-03', time: '22:10', type: 'Burglary', location: 'Residential Area', description: 'Late night break-in attempt' }
];

// Additional data for enhanced analysis
const locationDetails = {
    'Downtown': {
        population: 15000,
        crimeRate: 5.3,
        riskLevel: 'High',
        mainCrimes: ['Theft', 'Assault'],
        trend: '+12%'
    },
    'Residential Area': {
        population: 25000,
        crimeRate: 2.8,
        riskLevel: 'Medium',
        mainCrimes: ['Burglary', 'Vandalism'],
        trend: '-5%'
    },
    'Commercial Zone': {
        population: 8000,
        crimeRate: 7.5,
        riskLevel: 'Medium',
        mainCrimes: ['Assault', 'Theft'],
        trend: '+8%'
    },
    'Shopping Center': {
        population: 12000,
        crimeRate: 3.3,
        riskLevel: 'Low',
        mainCrimes: ['Theft', 'Fraud'],
        trend: '-15%'
    },
    'Park District': {
        population: 5000,
        crimeRate: 10.0,
        riskLevel: 'Low',
        mainCrimes: ['Vandalism', 'Drug Offense'],
        trend: '+20%'
    }
};

const crimeTypeDetails = {
    'Theft': {
        severity: 'Medium',
        peakHours: '14:00 - 18:00',
        trend: '+15%',
        description: 'Property theft including shoplifting and pickpocketing'
    },
    'Burglary': {
        severity: 'High',
        peakHours: '02:00 - 06:00',
        trend: '-8%',
        description: 'Breaking and entering into buildings'
    },
    'Vandalism': {
        severity: 'Low',
        peakHours: '20:00 - 24:00',
        trend: '+5%',
        description: 'Property damage and graffiti'
    },
    'Assault': {
        severity: 'High',
        peakHours: '22:00 - 02:00',
        trend: '-12%',
        description: 'Physical attacks and violent confrontations'
    }
};

// Color schemes for charts
const chartColors = {
    primary: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#f97316'],
    locations: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    risk: {
        high: '#ef4444',
        medium: '#f59e0b',
        low: '#10b981'
    }
};