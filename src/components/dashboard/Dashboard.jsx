import React from "react";
import MetricsCards from "./MetricsCards";
import ProgressChart from "./ProgressChart";
import MaterialChart from "./MaterialChart";

const Dashboard = ({ projectData }) => {
  return (
    <div className="h-full overflow-y-auto bg-gray-50 p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Project Dashboard
      </h2>

      <MetricsCards metrics={projectData.metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ProgressChart data={projectData.floorProgress} />
        <MaterialChart data={projectData.materials} />
      </div>
    </div>
  );
};

export default Dashboard;
