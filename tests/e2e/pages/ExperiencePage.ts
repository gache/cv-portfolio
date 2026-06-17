import { Page, Locator } from "@playwright/test";

export class ExperiencePage {
  readonly page: Page;
  readonly heading: Locator;
  readonly ibmCard: Locator;
  readonly ibmActuelBadge: Locator;
  readonly modisCard: Locator;
  readonly auchanCard: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Parcours professionnel" });
    this.ibmCard = page.getByText("IBM").first();
    this.ibmActuelBadge = page.getByText("Actuel");
    this.modisCard = page.getByText("Modis");
    this.auchanCard = page.getByText("Auchan Retail");
  }

  async goto() {
    await this.page.goto("/#experience");
  }

  getMission(name: string): Locator {
    return this.page.getByText(name, { exact: false }).first();
  }

  async expandMission(name: string) {
    await this.getMission(name).click();
  }
}
