"use client";

import LoginForm from "@/components/auth/LoginForm";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const LoginPage = () => {
  const isAuthenticated = useAuthRedirect(true);

  if (isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
