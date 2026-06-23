"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AdminShell from "@/components/admin/AdminShell";
import { Save } from "lucide-react";
import { Toast, useToast } from "@/components/admin/Toast";

const EMPTY = { role: "", employer: "", company: "", periodStart: "", periodEnd: "", ongoing: true, type: "", description: "", responsibilities: "", tech: "", order: -Date.now(), prominent: false, defaultOpen: false };
const REQUIRED = ["role", "employer", "type", "periodStart"] as const;

const MONTHS = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];
const YEARS = Array.from({ length: 20 }, (_, i) => new Date().getFullYear() - i);

function formatMonth(ym: string): string {
  if (!ym) return "";
  const [year, month] = ym.split("-");
  if (!year || !month) return ym;
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

function MonthYearPicker({ value, onChange, onBlur, disabled = false, error = false }: {
  value: string;
  onChange: (val: string) => void;
  onBlur?: () => void;
  disabled?: boolean;
  error?: boolean;
}) {
  const [localMonth, setLocalMonth] = useState(value ? value.split("-")[1] ?? "" : "");
  const [localYear, setLocalYear] = useState(value ? value.split("-")[0] ?? "" : "");

  // Sync if parent resets value
  useEffect(() => {
    setLocalMonth(value ? value.split("-")[1] ?? "" : "");
    setLocalYear(value ? value.split("-")[0] ?? "" : "");
  }, [value]);

  const base = `flex-1 px-2 py-2.5 rounded-lg bg-surface border text-sm focus:outline-none transition-colors appearance-none text-center ${
    disabled ? "opacity-40 cursor-not-allowed border-border/30" : error ? "border-red-400/60 focus:border-red-400" : "border-border/50 focus:border-accent"
  }`;

  const handleMonth = (m: string) => {
    setLocalMonth(m);
    if (m && localYear) onChange(`${localYear}-${m}`);
  };

  const handleYear = (y: string) => {
    setLocalYear(y);
    if (y && localMonth) onChange(`${y}-${localMonth}`);
  };

  return (
    <div className="flex gap-2">
      <select value={localMonth} onChange={e => handleMonth(e.target.value)} onBlur={onBlur} disabled={disabled} className={base}>
        <option value="">Mois</option>
        {MONTHS.map((m, i) => (
          <option key={m} value={String(i + 1).padStart(2, "0")}>{m}</option>
        ))}
      </select>
      <select value={localYear} onChange={e => handleYear(e.target.value)} disabled={disabled} className={base}>
        <option value="">Année</option>
        {YEARS.map(y => <option key={y} value={y}>{y}</option>)}
      </select>
    </div>
  );
}

type FormKey = keyof typeof EMPTY;

export default function ExperienceEditPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState<Partial<Record<FormKey, boolean>>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const { toast, show: showToast, hide: hideToast } = useToast();

  useEffect(() => {
    if (isNew) return;
    getDoc(doc(db, "experiences", id)).then(snap => {
      if (snap.exists()) {
        const d = snap.data();
        const periodStart = d.periodStart ?? "";
        const periodEnd = d.periodEnd ?? "";
        const ongoing = d.ongoing ?? (periodEnd === "" || periodEnd === "Présent" || periodEnd === "Present");
        setForm({ ...EMPTY, ...d, periodStart, periodEnd: ongoing ? "" : periodEnd, ongoing, responsibilities: (d.responsibilities || []).join("\n"), tech: (d.tech || []).join(", ") });
      }
      setLoading(false);
    });
  }, [id, isNew]);

  const set = (k: FormKey, v: string | boolean | number) => setForm(f => ({ ...f, [k]: v }));
  const touch = (k: FormKey) => setTouched(t => ({ ...t, [k]: true }));

  const errors: Partial<Record<FormKey, string>> = {
    role: !form.role.trim() ? "Le poste est requis." : undefined,
    employer: !form.employer.trim() ? "L'employeur est requis." : undefined,
    type: !form.type.trim() ? "Le type est requis." : undefined,
    periodStart: !form.periodStart ? "La date de début est requise." : undefined,
  };

  const hasErrors = REQUIRED.some(k => !!errors[k]);
  const showError = (k: FormKey) => (submitAttempted || touched[k]) && !!errors[k];

  const save = async () => {
    setSubmitAttempted(true);
    if (hasErrors) return;
    setSaving(true);
    try {
      const data = {
        ...form,
        periodStart: form.periodStart,
        periodEnd: form.ongoing ? "" : form.periodEnd,
        ongoing: form.ongoing,
        period: `${formatMonth(form.periodStart)} — ${form.ongoing ? "Présent" : formatMonth(form.periodEnd)}`,
        responsibilities: form.responsibilities.split("\n").map(s => s.trim()).filter(Boolean),
        tech: form.tech.split(",").map(s => s.trim()).filter(Boolean),
        updatedAt: serverTimestamp(),
      };
      if (isNew) await addDoc(collection(db, "experiences"), { ...data, createdAt: serverTimestamp() });
      else await setDoc(doc(db, "experiences", id), data, { merge: true });
      // Invalidate ISR cache so public page reflects changes immediately
      await fetch("/api/revalidate", { method: "POST" });
      router.push(`/admin/experiences?success=${isNew ? "created" : "updated"}`);
    } catch (e) {
      setSaving(false);
      showToast(e instanceof Error ? e.message : "Erreur lors de la sauvegarde.", "error");
    }
  };

  if (loading) return (
    <AdminShell title="Expérience">
      <div className="flex justify-center py-20"><span className="w-6 h-6 border-2 border-accent/30 border-t-accent rounded-full animate-spin" /></div>
    </AdminShell>
  );

  const inputClass = (k: FormKey) =>
    `w-full px-3 py-2.5 rounded-lg bg-surface border text-sm focus:outline-none transition-colors ${
      showError(k) ? "border-red-400/60 focus:border-red-400" : "border-border/50 focus:border-accent"
    }`;

  const renderField = (label: string, k: FormKey, placeholder?: string, type = "text") => (
    <div>
      <label htmlFor={`f-${k}`} className="block text-xs font-mono text-muted mb-1.5">
        {label}{REQUIRED.includes(k as typeof REQUIRED[number]) && <span aria-hidden className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        id={`f-${k}`}
        type={type}
        value={form[k] as string}
        onChange={e => set(k, type === "number" ? Number(e.target.value) : e.target.value)}
        onBlur={() => touch(k)}
        placeholder={placeholder}
        aria-invalid={showError(k) ? "true" : undefined}
        aria-describedby={showError(k) ? `err-${k}` : undefined}
        className={inputClass(k)}
      />
      {showError(k) && <p id={`err-${k}`} role="alert" className="text-xs text-red-400 mt-1">{errors[k]}</p>}
    </div>
  );

  return (
    <AdminShell
      title={isNew ? "Nouvelle expérience" : "Modifier expérience"}
      action={
        <button
          onClick={save}
          disabled={saving || hasErrors}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-bg text-xs font-semibold hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <Save size={13} /> {saving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      }
    >
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}
      <div className="space-y-4 max-w-2xl">
        {submitAttempted && hasErrors && (
          <div role="alert" aria-live="assertive" className="rounded-lg border border-red-400/30 bg-red-400/5 px-4 py-3">
            <p className="text-xs font-medium text-red-400 mb-1">Corrigez les erreurs avant de sauvegarder :</p>
            <ul className="space-y-0.5">
              {REQUIRED.filter(k => errors[k]).map(k => (
                <li key={k} className="text-xs text-red-400/80">
                  <a href={`#f-${k}`} className="underline underline-offset-2 hover:text-red-400 transition-colors">{errors[k]}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          {renderField("Poste", "role", "Testeur Automaticien")}
          {renderField("Employeur", "employer", "IBM")}
          {renderField("Client / Projet", "company", "Grand Compte — E-commerce")}
          {renderField("Type", "type", "Ex: QA Automation")}
          <div>
            <label className="block text-xs font-mono text-muted mb-1.5">
              Date de début<span aria-hidden className="text-red-400 ml-0.5">*</span>
            </label>
            <MonthYearPicker
              value={form.periodStart}
              onChange={v => set("periodStart", v)}
              onBlur={() => touch("periodStart")}
              error={showError("periodStart")}
            />
            {showError("periodStart") && <p role="alert" className="text-xs text-red-400 mt-1">{errors.periodStart}</p>}
          </div>
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-mono text-muted">Date de fin</label>
              <label className="flex items-center gap-1.5 text-xs text-muted cursor-pointer select-none">
                <input type="checkbox" checked={form.ongoing} onChange={e => set("ongoing", e.target.checked)} className="accent-accent" />
                En cours
              </label>
            </div>
            <MonthYearPicker
              value={form.periodEnd}
              onChange={v => set("periodEnd", v)}
              disabled={form.ongoing}
            />
          </div>
        </div>

        <div>
          <label htmlFor="f-description" className="block text-xs font-mono text-muted mb-1.5">Description</label>
          <textarea
            id="f-description"
            value={form.description}
            onChange={e => set("description", e.target.value)}
            rows={3}
            className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors resize-none"
          />
        </div>

        <div>
          <label htmlFor="f-responsibilities" className="block text-xs font-mono text-muted mb-1.5">
            Responsabilités <span className="text-muted/60">(1 par ligne)</span>
          </label>
          <textarea
            id="f-responsibilities"
            value={form.responsibilities}
            onChange={e => set("responsibilities", e.target.value)}
            rows={6}
            placeholder={"Développement de tests automatisés\nRevue de code..."}
            className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors resize-none font-mono"
          />
        </div>

        <div>
          <label htmlFor="f-tech" className="block text-xs font-mono text-muted mb-1.5">
            Technologies <span className="text-muted/60">(séparées par virgule)</span>
          </label>
          <input
            id="f-tech"
            value={form.tech}
            onChange={e => set("tech", e.target.value)}
            placeholder="UFT, Playwright, Jira, Git"
            className="w-full px-3 py-2.5 rounded-lg bg-surface border border-border/50 text-sm focus:outline-none focus:border-accent transition-colors"
          />
        </div>

        <div className="flex items-center gap-6 pt-1">
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input type="checkbox" checked={form.defaultOpen} onChange={e => set("defaultOpen", e.target.checked)} className="accent-accent" />
            Ouvert par défaut
          </label>
          <label className="flex items-center gap-2 text-sm cursor-pointer select-none">
            <input type="checkbox" checked={form.prominent} onChange={e => set("prominent", e.target.checked)} className="accent-accent" />
            Mise en avant
          </label>
        </div>
      </div>
    </AdminShell>
  );
}
