"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

const ALLOWED_EMAILS = ["elgache2014@gmail.com"];

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user && pathname !== "/admin/login") {
      router.replace("/admin/login");
      return;
    }
    if (user && !ALLOWED_EMAILS.includes(user.email ?? "")) {
      logout().then(() => router.replace("/admin/login?error=unauthorized"));
    }
  }, [user, loading, pathname, router, logout]);

  if (loading) {
    return (
      <div className="min-h-dvh bg-bg flex items-center justify-center">
        <span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AuthGuard>{children}</AuthGuard>
    </AuthProvider>
  );
}
