"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc, setDoc, serverTimestamp, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, Save } from "lucide-react";

interface Cert { id: string; name: string; issuer: string; year: string; url?: string; }
const EMPTY = { name: "", issuer: "", year: "", url: "" };

export default function CertificationsPage() {
  const [items, setItems] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const load = async () => {
    const snap = await getDocs(query(collection(db, "certifications"), orderBy("year", "desc")));
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Cert)));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    if (!form.name || !form.issuer) return;
    setSaving(true);
    const data = { ...form, updatedAt: serverTimestamp() };
    if (editId) await setDoc(doc(db, "certifications", editId), data, { merge: true });
    else await addDoc(collection(db, "certifications"), { ...data, createdAt: serverTimestamp() });
    setForm(EMPTY); setEditId(null);
    await load();
    setSaving(false);
  };

  const edit = (c: Cert) => { setForm({ name: c.name, issuer: c.issuer, year: c.year, url: c.url || "" }); setEditId(c.id); };
  const remove = async (id: string) => { if (!confirm("Supprimer ?")) return; await deleteDoc(doc(db, "certifications", id)); setItems(prev => prev.filter(i => i.id !== id)); };
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  return (
    <AdminShell title="Certifications">
      {loading ? <div className="flex justify-center py-20"><span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div> : (
        <div className="space-y-6 max-w-2xl">
          <div className="p-4 rounded-xl border border-border/50 bg-surface space-y-3">
            <p className="text-sm font-semibold">{editId ? "Modifier" : "Nouvelle certification"}</p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[["Nom *", "name", "Claude 101"], ["Émetteur *", "issuer", "Anthropic"], ["Année", "year", "2026"], ["URL (optionnel)", "url", "https://..."]].map(([label, key, ph]) => (
                <div key={key}>
                  <label className="block text-xs font-mono text-muted mb-1">{label}</label>
                  <input value={form[key as keyof typeof EMPTY]} onChange={e => set(key, e.target.value)} placeholder={ph} className="w-full px-3 py-2.5 rounded-lg bg-elevated border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={save} disabled={saving || !form.name} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-bg text-xs font-semibold hover:bg-accent/90 disabled:opacity-50 transition-colors">
                <Save size={13} /> {saving ? "..." : editId ? "Modifier" : "Ajouter"}
              </button>
              {editId && <button onClick={() => { setForm(EMPTY); setEditId(null); }} className="px-3 py-1.5 rounded-lg border border-border/50 text-xs hover:border-accent/40 transition-colors">Annuler</button>}
            </div>
          </div>
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-surface hover:border-accent/30 transition-colors">
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-muted">{item.issuer} · {item.year}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => edit(item)} className="p-1.5 rounded-lg hover:bg-elevated text-muted hover:text-accent transition-colors"><Save size={14} /></button>
                  <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg hover:bg-elevated text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </AdminShell>
  );
}
