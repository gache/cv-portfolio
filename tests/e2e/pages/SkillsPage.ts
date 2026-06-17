import { Page, Locator } from "@playwright/test";

export type SkillCategory =
  | "Test Automation"
  | "Backend"
  | "Frontend"
  | "DevOps & Outils"
  | "Intelligence Artificielle";

export class SkillsPage {
  readonly page: Page;
  readonly heading: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Stack technique" });
  }

  async goto() {
    await this.page.goto("/#skills");
  }

  getCategoryTab(name: SkillCategory): Locator {
    return this.page.getByRole("button", { name });
  }

  async switchCategory(name: SkillCategory) {
    await this.getCategoryTab(name).click();
  }

  getSkillBar(name: string): Locator {
    return this.page.getByText(name, { exact: true });
  }
}
