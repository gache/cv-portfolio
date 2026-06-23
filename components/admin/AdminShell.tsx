"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function AdminShell({ title, children, action }: Props) {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-dvh bg-bg">
      <header className="border-b border-border/50 bg-surface sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin")}
              className="flex items-center gap-1 text-muted hover:text-text-primary transition-colors text-sm"
            >
              <ChevronLeft size={16} />
              Dashboard
            </button>
            <span className="w-px h-4 bg-border/60" />
            <span className="font-semibold text-sm">{title}</span>
          </div>
          <div className="flex items-center gap-3">
            {action}
            <span className="text-xs text-muted hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-red-400 transition-colors"
            >
              <LogOut size={13} />
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-6 py-8">{children}</main>
    </div>
  );
}
