"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setIsAdmin(userEmail === "admin@admin.com");
    setIsLoggedIn(!!localStorage.getItem("isLoggedIn"));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/auth");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 shadow-lg">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Left: Logo or Hamburger */}
        <div className="flex items-center gap-4">
          {/* Desktop Menu */}
          <ul className="hidden sm:flex gap-4 md:gap-6 lg:gap-8">
            {isAdmin && (
              <li>
                <Link
                  href="/dashboard"
                  className="text-white text-sm md:text-base font-semibold hover:text-gray-200 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isAdmin && (
              <li>
                <Link
                  href="/users"
                  className="text-white text-sm md:text-base font-semibold hover:text-gray-200 transition-colors"
                >
                  Users
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  href="/posts"
                  className="text-white text-sm md:text-base font-semibold hover:text-gray-200 transition-colors"
                >
                  Posts
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Hamburger */}
          <div className="sm:hidden relative">
            <button
              onClick={toggleMenu}
              className="flex flex-col justify-center items-center w-8 h-8 space-y-1"
              aria-label="Toggle menu"
            >
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white"></span>
              <span className="w-6 h-0.5 bg-white"></span>
            </button>

            {isMenuOpen && (
              <div className="absolute top-10 left-0 w-40 bg-white rounded-md shadow-lg p-4 z-40">
                <ul className="flex flex-col gap-3">
                  {isAdmin && (
                    <li>
                      <Link
                        href="/dashboard"
                        className="text-indigo-600 font-semibold hover:text-indigo-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </li>
                  )}
                  {isAdmin && (
                    <li>
                      <Link
                        href="/users"
                        className="text-indigo-600 font-semibold hover:text-indigo-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Users
                      </Link>
                    </li>
                  )}
                  {isLoggedIn && (
                    <li>
                      <Link
                        href="/posts"
                        className="text-indigo-600 font-semibold hover:text-indigo-800"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Posts
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right: Logout button (always visible) */}
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-white text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded transition-colors"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
