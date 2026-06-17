import { Page, Locator } from "@playwright/test";

export class ContactPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly messageInput: Locator;
  readonly submitButton: Locator;
  readonly successMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Travaillons ensemble" });
    this.nameInput = page.getByPlaceholder("Jean Dupont");
    this.emailInput = page.getByPlaceholder("jean@entreprise.fr");
    this.companyInput = page.getByPlaceholder("Nom de votre entreprise");
    this.messageInput = page.getByPlaceholder(/Décrivez votre besoin/);
    this.submitButton = page.getByRole("button", { name: /Envoyer le message/i });
    this.successMessage = page.getByText("Message envoyé !");
  }

  async goto() {
    await this.page.goto("/#contact");
  }

  async fillForm(data: {
    name: string;
    email: string;
    company?: string;
    message: string;
  }) {
    await this.nameInput.fill(data.name);
    await this.emailInput.fill(data.email);
    if (data.company) await this.companyInput.fill(data.company);
    await this.messageInput.fill(data.message);
  }

  async submit() {
    await this.submitButton.click();
  }
}
