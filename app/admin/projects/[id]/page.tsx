"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminShell from "@/components/admin/AdminShell";
import { Save } from "lucide-react";

const EMPTY = { title: "", category: "", description: "", tech: "", github: "", demo: "", featured: false, order: 0 };

export default function ProjectEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isNew) return;
    getDoc(doc(db, "projects", id)).then(snap => {
      if (snap.exists()) setForm({ ...EMPTY, ...snap.data(), tech: (snap.data().tech || []).join(", ") } as typeof EMPTY);
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (k: string, v: string | boolean | number) => setForm(f => ({ ...f, [k]: v }));

  const save = async () => {
    if (!form.title) { setError("Titre requis."); return; }
    setSaving(true);
    try {
      const data = { ...form, tech: form.tech.split(",").map(s => s.trim()).filter(Boolean), updatedAt: serverTimestamp() };
      if (isNew) await addDoc(collection(db, "projects"), { ...data, createdAt: serverTimestamp() });
      else await setDoc(doc(db, "projects", id), data, { merge: true });
      router.push("/admin/projects");
    } catch { setError("Erreur lors de la sauvegarde."); }
    finally { setSaving(false); }
  };

  if (loading) return <AdminShell title="Projet"><div className="flex justify-center py-20"><span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div></AdminShell>;

  return (
    <AdminShell title={isNew ? "Nouveau projet" : "Modifier projet"} action={
      <button onClick={save} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-bg text-xs font-semibold hover:bg-accent/90 disabled:opacity-50 transition-colors">
        <Save size={13} /> {saving ? "..." : "Sauvegarder"}
      </button>
    }>
      <div className="space-y-4 max-w-2xl">
        {error && <p className="text-xs text-red-400">{error}</p>}
        <div className="grid sm:grid-cols-2 gap-4">
          {[["Titre *", "title", "Portfolio CV"], ["Catégorie", "category", "Web"], ["GitHub URL", "github", "https://github.com/..."], ["Demo URL", "demo", "https://..."], ["Ordre", "order", "0"]].map(([label, key, ph]) => (
            <div key={key}>
              <label className="block text-xs font-mono text-muted mb-1.5">{label}</label>
              <input value={form[key as keyof typeof EMPTY] as string} onChange={e => set(key, key === "order" ? Number(e.target.value) : e.target.value)} placeholder={ph} type={key === "order" ? "number" : "text"} className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors" />
            </div>
          ))}
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Description</label>
          <textarea value={form.description} onChange={e => set("description", e.target.value)} rows={3} className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors resize-none" />
        </div>
        <div>
          <label className="block text-xs font-mono text-muted mb-1.5">Technologies (séparées par virgule)</label>
          <input value={form.tech} onChange={e => set("tech", e.target.value)} placeholder="Next.js, TypeScript, Firebase" className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors" />
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.featured} onChange={e => set("featured", e.target.checked)} className="accent-accent" />
          Projet mis en avant
        </label>
      </div>
    </AdminShell>
  );
}
