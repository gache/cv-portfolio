"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LogOut, Briefcase, Code2, FolderOpen, Award, MessageSquare, Database } from "lucide-react";

const sections = [
  { href: "/admin/experiences",    icon: Briefcase,      label: "Expériences",    desc: "Gérer les postes et missions" },
  { href: "/admin/projects",       icon: FolderOpen,     label: "Projets",        desc: "Gérer les projets portfolio" },
  { href: "/admin/skills",         icon: Code2,          label: "Skills",         desc: "Gérer les compétences" },
  { href: "/admin/certifications", icon: Award,          label: "Certifications", desc: "Gérer les certifications" },
  { href: "/admin/testimonials",   icon: MessageSquare,  label: "Témoignages",    desc: "Modérer les témoignages" },
  { href: "/admin/seed",           icon: Database,       label: "Seed Firestore", desc: "Importer cv.ts → Firestore" },
];

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.replace("/admin/login");
  };

  return (
    <div className="min-h-dvh bg-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-surface">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent/10 border border-accent/40 flex items-center justify-center">
              <span className="font-mono font-bold text-xs text-accent">EF</span>
            </div>
            <span className="font-mono text-sm font-semibold text-accent">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted hidden sm:block">{user?.email}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-muted hover:text-red-400 transition-colors"
            >
              <LogOut size={13} />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-sm text-muted mb-8">Gérez le contenu de votre portfolio.</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(({ href, icon: Icon, label, desc }) => (
            <button
              key={href}
              onClick={() => router.push(href)}
              className="text-left p-5 rounded-xl border border-border/50 bg-surface hover:border-accent/40 hover:shadow-[0_0_20px_rgba(129,140,248,0.08)] transition-all duration-200 group"
            >
              <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center mb-3 group-hover:bg-accent/15 transition-colors">
                <Icon size={16} className="text-accent" />
              </div>
              <p className="font-semibold text-sm mb-0.5">{label}</p>
              <p className="text-xs text-muted">{desc}</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
