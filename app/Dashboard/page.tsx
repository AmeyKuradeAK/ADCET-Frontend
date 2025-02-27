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
}

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // ✅ Static project data
  const [projects, setProjects] = useState<Project[]>([
    {
      _id: "1",
      name: "AI Image Classifier",
      description: "Classifies images using a pre-trained deep learning model.",
      endpoint: "http://127.0.0.1:8000/predict",
      image: "https://source.unsplash.com/400x300/?technology,ai",
      lastUpdated: "2025-02-25",
    },
    {
      _id: "2",
      name: "WiFi Intrusion Detector",
      description: "Monitors network traffic for suspicious activity.",
      endpoint: "http://127.0.0.1:8001/scan",
      image: "https://source.unsplash.com/400x300/?cybersecurity,hacker",
      lastUpdated: "2025-02-26",
    },
    {
      _id: "3",
      name: "Medical Reminder App",
      description: "A smart reminder system for medication schedules.",
      endpoint: "http://127.0.0.1:8002/remind",
      image: "https://source.unsplash.com/400x300/?medicine,reminder",
      lastUpdated: "2025-02-27",
    },
  ]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div
        className="min-h-screen bg-black p-6 text-white relative overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0, 100, 255, 0.4), rgba(0, 0, 0, 0.9))`,
          transition: "background 0.05s ease",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
            opacity: 0.08,
          }}
        ></div>

        <div className="flex justify-between items-center mb-6 relative z-10">
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          />
          <button
            onClick={() => router.push("/add-api")}
            className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-lg"
          >
            + Add API
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {filteredProjects.map((project) => (
            <div
              key={project._id}
              onMouseMove={(e) => {
                setHoverX(e.clientX);
                setHoverY(e.clientY);
                setHoveredCard(project._id);
              }}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => router.push(`/whiteboard?endpoint=${encodeURIComponent(project.endpoint)}`)}
              className="relative bg-gray-800 p-4 rounded-xl shadow-xl cursor-pointer overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl group"
            >
              {hoveredCard === project._id && (
                <div
                  className="absolute inset-0 rounded-xl transition-transform duration-200"
                  style={{
                    background: `radial-gradient(circle at ${hoverX}px ${hoverY}px, rgba(0, 100, 255, 0.4), rgba(0, 0, 0, 0.8))`,
                    opacity: 0.6,
                    filter: "blur(50px)",
                    transition: "opacity 0.3s ease",
                  }}
                ></div>
              )}

              <div className="relative">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-40 object-cover rounded-lg transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity rounded-lg"></div>
              </div>

              <div className="p-4 relative z-10">
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="text-gray-400">{project.description}</p>
                <p className="text-sm text-gray-500 mt-2">
                  Last Updated: <span className="text-blue-400">{project.lastUpdated}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
