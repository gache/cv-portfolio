import { Page, Locator } from "@playwright/test";

export class HeroPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly availableBadge: Locator;
  readonly terminalWindow: Locator;
  readonly downloadCVButton: Locator;
  readonly contactButton: Locator;
  readonly viewExperienceLink: Locator;
  readonly passCount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: /Erick/i });
    this.availableBadge = page.getByText("Disponible pour de nouvelles missions");
    this.terminalWindow = page.locator('[class*="qualification"]').first();
    this.downloadCVButton = page.getByRole("link", { name: /Télécharger CV/i }).first();
    this.contactButton = page.getByRole("link", { name: /Me contacter/i });
    this.viewExperienceLink = page.getByRole("link", { name: /Voir l'expérience/i });
    this.passCount = page.getByText("3/3 passed");
  }

  async goto() {
    await this.page.goto("/");
  }
}
