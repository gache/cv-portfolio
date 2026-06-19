import { test, expect } from "@playwright/test";
import { NavbarPage } from "./pages/NavbarPage";

test.describe("Navigation", () => {
  let navbar: NavbarPage;

  test.beforeEach(async ({ page }) => {
    navbar = new NavbarPage(page);
    await navbar.goto();
  });

  test("all 6 section links are visible", async () => {
    await expect(navbar.aboutLink).toBeVisible();
    await expect(navbar.experienceLink).toBeVisible();
    await expect(navbar.skillsLink).toBeVisible();
    await expect(navbar.projetsLink).toBeVisible();
    await expect(navbar.loisirs).toBeVisible();
    await expect(navbar.contactLink).toBeVisible();
  });

  test("CV button opens PDF in new tab", async () => {
    await expect(navbar.downloadCVButton).toHaveAttribute("href", "/cv-erick-franco.pdf");
    await expect(navbar.downloadCVButton).toHaveAttribute("target", "_blank");
  });

  test("clicking Experience navigates to #experience", async ({ page }) => {
    await navbar.navigateTo("experience");
    await expect(page).toHaveURL(/#experience/);
  });

  test("logo links to page top", async () => {
    await expect(navbar.logo).toHaveAttribute("href", "#");
  });
});
