"use client";

import useAuthRedirect from "@/hooks/useAuthRedirect";
import ProfileForm from "@/components/profile/ProfileForm";

const ProfilePage = () => {
  const isAuthenticated = useAuthRedirect();

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold mb-8">User Profile</h1>
      <ProfileForm />
    </div>
  );
};

export default ProfilePage;
