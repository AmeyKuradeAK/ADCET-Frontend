"use client";

import React from "react";

const WhiteboardDocumentation = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
          Whiteboard Application Documentation
        </h1>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Overview
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            This application provides a versatile whiteboard experience directly in your browser. With intuitive tools, you can draw, create shapes, manipulate images, and share your creations effortlessly.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Technologies Used
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>
              <span className="font-semibold text-blue-600">React:</span> For building dynamic and interactive user interfaces.
            </li>
            <li>
              <span className="font-semibold text-blue-600">HTML5 Canvas:</span> For powerful 2D graphics rendering.
            </li>
            <li>
              <span className="font-semibold text-blue-600">Tailwind CSS:</span> For rapid and responsive styling.
            </li>
            <li>
              <span className="font-semibold text-blue-600">TypeScript:</span> For robust and maintainable code.
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Freehand Drawing</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Draw smooth, freehand lines with adjustable colors. Experience seamless drawing with our optimized canvas rendering.
              </p>
              <div className="mt-4">
                {/* Replace with an actual animation or gif */}
                <div className="bg-gray-200 h-32 rounded-md animate-pulse"></div>
              </div>
            </div>

            <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Geometric Shapes</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Create perfect rectangles and circles with ease. Select your shape from a user-friendly dropdown menu.
              </p>
              <div className="mt-4">
                {/* Replace with an actual animation or gif */}
                <div className="bg-gray-200 h-32 rounded-md animate-pulse"></div>
              </div>
            </div>

            <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Image Manipulation</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Upload, drag, resize, zoom, and crop images directly on the canvas. Enjoy full control over your visual content.
              </p>
              <div className="mt-4">
                {/* Replace with an actual animation or gif */}
                <div className="bg-gray-200 h-32 rounded-md animate-pulse"></div>
              </div>
            </div>

            <div className="p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4 text-blue-700">Export & More</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Export your creations as PNG images with a single click. Plus, enjoy features like responsive canvas and a user-friendly shape selection dropdown.
              </p>
              <div className="mt-4">
                {/* Replace with an actual animation or gif */}
                <div className="bg-gray-200 h-32 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Usage Guide
          </h2>
          <ol className="list-decimal list-inside text-lg text-gray-700 space-y-4">
            <li><strong>Freehand Drawing:</strong> Select the "Pen" tool, choose your color, and start drawing.</li>
            <li><strong>Shape Drawing:</strong> Click "Shapes," select your shape, and draw on the canvas.</li>
            <li><strong>Image Upload:</strong> Use the "Upload Image" button to add images.</li>
            <li><strong>Image Manipulation:</strong> Drag, resize, zoom, and crop images as needed.</li>
            <li><strong>Clear Canvas:</strong> Click "Clear" to reset the canvas.</li>
            <li><strong>Export:</strong> Download your work as a PNG image.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-3xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Future Enhancements
          </h2>
          <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
            <li>Add more drawing tools (lines, arrows, text).</li>
            <li>Implement undo/redo functionality.</li>
            <li>Enable saving and loading drawings.</li>
            <li>Enhance performance for larger canvases.</li>
            <li>Expand shape options in the dropdown.</li>
            <li>Introduce line width and shape fill options.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default WhiteboardDocumentation;