"use client";

import { useState } from "react";

const ExcalidrawToolbar = ({ onToolChange }: { onToolChange?: (tool: string) => void }) => {
  const [selectedTool, setSelectedTool] = useState("select");

  const handleToolClick = (tool: string) => {
    setSelectedTool(tool);
    if (onToolChange) {
      onToolChange(tool);
    }
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 border-b border-gray-200">
      <button
        onClick={() => handleToolClick("select")}
        className={`p-2 rounded ${selectedTool === "select" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Select
      </button>
      <button
        onClick={() => handleToolClick("rectangle")}
        className={`p-2 rounded ${selectedTool === "rectangle" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Rectangle
      </button>
      <button
        onClick={() => handleToolClick("ellipse")}
        className={`p-2 rounded ${selectedTool === "ellipse" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Ellipse
      </button>
      <button
        onClick={() => handleToolClick("diamond")}
        className={`p-2 rounded ${selectedTool === "diamond" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Diamond
      </button>
      <button
        onClick={() => handleToolClick("arrow")}
        className={`p-2 rounded ${selectedTool === "arrow" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Arrow
      </button>
      <button
        onClick={() => handleToolClick("line")}
        className={`p-2 rounded ${selectedTool === "line" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Line
      </button>
      <button
        onClick={() => handleToolClick("freedraw")}
        className={`p-2 rounded ${selectedTool === "freedraw" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Freedraw
      </button>
      <button
        onClick={() => handleToolClick("text")}
        className={`p-2 rounded ${selectedTool === "text" ? "bg-blue-200" : "hover:bg-gray-200"}`}
      >
        Text
      </button>
      {/* Add more tools as needed */}
    </div>
  );
};

export default ExcalidrawToolbar;