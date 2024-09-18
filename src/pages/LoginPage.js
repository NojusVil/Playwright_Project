import { Page } from "@playwright/test";
import logger from "../utils/ResultLogger";

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.username_textbox = page.getByLabel("Username");
    this.password_textbox = page.getByLabel("Password");
    this.login_button = page.getByRole("button", { name: "Log In" });
  }
  async goToLoginPage() {
    await this.page.goto(
      "https://playwrightlearning-dev-ed.develop.my.salesforce.com"
    );
    logger.info("Navigated to the login page");
  }
  async login(Login_Username, Login_Password) {
    await this.username_textbox.fill(Login_Username);
    logger.info("Filled username");
    await this.password_textbox.fill(Login_Password);
    logger.info("Filled password");
    await this.login_button.click();
    logger.info("Login button clicked");
  }
}
