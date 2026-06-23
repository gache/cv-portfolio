"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminShell from "@/components/admin/AdminShell";
import { Plus, Trash2, Pencil, AlertTriangle, ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Toast, useToast } from "@/components/admin/Toast";

interface Experience {
  id: string;
  role: string;
  employer: string;
  company: string;
  period: string;
  type: string;
  order?: number;
}

function DeleteModal({ item, onConfirm, onCancel, deleting }: {
  item: Experience; onConfirm: () => void; onCancel: () => void; deleting: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-surface border border-border/60 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.6)]">
        <div className="flex items-start gap-4 mb-5">
          <div className="w-10 h-10 rounded-xl bg-red-400/10 border border-red-400/30 flex items-center justify-center flex-shrink-0">
            <AlertTriangle size={16} className="text-red-400" />
          </div>
          <div>
            <p className="font-semibold text-sm mb-1">Supprimer cette mission ?</p>
            <p className="text-xs text-muted leading-relaxed">
              <span className="text-text-secondary font-medium">{item.role}</span><br />
              {item.employer} · {item.company}
            </p>
          </div>
        </div>
        <p className="text-xs text-muted/70 mb-5 pl-14">Cette action est irréversible.</p>
        <div className="flex items-center gap-2 justify-end">
          <button onClick={onCancel} className="px-4 py-2 rounded-lg border border-border/50 text-xs font-medium text-muted hover:text-text-secondary transition-colors">Annuler</button>
          <button onClick={onConfirm} disabled={deleting} className="px-4 py-2 rounded-lg bg-red-400 text-white text-xs font-semibold hover:bg-red-500 disabled:opacity-50 transition-colors">
            {deleting ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ExperiencesPage() {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmItem, setConfirmItem] = useState<Experience | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const { toast, show: showToast, hide: hideToast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const s = searchParams.get("success");
    if (s === "created") showToast("Expérience créée avec succès.", "success");
    else if (s === "updated") showToast("Expérience mise à jour avec succès.", "info");
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const load = async () => {
    const q = query(collection(db, "experiences"), orderBy("order", "asc"));
    const snap = await getDocs(q);
    setItems(snap.docs.map(d => ({ id: d.id, ...d.data() } as Experience)));
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const remove = async () => {
    if (!confirmItem) return;
    setDeleting(true);
    await deleteDoc(doc(db, "experiences", confirmItem.id));
    await fetch("/api/revalidate", { method: "POST" });
    setItems(prev => prev.filter(i => i.id !== confirmItem.id));
    setConfirmItem(null);
    setDeleting(false);
    showToast("Expérience supprimée.", "warning");
  };

  // Group by employer preserving order
  const groups = items.reduce<Record<string, Experience[]>>((acc, item) => {
    const k = item.employer || "Sans employeur";
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      {confirmItem && <DeleteModal item={confirmItem} onConfirm={remove} onCancel={() => setConfirmItem(null)} deleting={deleting} />}
      <AdminShell
        title="Expériences"
        action={
          <button onClick={() => router.push("/admin/experiences/new")} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-bg text-xs font-semibold hover:bg-accent/90 transition-colors">
            <Plus size={13} /> Ajouter
          </button>
        }
      >
        {loading ? (
          <div className="flex justify-center py-20"><span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div>
        ) : items.length === 0 ? (
          <div className="text-center py-20 text-muted text-sm">
            Aucune expérience.{" "}
            <button onClick={() => router.push("/admin/experiences/new")} className="text-accent underline">Ajouter la première</button>
          </div>
        ) : (
          <div className="space-y-3">
            {Object.entries(groups).map(([employer, exps]) => {
              const isOpen = !collapsed[employer];
              const periods = exps.map(e => e.period).filter(Boolean);
              const years = periods.join(" ").match(/\d{4}/g)?.map(Number) ?? [];
              const hasPresent = periods.some(p => /présent|present/i.test(p));
              const range = years.length
                ? `${Math.min(...years)} — ${hasPresent ? "Présent" : Math.max(...years)}`
                : "";

              return (
                <div key={employer} className="rounded-xl border border-border/50 bg-surface overflow-hidden">
                  {/* Employer header */}
                  <button
                    onClick={() => setCollapsed(c => ({ ...c, [employer]: !c[employer] }))}
                    className="w-full flex items-center justify-between px-4 py-3 hover:bg-elevated/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm">{employer}</span>
                      {hasPresent && (
                        <span className="flex items-center gap-1 text-xs text-pass font-mono">
                          <span className="w-1.5 h-1.5 rounded-full bg-pass animate-pulse" />
                          Actuel
                        </span>
                      )}
                      {range && <span className="text-xs font-mono text-muted hidden sm:inline">{range}</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono bg-elevated/80 border border-border/40 px-1.5 py-0.5 rounded text-muted">{exps.length}</span>
                      <ChevronDown size={13} className={`text-muted transition-transform duration-200 ${isOpen ? "" : "-rotate-90"}`} />
                    </div>
                  </button>

                  {/* Missions */}
                  {isOpen && (
                    <div className="border-t border-border/30 divide-y divide-border/20">
                      {exps.map(item => (
                        <div key={item.id} className="flex items-center justify-between px-4 py-3 hover:bg-elevated/20 transition-colors">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium truncate">{item.role}</p>
                            <p className="text-xs text-muted truncate">{item.company} · {item.period}</p>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                            <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 hidden sm:inline">{item.type}</span>
                            <button onClick={() => router.push(`/admin/experiences/${item.id}`)} className="p-1.5 rounded-lg hover:bg-elevated transition-colors text-muted hover:text-accent" aria-label="Modifier">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => setConfirmItem(item)} className="p-1.5 rounded-lg hover:bg-elevated transition-colors text-muted hover:text-red-400" aria-label="Supprimer">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </AdminShell>
    </>
  );
}
