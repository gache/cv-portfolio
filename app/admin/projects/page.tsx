"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

interface Project { id: string; title: string; category: string; featured: boolean; }

export default function ProjectsPage() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("order", "asc"));
    getDocs(q).then(snap => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce projet ?")) return;
    await deleteDoc(doc(db, "projects", id));
    setItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <AdminShell title="Projets" action={
      <button onClick={() => router.push("/admin/projects/new")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-bg text-xs font-semibold hover:bg-accent/90 transition-colors">
        <Plus size={13} /> Ajouter
      </button>
    }>
      {loading ? <div className="flex justify-center py-20"><span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div>
        : items.length === 0 ? <div className="text-center py-20 text-muted text-sm">Aucun projet. <button onClick={() => router.push("/admin/projects/new")} className="text-accent underline">Ajouter</button></div>
        : <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-surface hover:border-accent/30 transition-colors">
              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-muted">{item.category}{item.featured ? " · ⭐ Featured" : ""}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => router.push(`/admin/projects/${item.id}`)} className="p-1.5 rounded-lg hover:bg-elevated text-muted hover:text-accent transition-colors"><Pencil size={14} /></button>
                <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg hover:bg-elevated text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>}
    </AdminShell>
  );
}
