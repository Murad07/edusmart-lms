"use client";

import RegisterForm from "@/components/auth/RegisterForm";
import useAuthRedirect from "@/hooks/useAuthRedirect";

const RegisterPage = () => {
  const isAuthenticated = useAuthRedirect(true);

  if (isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
