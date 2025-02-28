"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface Project {
  _id: string;
  name: string;
  description: string;
  endpoint: string;
  image: string;
  lastUpdated: string;
  createdAt: string; // Add this field for static creation date
}

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [projects, setProjects] = useState<Project[]>([
    {
      _id: "1",
      name: "Sample Project",
      description: "This is a sample project description.",
      endpoint: "http://example.com/predict",
      image: "https://cdn-thumbnails.huggingface.co/social-thumbnails/spaces/hardikp18/AI_Image_Classifier.png",
      lastUpdated: "2025-02-25",
      createdAt: "2023-08-15", // Static creation date
    },
  ]);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Check token in localStorage to determine if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // Redirect to login page if not authenticated
    }
  }, [router]);

  // Track mouse movement for animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle project filtering based on search input
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-black p-6 text-white relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0, 150, 255, 0.2), rgba(0, 0, 0, 0.8))`,
          transition: "background 0.05s ease",
        }}
        onMouseMove={(e) => {
          setMouseX(e.clientX);
          setMouseY(e.clientY);
        }}
      >
        {/* Moving Glow Effect */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-200"
          style={{
            transform: `translate(${mouseX / 30}px, ${mouseY / 30}px)`,
            background: "linear-gradient(135deg, rgba(0, 150, 255, 0.1), rgba(255, 0, 150, 0.1))",
            opacity: 0.3,
            filter: "blur(60px)",
          }}
        ></div>

        {/* Search and Add API button */}
        <div className="flex justify-between items-center mb-6 z-10 relative">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 w-1/3"
          />
          <button
            onClick={() => router.push("/add-api")}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg"
          >
            + Add API
          </button>
        </div>

        {/* Project Card Section */}
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project._id}
                onClick={() => router.push(`/whiteboard?endpoint=${encodeURIComponent(project.endpoint)}`)}
                className="relative bg-gray-800 p-4 rounded-xl shadow-xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-gray-700"
              >
                <div className="relative">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                  <p className="text-gray-400">{project.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created on: <span className="text-blue-400">{project.createdAt}</span>
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Last Updated: <span className="text-blue-400">{project.lastUpdated}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
