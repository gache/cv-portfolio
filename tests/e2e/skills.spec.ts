import { test, expect } from "@playwright/test";
import { SkillsPage } from "./pages/SkillsPage";

test.describe("Skills Section", () => {
  let skillsPage: SkillsPage;

  test.beforeEach(async ({ page }) => {
    skillsPage = new SkillsPage(page);
    await skillsPage.goto();
  });

  test("section heading is visible", async () => {
    await expect(skillsPage.heading).toBeVisible();
  });

  test("Test Automation tab active by default with correct skills", async () => {
    await expect(skillsPage.getCategoryTab("Test Automation")).toBeVisible();
    await expect(skillsPage.getSkillBar("Playwright")).toBeVisible();
    await expect(skillsPage.getSkillBar("Selenium")).toBeVisible();
    await expect(skillsPage.getSkillBar("UFT")).toBeVisible();
  });

  test("switching to Backend shows Java and Spring Boot", async () => {
    await skillsPage.switchCategory("Backend");
    await expect(skillsPage.getSkillBar("Java")).toBeVisible();
    await expect(skillsPage.getSkillBar("Spring Boot")).toBeVisible();
  });

  test("switching to AI shows Prompt Engineering", async () => {
    await skillsPage.switchCategory("Intelligence Artificielle");
    await expect(skillsPage.getSkillBar("Prompt Engineering")).toBeVisible();
  });

  test("all 5 category tabs are present", async () => {
    const categories: Array<Parameters<typeof skillsPage.getCategoryTab>[0]> = [
      "Test Automation", "Backend", "Frontend", "DevOps & Outils", "Intelligence Artificielle",
    ];
    for (const cat of categories) {
      await expect(skillsPage.getCategoryTab(cat)).toBeVisible();
    }
  });
});
