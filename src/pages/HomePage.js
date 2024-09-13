import { expect, Page } from "@playwright/test";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.HomePageText = page
      .getByRole("heading", { name: "Home" })
      .locator("span");
  }
  async CheckIfHomeTextVisible() {
    await expect(this.HomePageText).toBeVisible();
  }
}
