"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const useAuthRedirect = (redirectIfAuthenticated = false) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (redirectIfAuthenticated) {
      if (isAuthenticated) {
        router.push("/"); // Redirect authenticated users away from auth pages
      }
    } else {
      if (!isAuthenticated) {
        router.push("/auth/login"); // Redirect unauthenticated users to login
      }
    }
  }, [isAuthenticated, router, redirectIfAuthenticated]);

  return isAuthenticated;
};

export default useAuthRedirect;
