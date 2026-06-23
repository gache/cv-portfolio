"use client";

import { useState } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { experiences, projects, skills, certifications } from "@/data/cv";
import AdminShell from "@/components/admin/AdminShell";
import { Database, Trash2, CheckCircle2, AlertCircle } from "lucide-react";

type Status = "idle" | "running" | "done" | "error";

interface Log { msg: string; ok: boolean; }

async function clearCollection(name: string) {
  const snap = await getDocs(collection(db, name));
  await Promise.all(snap.docs.map(d => deleteDoc(doc(db, name, d.id))));
}

export default function SeedPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [logs, setLogs] = useState<Log[]>([]);

  const log = (msg: string, ok = true) => setLogs(prev => [...prev, { msg, ok }]);

  const seed = async () => {
    if (!confirm("Cela va effacer et réécrire toutes les données. Continuer ?")) return;
    setStatus("running");
    setLogs([]);

    try {
      // --- Experiences ---
      log("🗑 Nettoyage experiences...");
      await clearCollection("experiences");
      for (const [i, exp] of experiences.entries()) {
        await addDoc(collection(db, "experiences"), {
          employer: exp.employer,
          role: exp.role,
          company: exp.company,
          period: exp.period,
          type: exp.type,
          description: exp.description,
          responsibilities: exp.responsibilities,
          tech: exp.tech,
          order: i,
          defaultOpen: exp.employer === "IBM" && i === 0,
          prominent: exp.employer === "IBM" && i === 0,
          createdAt: serverTimestamp(),
        });
      }
      log(`✅ ${experiences.length} expériences importées`);

      // --- Projects ---
      log("🗑 Nettoyage projects...");
      await clearCollection("projects");
      for (const [i, p] of projects.entries()) {
        await addDoc(collection(db, "projects"), {
          title: p.title,
          description: p.description,
          tech: p.tech,
          github: p.github || "#",
          demo: p.demo || "#",
          featured: p.featured ?? false,
          order: i,
          createdAt: serverTimestamp(),
        });
      }
      log(`✅ ${projects.length} projets importés`);

      // --- Skills ---
      log("🗑 Nettoyage skills...");
      await clearCollection("skills");
      const skillEntries = Object.entries(skills);
      for (const [i, [category, items]] of skillEntries.entries()) {
        await addDoc(collection(db, "skills"), {
          category,
          items: items.map(s => s.name),
          levels: Object.fromEntries(items.map(s => [s.name, s.level])),
          order: i,
          createdAt: serverTimestamp(),
        });
      }
      log(`✅ ${skillEntries.length} groupes de skills importés`);

      // --- Certifications ---
      log("🗑 Nettoyage certifications...");
      await clearCollection("certifications");
      for (const cert of certifications) {
        await addDoc(collection(db, "certifications"), {
          ...cert,
          createdAt: serverTimestamp(),
        });
      }
      log(`✅ ${certifications.length} certifications importées`);

      log("🎉 Seed terminé avec succès !");
      setStatus("done");
    } catch (e) {
      log(`❌ Erreur: ${e instanceof Error ? e.message : "inconnue"}`, false);
      setStatus("error");
    }
  };

  return (
    <AdminShell title="Seed Firestore">
      <div className="max-w-xl space-y-6">
        <div className="p-4 rounded-xl border border-yellow-400/30 bg-yellow-400/5 text-sm text-yellow-400">
          <p className="font-semibold mb-1">⚠️ Attention</p>
          <p className="text-yellow-400/80 text-xs">Cette opération efface et réécrit <strong>toutes</strong> les données Firestore depuis <code>data/cv.ts</code>. À utiliser une seule fois pour l'initialisation.</p>
        </div>

        <button
          onClick={seed}
          disabled={status === "running"}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-bg font-semibold text-sm hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Database size={16} />
          {status === "running" ? "Import en cours..." : "Lancer le Seed"}
        </button>

        {logs.length > 0 && (
          <div className="rounded-xl border border-border/50 bg-surface p-4 space-y-1.5 font-mono text-xs">
            {logs.map((l, i) => (
              <div key={i} className={`flex items-start gap-2 ${l.ok ? "text-text-secondary" : "text-red-400"}`}>
                {l.ok
                  ? <CheckCircle2 size={12} className="text-pass mt-0.5 flex-shrink-0" />
                  : <AlertCircle size={12} className="text-red-400 mt-0.5 flex-shrink-0" />}
                {l.msg}
              </div>
            ))}
            {status === "running" && (
              <div className="flex items-center gap-2 text-muted">
                <span className="w-3 h-3 border border-accent/30 border-t-accent rounded-full animate-spin" />
                En cours...
              </div>
            )}
          </div>
        )}

        {status === "done" && (
          <p className="text-pass text-sm font-semibold">✅ Toutes les données sont dans Firestore. Vous pouvez maintenant gérer votre portfolio depuis l'admin.</p>
        )}
      </div>
    </AdminShell>
  );
}
