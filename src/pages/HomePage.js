import { expect, Page } from "@playwright/test";
import logger from "../utils/ResultLogger";

export class HomePage {
  constructor(page) {
    this.page = page;
    this.HomePageText = page
      .getByRole("heading", { name: "Home" })
      .locator("span");
    this.CreateButton = page.getByRole("button", { name: "Create" });
    this.UserButton = page.getByRole("menuitem", { name: "User", exact: true });
  }
  async CheckIfHomeTextVisible() {
    try {
      await expect(this.HomePageText).toBeVisible();
      logger.info("Home page text is visible. Login was successful.");
    } catch (error) {
      logger.error(`Error clicking login button: ${error}`);
      throw error;
    }
  }

  async NavigateToCreateNewUserPage() {
    await this.CreateButton.click();
    logger.info("Create button clicked");
    await this.UserButton.click();
    logger.info("User button clicked");
  }
}
