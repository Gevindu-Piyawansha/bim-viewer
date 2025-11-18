import React from "react";

const MetricsCards = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-600 text-sm font-semibold mb-2">
          Overall Progress
        </h3>
        <p className="text-3xl font-bold text-blue-600">{metrics.progress}%</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Cost</h3>
        <p className="text-3xl font-bold text-green-600">
          ${metrics.totalCost.toLocaleString()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-600 text-sm font-semibold mb-2">Elements</h3>
        <p className="text-3xl font-bold text-purple-600">
          {metrics.totalElements}
        </p>
      </div>
    </div>
  );
};

export default MetricsCards;
