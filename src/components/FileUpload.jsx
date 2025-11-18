import React from "react";

const FileUpload = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.name.endsWith(".ifc")) {
      onFileSelect(file);
    } else {
      alert("Please select a valid IFC file");
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "white",
        borderRadius: "0.5rem",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        marginBottom: "1rem",
      }}
    >
      <label
        style={{
          display: "block",
          marginBottom: "0.5rem",
          fontWeight: "600",
          color: "#374151",
        }}
      >
        Upload IFC File:
      </label>
      <input
        type="file"
        accept=".ifc"
        onChange={handleFileChange}
        style={{
          padding: "0.5rem",
          border: "1px solid #d1d5db",
          borderRadius: "0.375rem",
          width: "100%",
          cursor: "pointer",
        }}
      />
      <p
        style={{
          marginTop: "0.5rem",
          fontSize: "0.875rem",
          color: "#6b7280",
        }}
      >
        Select an IFC file to view your BIM model in 3D
      </p>
    </div>
  );
};

export default FileUpload;
