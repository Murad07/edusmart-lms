"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";
import { useParams } from "next/navigation";

const ResetPasswordPage = () => {
  const params = useParams();
  const token = params.token as string;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
