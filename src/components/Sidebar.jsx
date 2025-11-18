import React from "react";

const Sidebar = ({ selectedElement, onClose }) => {
  if (!selectedElement) return null;

  return (
    <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-lg p-6 overflow-y-auto z-10">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-gray-800">Element Details</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 text-2xl"
        >
          ×
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold text-gray-600">Type</label>
          <p className="text-gray-800">{selectedElement.type || "N/A"}</p>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Material
          </label>
          <p className="text-gray-800">{selectedElement.material || "N/A"}</p>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">
            Dimensions
          </label>
          <p className="text-gray-800">{selectedElement.dimensions || "N/A"}</p>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">Status</label>
          <p
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              selectedElement.status === "completed"
                ? "bg-green-100 text-green-800"
                : selectedElement.status === "in-progress"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {selectedElement.status || "N/A"}
          </p>
        </div>

        <div>
          <label className="text-sm font-semibold text-gray-600">Cost</label>
          <p className="text-gray-800">
            ${selectedElement.cost?.toLocaleString() || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
