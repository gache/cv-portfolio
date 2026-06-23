import { test, expect } from "@playwright/test";
import { ContactPage } from "./pages/ContactPage";

test.describe("Contact Form", () => {
  let contactPage: ContactPage;

  test.beforeEach(async ({ page }) => {
    contactPage = new ContactPage(page);
    await contactPage.goto();
  });

  test("section heading is visible", async () => {
    await expect(contactPage.heading).toBeVisible();
  });

  test("all form fields are present", async () => {
    await expect(contactPage.nameInput).toBeVisible();
    await expect(contactPage.emailInput).toBeVisible();
    await expect(contactPage.companyInput).toBeVisible();
    await expect(contactPage.messageInput).toBeVisible();
  });

  test("submit button is enabled", async () => {
    await expect(contactPage.submitButton).toBeEnabled();
  });

  test("empty submission is blocked by HTML5 validation", async () => {
    await contactPage.submit();
    await expect(contactPage.nameInput).toBeVisible(); // form stays open
  });

  test("form accepts valid input", async () => {
    await contactPage.fillForm({
      name: "Jean Dupont",
      email: "jean@entreprise.fr",
      company: "TechCorp",
      message: "Bonjour, j'ai une opportunité pour vous.",
    });
    await expect(contactPage.nameInput).toHaveValue("Jean Dupont");
    await expect(contactPage.emailInput).toHaveValue("jean@entreprise.fr");
    await expect(contactPage.messageInput).toHaveValue("Bonjour, j'ai une opportunité pour vous.");
  });

  test("real email is displayed in contact info", async ({ page }) => {
    await expect(page.getByText("erickfrancodelgado@hotmail.com").first()).toBeVisible();
  });

  test("LinkedIn link points to real profile", async ({ page }) => {
    const linkedinLink = page.getByRole("link", { name: /LinkedIn/i }).first();
    await expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/erick-franco-delgado-394a6228/"
    );
  });

  test("error shown for invalid email format", async ({ page }) => {
    await contactPage.fillForm({ name: "Test", email: "notemail", company: "", message: "Hello" });
    await contactPage.emailInput.blur();
    const alert = page.locator("[role='alert']").first();
    await expect(alert).toBeVisible();
  });

  test("error clears when valid email entered", async ({ page }) => {
    await contactPage.fillForm({ name: "Test", email: "bad", company: "", message: "Hello" });
    await contactPage.emailInput.blur();
    await contactPage.emailInput.fill("valid@email.com");
    await contactPage.emailInput.blur();
    const alert = page.locator("[role='alert']").first();
    await expect(alert).not.toBeVisible();
  });

  test("character count updates on message input", async ({ page }) => {
    await contactPage.messageInput.fill("Hello world");
    // Char counter should appear
    const counter = page.locator("#contact [class*='text-xs'][class*='text-muted']").last();
    await expect(counter).toBeVisible();
  });

  test("social links have rel=noopener", async ({ page }) => {
    const externalLinks = page.locator("#contact a[target='_blank']");
    const count = await externalLinks.count();
    for (let i = 0; i < count; i++) {
      const rel = await externalLinks.nth(i).getAttribute("rel");
      expect(rel).toContain("noopener");
    }
  });
});
