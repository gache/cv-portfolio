import { test, expect } from "@playwright/test";
import { HeroPage } from "./pages/HeroPage";

test.describe("Hero Section", () => {
  let heroPage: HeroPage;

  test.beforeEach(async ({ page }) => {
    heroPage = new HeroPage(page);
    await heroPage.goto();
  });

  test("displays name and available badge", async () => {
    await expect(heroPage.heading).toBeVisible();
    await expect(heroPage.availableBadge).toBeVisible();
  });

  test("terminal shows QA role and pass count", async () => {
    await expect(heroPage.page.getByText("QA Automation Engineer")).toBeVisible();
    await expect(heroPage.passCount).toBeVisible();
  });

  test("CV button opens PDF in new tab", async () => {
    await expect(heroPage.downloadCVButton).toHaveAttribute("href", "/cv-erick-franco.pdf");
    await expect(heroPage.downloadCVButton).toHaveAttribute("target", "_blank");
  });

  test("contact button links to #contact section", async () => {
    await expect(heroPage.contactButton).toHaveAttribute("href", "#contact");
  });
});
