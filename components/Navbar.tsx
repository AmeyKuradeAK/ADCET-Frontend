"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  // ✅ Check login status from localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // ✅ Track mouse movement for animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  // ✅ Hide Navbar on login page
  if (pathname === "/login") return null;

  return (
    <nav
      className="relative bg-gray-900 text-white px-6 py-4 flex items-center justify-between overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(0, 100, 255, 0.3), rgba(0, 0, 0, 0.8))`,
        transition: "background 0.05s ease",
      }}
    >
      {/* Moving Glow Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-transform duration-200"
        style={{
          transform: `translate(${mouseX / 30}px, ${mouseY / 30}px)`,
          background: "linear-gradient(135deg, rgba(0, 100, 255, 0.2), rgba(255, 0, 150, 0.2))",
          opacity: 0.5,
          filter: "blur(80px)",
        }}
      ></div>

      {/* Left: Company Name */}
      <div className="text-lg font-semibold relative z-10">
        <Link href="/">SmartCanvas</Link>
      </div>

      {/* Center: Navigation Links */}
      <div className="space-x-6 relative z-10">
        <Link href="/" className="hover:text-blue-400 transition-colors">
          Dashboard
        </Link>
        <Link href="/docs" className="hover:text-blue-400 transition-colors">
          Docs
        </Link>
      </div>

      {/* Right: Authentication */}
      <div className="relative z-10">
        {isLoggedIn ? (
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            {/* ✅ Profile Circle */}
            <button className="w-10 h-10 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center">
              <span className="text-white text-lg">👤</span>
            </button>

            {/* ✅ Dropdown Menu */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-gray-800 rounded-md shadow-lg">
                <Link href="/profile" className="block px-4 py-2 hover:bg-gray-700">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/login"
            className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            Sign In / Sign Up
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
