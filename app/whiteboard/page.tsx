"use client";
import React, { useState } from 'react';
import Whiteboard from '../components/Whiteboard';

type Props = {};

const Home = (props: Props) => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePrediction = (
    prediction: string | null,
    error: string | null,
    loading: boolean
  ) => {
    setPrediction(prediction);
    setError(error);
    setLoading(loading);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen">
      <div className="flex h-screen">
        {/* Left Side - Whiteboard */}
        <div className="w-1/2 p-4 flex flex-col items-center justify-center transition-transform duration-300 hover:scale-102 cursor-pointer">
          <h2 className="text-xl font-semibold mb-4 text-blue-300">Whiteboard</h2>
          <div className="w-full h-full border border-gray-700 rounded-lg bg-black">
            <Whiteboard onPrediction={handlePrediction} />
          </div>
        </div>

        {/* Right Side - ML Output */}
        <div className="w-1/2 p-4 flex flex-col">
          <h2 className="text-xl font-semibold mb-4 text-green-300">Result</h2>
          <div className="border border-gray-700 rounded-lg bg-black p-4 h-full overflow-y-auto transition-opacity duration-300 flex flex-col items-center justify-center">
            {/* ML Output Display */}
            {loading && (
              <div className="flex items-center justify-center">
                <p className="text-gray-400">Processing...</p>
              </div>
            )}
            {prediction && (
              <div className="rounded-lg bg-gradient-to-r from-green-700 to-green-900 shadow-md border border-green-600 p-6 w-3/4 text-center">
                <p className="text-lg font-bold text-green-200">
                  Predicted Label: <span className="text-yellow-300">{prediction}</span>
                </p>
              </div>
            )}
            {error && (
              <div className="rounded-md shadow-md bg-gradient-to-r from-red-700 to-red-900 border border-red-600 p-4 w-3/4 text-center">
                <p className="text-red-300">{error}</p>
              </div>
            )}
            {!loading && !prediction && !error && (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Predictions will appear here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;