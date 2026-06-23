"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminShell from "@/components/admin/AdminShell";
import { Check, X, Trash2 } from "lucide-react";

interface Testimonial { id: string; name: string; role: string; company: string; text: string; status: "pending" | "approved" | "rejected"; }

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  useEffect(() => {
    getDocs(query(collection(db, "testimonials"), orderBy("createdAt", "desc")))
      .then(snap => { setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial))); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const setStatus = async (id: string, status: "approved" | "rejected") => {
    await updateDoc(doc(db, "testimonials", id), { status });
    setItems(prev => prev.map(i => i.id === id ? { ...i, status } : i));
  };

  const remove = async (id: string) => {
    if (!confirm("Supprimer ?")) return;
    await deleteDoc(doc(db, "testimonials", id));
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const filtered = filter === "all" ? items : items.filter(i => i.status === filter);
  const counts = { all: items.length, pending: items.filter(i => i.status === "pending").length, approved: items.filter(i => i.status === "approved").length, rejected: items.filter(i => i.status === "rejected").length };

  const statusStyle: Record<string, string> = {
    pending: "bg-yellow-400/10 text-yellow-400 border-yellow-400/20",
    approved: "bg-pass/10 text-pass border-pass/20",
    rejected: "bg-red-400/10 text-red-400 border-red-400/20",
  };

  return (
    <AdminShell title="Témoignages">
      {loading ? <div className="flex justify-center py-20"><span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div> : (
        <div className="space-y-4">
          <div className="flex gap-2">
            {(["all", "pending", "approved", "rejected"] as const).map(f => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-colors ${filter === f ? "bg-accent text-bg" : "border border-border/50 text-muted hover:border-accent/40"}`}>
                {f} ({counts[f]})
              </button>
            ))}
          </div>
          {filtered.length === 0 ? <p className="text-center py-16 text-muted text-sm">Aucun témoignage.</p> : (
            <div className="space-y-3">
              {filtered.map(item => (
                <div key={item.id} className="p-4 rounded-xl border border-border/50 bg-surface space-y-2">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-sm">{item.name}</p>
                        <span className={`text-xs font-mono px-2 py-0.5 rounded-full border ${statusStyle[item.status]}`}>{item.status}</span>
                      </div>
                      <p className="text-xs text-muted">{item.role} · {item.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {item.status !== "approved" && <button onClick={() => setStatus(item.id, "approved")} className="p-1.5 rounded-lg hover:bg-pass/10 text-muted hover:text-pass transition-colors" title="Approuver"><Check size={14} /></button>}
                      {item.status !== "rejected" && <button onClick={() => setStatus(item.id, "rejected")} className="p-1.5 rounded-lg hover:bg-red-400/10 text-muted hover:text-red-400 transition-colors" title="Rejeter"><X size={14} /></button>}
                      <button onClick={() => remove(item.id)} className="p-1.5 rounded-lg hover:bg-elevated text-muted hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed border-l-2 border-accent/30 pl-3">"{item.text}"</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </AdminShell>
  );
}
