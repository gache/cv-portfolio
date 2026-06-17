import { test, expect } from "@playwright/test";
import { ExperiencePage } from "./pages/ExperiencePage";

test.describe("Experience Section", () => {
  let experiencePage: ExperiencePage;

  test.beforeEach(async ({ page }) => {
    experiencePage = new ExperiencePage(page);
    await experiencePage.goto();
  });

  test("section heading is visible", async () => {
    await expect(experiencePage.heading).toBeVisible();
  });

  test("IBM group is open by default with Actuel badge", async () => {
    await expect(experiencePage.ibmCard).toBeVisible();
    await expect(experiencePage.ibmActuelBadge).toBeVisible();
    await expect(experiencePage.getMission("Testeur Automaticien")).toBeVisible();
  });

  test("IBM shows 6 missions count badge", async ({ page }) => {
    await expect(page.getByText("6").first()).toBeVisible();
  });

  test("expanding a mission shows its tech stack", async ({ page }) => {
    await experiencePage.expandMission("Testeur Automaticien");
    await expect(page.getByText("UFT")).toBeVisible();
    await expect(page.getByText("Squash")).toBeVisible();
  });

  test("Modis and Auchan Retail employers are present", async () => {
    await expect(experiencePage.modisCard).toBeVisible();
    await expect(experiencePage.auchanCard).toBeVisible();
  });
});
