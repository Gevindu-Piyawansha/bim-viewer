import React, { useState } from "react";

const MeasurementTool = ({ isActive, onToggle, measurements }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        backgroundColor: "white",
        padding: "1rem",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        zIndex: 10,
        minWidth: "200px",
      }}
    >
      <div style={{ marginBottom: "0.5rem" }}>
        <button
          onClick={onToggle}
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: isActive ? "#ef4444" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {isActive ? "📏 Stop Measuring" : "📏 Measure Distance"}
        </button>
      </div>

      {isActive && (
        <p
          style={{
            fontSize: "0.875rem",
            color: "#6b7280",
            margin: "0.5rem 0 0 0",
          }}
        >
          Click two points to measure
        </p>
      )}

      {measurements.length > 0 && (
        <div
          style={{
            marginTop: "1rem",
            borderTop: "1px solid #e5e7eb",
            paddingTop: "0.5rem",
          }}
        >
          <h4
            style={{
              margin: "0 0 0.5rem 0",
              fontSize: "0.875rem",
              fontWeight: "600",
            }}
          >
            Measurements:
          </h4>
          {measurements.map((m, i) => (
            <div
              key={i}
              style={{
                fontSize: "0.875rem",
                padding: "0.25rem",
                backgroundColor: "#f3f4f6",
                borderRadius: "0.25rem",
                marginBottom: "0.25rem",
              }}
            >
              {m.distance.toFixed(2)}m
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MeasurementTool;
