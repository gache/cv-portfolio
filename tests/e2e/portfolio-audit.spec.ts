import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Portfolio — Audit complet", () => {

  test("Page charge sans erreurs JS", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", m => { if (m.type() === "error") errors.push(m.text()); });
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    expect(errors).toHaveLength(0);
  });

  test("Title contient 'QA Automation'", async ({ page }) => {
    await page.goto(BASE);
    await expect(page).toHaveTitle(/QA Automation/);
  });

  test("H1 affiche 'Erick Franco'", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    const h1 = page.locator("h1").first();
    await expect(h1).toContainText("Erick");
  });

  test("Photo chargée (naturalWidth > 0)", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    const photo = page.locator('img[alt="Erick Franco"]').first();
    const loaded = await photo.evaluate((el: HTMLImageElement) => el.naturalWidth > 0);
    expect(loaded).toBe(true);
  });

  test("Navbar a 6 liens", async ({ page }) => {
    await page.goto(BASE);
    const links = page.locator("header nav ul li a");
    await expect(links).toHaveCount(6);
  });

  test("Toutes les sections existent", async ({ page }) => {
    await page.goto(BASE);
    for (const id of ["apropos", "experience", "skills", "projets", "hobbies", "temoignages", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
  });

  test("Stats affiche '20+'", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    await expect(page.locator("body")).toContainText("20+");
  });

  test("Hobbies a 6 cards (h3)", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    await page.locator("#hobbies").scrollIntoViewIfNeeded();
    const cards = page.locator("#hobbies h3");
    await expect(cards).toHaveCount(6);
  });

  test("Bouton témoignage ouvre modal", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    const btn = page.locator("#temoignages button").first();
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    await expect(page.locator(".fixed.inset-0")).toBeVisible();
    // fermer
    await page.locator(".fixed.inset-0 button").first().click();
    await expect(page.locator(".fixed.inset-0")).toBeHidden();
  });

  test("Changement de langue EN", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "en" }).click();
    await expect(page.locator("body")).toContainText("IBM missions");
  });

  test("Changement de langue ES", async ({ page }) => {
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    await page.getByRole("button", { name: "es" }).click();
    await expect(page.locator("body")).toContainText("Aficiones");
  });

  test("Email link dans hero", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator('a[href^="mailto"]').first()).toBeAttached();
  });

  test("Pas de scroll horizontal (desktop 1280px)", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(BASE);
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth + 5);
    expect(overflow).toBe(false);
  });

  test("Pas de scroll horizontal (mobile 375px)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    const overflow = await page.evaluate(() => document.body.scrollWidth > window.innerWidth + 5);
    expect(overflow).toBe(false);
  });

  test("Hamburger menu mobile s'ouvre", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE);
    await page.waitForLoadState("networkidle");
    await page.locator("header button.md\\:hidden").click();
    await expect(page.locator("#mobile-menu")).toBeVisible();
  });

  test("Page 404 personnalisée", async ({ page }) => {
    await page.goto(`${BASE}/page-inexistante`);
    await page.waitForLoadState("networkidle");
    const body = await page.locator("body").textContent();
    expect(body?.toLowerCase()).toMatch(/404|not found|introuvable/);
  });

  test("Footer contient 'Erick Franco'", async ({ page }) => {
    await page.goto(BASE);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await expect(page.locator("footer")).toContainText("Erick Franco");
  });

});
