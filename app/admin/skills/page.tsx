"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, Save } from "lucide-react";

interface SkillGroup { id: string; category: string; items: string[]; }

export default function SkillsPage() {
  const [groups, setGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCat, setNewCat] = useState("");
  const [newItems, setNewItems] = useState("");
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const snap = await getDocs(collection(db, "skills"));
    setGroups(snap.docs.map(d => ({ id: d.id, ...d.data() } as SkillGroup)));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!newCat) return;
    setSaving(true);
    await addDoc(collection(db, "skills"), {
      category: newCat,
      items: newItems.split(",").map(s => s.trim()).filter(Boolean),
      createdAt: serverTimestamp(),
    });
    setNewCat(""); setNewItems("");
    await load();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ce groupe ?")) return;
    await deleteDoc(doc(db, "skills", id));
    setGroups(prev => prev.filter(g => g.id !== id));
  };

  const updateItems = async (id: string, val: string) => {
    await setDoc(doc(db, "skills", id), { items: val.split(",").map(s => s.trim()).filter(Boolean) }, { merge: true });
  };

  return (
    <AdminShell title="Skills">
      {loading ? <div className="flex justify-center py-20"><span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div> : (
        <div className="space-y-6 max-w-2xl">
          <div className="p-4 rounded-xl border border-border/50 bg-surface space-y-3">
            <p className="text-sm font-semibold">Nouveau groupe</p>
            <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="Catégorie (ex: Frontend)" className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors" />
            <input value={newItems} onChange={e => setNewItems(e.target.value)} placeholder="Skills séparés par virgule" className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors" />
            <button onClick={add} disabled={saving || !newCat} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-bg text-xs font-semibold hover:bg-accent/90 disabled:opacity-50 transition-colors">
              <Plus size={13} /> Ajouter groupe
            </button>
          </div>
          {groups.map(g => (
            <div key={g.id} className="p-4 rounded-xl border border-border/50 bg-surface space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm text-accent">{g.category}</p>
                <button onClick={() => remove(g.id)} className="p-1 text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
              </div>
              <input
                defaultValue={g.items.join(", ")}
                onBlur={e => updateItems(g.id, e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors font-mono"
              />
              <p className="text-xs text-muted">Modifiez et cliquez ailleurs pour sauvegarder.</p>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
