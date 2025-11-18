import { useState } from "react";
import BimViewer from "./components/BimViewer";
import Dashboard from "./components/dashboard/Dashboard";
import Sidebar from "./components/Sidebar";
import FileUpload from "./components/FileUpload";
import { projectData } from "./data/mockData";

function App() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [showDashboard, setShowDashboard] = useState(false);
  const [ifcFile, setIfcFile] = useState(null);

  const handleElementClick = (element) => {
    setSelectedElement(element);
  };

  const handleFileSelect = (file) => {
    setIfcFile(file);
    setShowDashboard(false); // Switch to 3D view when file is loaded
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", margin: 0 }}>
            BIM Viewer Dashboard
          </h1>
          <button
            onClick={() => setShowDashboard(!showDashboard)}
            style={{
              backgroundColor: "white",
              color: "#2563eb",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            }}
          >
            {showDashboard ? "Show 3D View" : "Show Dashboard"}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        {showDashboard ? (
          <div
            style={{
              padding: "1.5rem",
              height: "100%",
              overflowY: "auto",
              backgroundColor: "#f9fafb",
            }}
          >
            <FileUpload onFileSelect={handleFileSelect} />
            <Dashboard projectData={projectData} />
          </div>
        ) : (
          <>
            <BimViewer onElementClick={handleElementClick} ifcFile={ifcFile} />
            <Sidebar
              selectedElement={selectedElement}
              onClose={() => setSelectedElement(null)}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
