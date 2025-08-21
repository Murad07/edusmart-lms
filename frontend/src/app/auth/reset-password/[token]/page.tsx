"use client";

import ResetPasswordForm from "@/components/auth/ResetPasswordForm";

interface ResetPasswordPageProps {
  params: { token: string };
}

const ResetPasswordPage = ({ params }: ResetPasswordPageProps) => {
  const { token } = params;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ResetPasswordForm token={token} />
    </div>
  );
};

export default ResetPasswordPage;
