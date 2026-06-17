import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center grid-bg">
      <div className="max-w-lg mx-auto px-6 text-center">
        {/* Terminal card */}
        <div className="rounded-xl border border-border/80 bg-surface/80 backdrop-blur-sm overflow-hidden shadow-2xl mb-8">
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border/50 bg-elevated/50">
            <span className="w-3 h-3 rounded-full bg-red-500/70" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
            <span className="w-3 h-3 rounded-full bg-green-500/70" />
            <span className="ml-auto text-xs text-muted font-mono">404.test.ts</span>
          </div>
          <div className="p-6 font-mono text-sm text-left space-y-1.5">
            <p className="text-muted">$ running page lookup...</p>
            <p className="text-red-400">✗ page not found — 404</p>
            <p className="text-muted">expected: valid route</p>
            <p className="text-muted">received: undefined</p>
            <p className="text-accent mt-3">1 failed · 0 passed</p>
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-3">Page introuvable</h1>
        <p className="text-text-secondary mb-8">Cette page n'existe pas ou a été déplacée.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium bg-accent text-bg hover:bg-accent/90 transition-all duration-200 font-mono"
        >
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
