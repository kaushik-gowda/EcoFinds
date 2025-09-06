
"use client";

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileForm from "@/components/profile/profile-form";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return null; // Or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mx-auto max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight mb-8 text-center font-headline">User Dashboard</h1>
        <ProfileForm />
      </div>
    </div>
  );
}
