import React, { useState } from "react";

const WhiteboardApp = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side - Whiteboard */}
      <div className="w-1/2 bg-gray-200 flex justify-center items-center p-4">
        <div className="w-full h-full border border-gray-400 rounded-lg bg-white">
          {/* Whiteboard Component Goes Here */}
        </div>
      </div>
      
      {/* Right Side - ML Output */}
      <div className="w-1/2 bg-gray-100 flex flex-col p-4">
        <h2 className="text-xl font-semibold mb-4">ML Output</h2>
        <div className="border border-gray-400 rounded-lg bg-white p-4 h-full">
          {/* ML Output Display */}
          <p className="text-gray-500">Waiting for ML predictions...</p>
        </div>
      </div>
    </div>
  );
};

export default WhiteboardApp;
