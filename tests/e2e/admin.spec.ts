import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Admin — Auth guard", () => {

  test("GET /admin redirige vers /admin/login sans session", async ({ page }) => {
    await page.goto(`${BASE}/admin`);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("GET /admin/experiences redirige vers /admin/login sans session", async ({ page }) => {
    await page.goto(`${BASE}/admin/experiences`);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("GET /admin/experiences/new redirige vers /admin/login sans session", async ({ page }) => {
    await page.goto(`${BASE}/admin/experiences/new`);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("GET /admin/seed redirige vers /admin/login sans session", async ({ page }) => {
    await page.goto(`${BASE}/admin/seed`);
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveURL(/\/admin\/login/);
  });
});

test.describe("Admin — Login page", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE}/admin/login`);
    await page.waitForLoadState("networkidle");
  });

  test("affiche le titre Admin Panel", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Admin Panel" })).toBeVisible();
  });

  test("bouton Google visible et cliquable", async ({ page }) => {
    const btn = page.getByRole("button", { name: /continuer avec google/i });
    await expect(btn).toBeVisible();
    await expect(btn).toBeEnabled();
  });

  test("pas d'erreurs JS au chargement", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.reload();
    await page.waitForLoadState("networkidle");
    expect(errors.filter(e => !e.includes("favicon"))).toHaveLength(0);
  });

  test("page accessible — role dialog absent (pas de modal parasite)", async ({ page }) => {
    const dialogs = page.locator("[role='dialog']");
    await expect(dialogs).toHaveCount(0);
  });
});

test.describe("Admin — Experience form (unauthenticated redirected)", () => {

  test("formulaire /admin/experiences/new non accessible sans auth", async ({ page }) => {
    await page.goto(`${BASE}/admin/experiences/new`);
    await page.waitForLoadState("networkidle");
    // Should redirect to login, not show form
    await expect(page.getByLabel(/Poste/i)).not.toBeVisible();
    await expect(page).toHaveURL(/login/);
  });
});
