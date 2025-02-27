"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Project {
  id: number;
  name: string;
  description: string;
  endpoint: string;
  image: string;
  lastUpdated: string;
}

// Function to generate a random date (for last updated field)
const getRandomDate = () => {
  const daysAgo = Math.floor(Math.random() * 10) + 1;
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toDateString();
};

export default function Dashboard() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [hoverX, setHoverX] = useState(0);
  const [hoverY, setHoverY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      name: "Project 1",
      description: "Image Classification",
      endpoint: "/whiteboard/1",
      image: "https://res.cloudinary.com/tbmg/q_auto,f_auto/sites/mdb/articles/2023/blog/091923_Full-Spectrum.jpg",
      lastUpdated: "",
    },
    {
      id: 2,
      name: "Project 2",
      description: "AI-powered Image Analysis",
      endpoint: "/whiteboard/2",
      image: "https://middlemarketgrowth.org/wp-content/uploads/2023/07/MMG2023_HeroImage_Feature2_1280x720px.jpg",
      lastUpdated: "",
    },
  ]);

  // Populate lastUpdated dates on the client side
  useEffect(() => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => ({
        ...project,
        lastUpdated: getRandomDate(),
      }))
    );
  }, []);

  // Track mouse movement
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

  const handleAddProject = () => {
    const newProject: Project = {
      id: projects.length + 1,
      name: `Project ${projects.length + 1}`,
      description: "Newly added API",
      endpoint: `/whiteboard/${projects.length + 1}`,
      image: "https://via.placeholder.com/150",
      lastUpdated: getRandomDate(),
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div
      className="min-h-screen bg-black p-6 text-white relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0, 100, 255, 0.4), rgba(0, 0, 0, 0.9))`,
        transition: "background 0.05s ease",
      }}
    >
      {/* Moving Background Glow Effect */}
      <div
        className="absolute inset-0 transition-transform duration-200"
        style={{
          transform: `translate(${mouseX / 20}px, ${mouseY / 20}px)`,
          background: "linear-gradient(135deg, rgba(0, 100, 255, 0.1), rgba(255, 0, 150, 0.1))",
          opacity: 0.3,
          filter: "blur(80px)",
        }}
      ></div>

      {/* Grid Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')",
          opacity: 0.08,
        }}
      ></div>

      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-6 relative z-10">
        <input
          type="text"
          placeholder="Search projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-700 bg-gray-800 text-white rounded-lg px-4 py-2 w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />
        <button
          onClick={handleAddProject}
          className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-2 rounded-lg hover:scale-105 transition-transform shadow-lg"
        >
          + Add API
        </button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onMouseMove={(e) => {
              setHoverX(e.clientX);
              setHoverY(e.clientY);
              setHoveredCard(project.id);
            }}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={() => router.push(project.endpoint)}
            className="relative bg-gray-800 p-4 rounded-xl shadow-xl cursor-pointer overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl group"
          >
            {/* Floating Glow Effect - Only visible on hover */}
            {hoveredCard === project.id && (
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

            {/* Image with Overlay */}
            <div className="relative">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-40 object-cover rounded-lg transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black opacity-40 group-hover:opacity-20 transition-opacity rounded-lg"></div>
            </div>

            {/* Project Details */}
            <div className="p-4 relative z-10">
              <h3 className="text-lg font-semibold text-white">{project.name}</h3>
              <p className="text-gray-400">{project.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Last Updated: <span className="text-blue-400">{project.lastUpdated || "Loading..."}</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
