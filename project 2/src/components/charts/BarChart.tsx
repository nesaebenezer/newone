import React from 'react';

interface BarChartProps {
  data: {
    labels: string[];
    values: number[];
    colors?: string[];
  };
  title: string;
  showValues?: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ data, title, showValues = true }) => {
  const maxValue = Math.max(...data.values);
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">{title}</h3>
      <div className="space-y-4">
        {data.labels.map((label, index) => (
          <div key={label} className="flex items-center gap-4">
            <div className="w-28 text-sm text-gray-600 font-medium truncate">{label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-8 relative">
              <div
                className="h-8 rounded-full flex items-center justify-end pr-3 text-white text-sm font-medium transition-all duration-500 hover:opacity-90"
                style={{
                  width: `${(data.values[index] / maxValue) * 100}%`,
                  backgroundColor: data.colors?.[index] || '#3B82F6'
                }}
              >
                {showValues && data.values[index]}
              </div>
            </div>
            <div className="w-12 text-right text-sm text-gray-500">
              {((data.values[index] / data.values.reduce((a, b) => a + b, 0)) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChart;