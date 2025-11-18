import React from "react";

const Toolbar = ({
  onMeasureToggle,
  onScreenshot,
  onResetView,
  isMeasuring,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "white",
        padding: "0.75rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        display: "flex",
        gap: "0.5rem",
        zIndex: 10,
      }}
    >
      <button
        onClick={onMeasureToggle}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: isMeasuring ? "#ef4444" : "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.875rem",
        }}
        title="Measure distance"
      >
        📏 {isMeasuring ? "Stop" : "Measure"}
      </button>

      <button
        onClick={onScreenshot}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#10b981",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.875rem",
        }}
        title="Take screenshot"
      >
        📸 Screenshot
      </button>

      <button
        onClick={onResetView}
        style={{
          padding: "0.5rem 1rem",
          backgroundColor: "#6b7280",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "0.875rem",
        }}
        title="Reset camera view"
      >
        🔄 Reset View
      </button>
    </div>
  );
};

export default Toolbar;
