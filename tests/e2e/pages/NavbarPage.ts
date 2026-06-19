import { Page, Locator } from "@playwright/test";

export class NavbarPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly aboutLink: Locator;
  readonly experienceLink: Locator;
  readonly skillsLink: Locator;
  readonly projetsLink: Locator;
  readonly loisirs: Locator;
  readonly contactLink: Locator;
  readonly downloadCVButton: Locator;

  constructor(page: Page) {
    this.page = page;
    const nav = page.getByRole("navigation");
    this.logo = nav.getByRole("link", { name: /EF/i });
    this.aboutLink = nav.getByRole("link", { name: "À propos" });
    this.experienceLink = nav.getByRole("link", { name: "Expérience" });
    this.skillsLink = nav.getByRole("link", { name: "Skills" });
    this.projetsLink = nav.getByRole("link", { name: "Projets" });
    this.loisirs = nav.getByRole("link", { name: /Loisirs|Hobbies|Aficiones/i });
    this.contactLink = nav.getByRole("link", { name: "Contact" });
    this.downloadCVButton = nav.getByRole("link", { name: /Télécharger CV/i });
  }

  async goto() {
    await this.page.goto("/");
  }

  async navigateTo(section: "apropos" | "experience" | "skills" | "projets" | "contact") {
    const links: Record<string, Locator> = {
      apropos: this.aboutLink,
      experience: this.experienceLink,
      skills: this.skillsLink,
      projets: this.projetsLink,
      contact: this.contactLink,
    };
    await links[section].click();
  }
}
