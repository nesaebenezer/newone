import React from 'react';

interface PieChartProps {
  data: {
    labels: string[];
    values: number[];
    colors?: string[];
  };
  title: string;
}

const PieChart: React.FC<PieChartProps> = ({ data, title }) => {
  const total = data.values.reduce((sum, val) => sum + val, 0);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">{title}</h3>
      <div className="space-y-4">
        {data.labels.map((label, index) => {
          const percentage = ((data.values[index] / total) * 100).toFixed(1);
          return (
            <div key={label} className="flex items-center gap-4 group">
              <div
                className="w-6 h-6 rounded-full shadow-sm group-hover:scale-110 transition-transform"
                style={{ backgroundColor: data.colors?.[index] || '#3B82F6' }}
              />
              <div className="flex-1 flex justify-between items-center">
                <span className="text-sm text-gray-600 font-medium">{label}</span>
                <div className="text-right">
                  <span className="text-sm font-bold text-gray-900">{percentage}%</span>
                  <span className="text-xs text-gray-500 ml-2">({data.values[index]})</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PieChart;