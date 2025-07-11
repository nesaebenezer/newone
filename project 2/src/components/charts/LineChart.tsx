import React from 'react';

interface LineChartProps {
  data: {
    labels: string[];
    values: number[];
    color?: string;
  };
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  const maxValue = Math.max(...data.values);
  const minValue = Math.min(...data.values);
  const range = maxValue - minValue;
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold mb-6 text-gray-800">{title}</h3>
      <div className="h-80 flex items-end gap-1 border-b border-l border-gray-200 p-4">
        {data.labels.map((label, index) => {
          const height = range > 0 ? ((data.values[index] - minValue) / range) * 250 : 50;
          return (
            <div key={label} className="flex-1 flex flex-col items-center group">
              <div className="relative">
                <div
                  className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600 group-hover:shadow-lg min-h-[4px]"
                  style={{ height: `${Math.max(height, 4)}px` }}
                  title={`${label}: ${data.values[index]}`}
                />
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 rounded shadow">
                  {data.values[index]}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left w-8">
                {index % 4 === 0 ? label.slice(0, 5) : ''}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Min: {minValue}</span>
        <span>Max: {maxValue}</span>
        <span>Avg: {(data.values.reduce((a, b) => a + b, 0) / data.values.length).toFixed(1)}</span>
      </div>
    </div>
  );
};

export default LineChart;