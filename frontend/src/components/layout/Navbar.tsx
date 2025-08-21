"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          EduSmart LMS
        </Link>
        <div>
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              {user && user.role === "admin" && (
                <Link href="/admin" className="hover:text-gray-300">
                  Admin Panel
                </Link>
              )}
              <button onClick={handleLogout} className="hover:text-gray-300">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <Link href="/auth/login" className="hover:text-gray-300">
                Login
              </Link>
              <Link href="/auth/register" className="hover:text-gray-300">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
