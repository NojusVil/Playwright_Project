import { expect, Page } from "@playwright/test";
import logger from "../utils/ResultLogger";

export class NewUserCreatePage {
  constructor(page) {
    this.page = page;
    this.UserPageText = page
      .getByRole("heading", { name: "Users" })
      .locator("span");
    this.frame = page.frameLocator("iframe").first();
    this.FirstNameInput = this.frame.getByLabel("First Name");
    this.LastNameInput = this.frame.getByLabel("Last Name");
    this.AliasNameInput = this.frame.getByLabel("Alias");
    this.EmailNameInput = this.frame.locator("#Email");
    this.UserNameInput = this.frame.locator("#Username");
    this.NewUserSaveButton = this.frame.locator(
      "#bottomButtonRow > input:nth-child(1)"
    );
    this.NewUserName = this.frame.locator(
      "body > div.bPageTitle > div.ptBody > div.content > h2"
    );
  }
  async VerifyUserPage() {
    await expect(this.UserPageText).toBeVisible();
    logger.info("User Page is Visible");
  }
  async FillOutNewUserForm(firstname, lastname, email, alias, username) {
    await this.FirstNameInput.fill(firstname);
    logger.info(`First name filled ${firstname}`);
    await this.LastNameInput.fill(lastname);
    logger.info(`Last name filled ${lastname}`);
    await this.AliasNameInput.fill("");
    await this.AliasNameInput.fill(alias);
    logger.info(`Alias filled ${alias}`);
    await this.EmailNameInput.fill(email);
    logger.info(`Email filled ${email}`);
    await this.UserNameInput.fill("");
    await this.UserNameInput.fill(username);
    logger.info(`Username filled ${username}`);
  }
  async SaveNewUserFrom() {
    await this.NewUserSaveButton.click();
    logger.info("New User Has Been Created");
  }
  async VerifyNewUser(firstname, lastname) {
    await expect(this.NewUserName).toContainText(firstname, lastname);
    logger.info(`Correct User Was Created ${firstname} ${lastname}`);
  }
}
