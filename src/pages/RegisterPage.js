import { expect, Page } from "@playwright/test";
import logger from "../utils/ResultLogger";

export class NewUserRegisterPage {
  constructor(page) {
    this.page = page;
    this.CookieAcceptButton = page.getByRole("button", {
      name: "Accept All Cookies",
    });
    this.FirstName = page.getByPlaceholder("Your first name");
    this.Lastname = page.getByPlaceholder("Your last name");
    this.Email = page.getByPlaceholder("Your email address");
    this.Role = page.getByLabel("Role*");
    this.CompanyName = page.getByPlaceholder("Company Name");
    this.Country = page.getByLabel("Country/Region*");
    this.State = page.getByLabel("State/Province*");
    this.PostalCode = page.getByPlaceholder("Your postal code");
    this.Username = page.getByPlaceholder("jane@company.sandbox");
    this.CheckBox = page.getByRole("checkbox", {
      name: "I agree to the Main Services",
    });
    this.SignUpButton = page.getByRole("button", { name: "Sign me Up" });
    this.VerifyText = page.getByRole("heading", { name: "Almost there…" });
  }
  async goToRegisterPage() {
    await this.page.goto("https://developer.salesforce.com/signup");
    logger.info("Navigated to the register page");
  }
  async AcceptCookies() {
    await this.CookieAcceptButton.click();
    logger.info("Cookies Accepted");
  }
  async RegisterNewUser(
    First_Name,
    Last_Name,
    Email_Adress,
    User_Role,
    Company_Name,
    User_Country,
    User_Postal_Code,
    User_Username,
    User_State
  ) {
    await this.FirstName.fill(First_Name);
    logger.info(`First name filled ${First_Name}`);
    await this.Lastname.fill(Last_Name);
    logger.info(`Last name filled ${Last_Name}`);
    await this.Email.fill(Email_Adress);
    logger.info(`Email filled ${Email_Adress}`);
    await this.Role.selectOption(User_Role);
    logger.info(`Role selected ${User_Role}`);
    await this.CompanyName.fill(Company_Name);
    logger.info(`Company name filled ${Company_Name}`);
    await this.Country.selectOption(User_Country);
    logger.info(`Country selected ${User_Country}`);
    if (User_Country === "US") {
      if (User_State) {
        await this.State.selectOption(User_State);
        logger.info(`State selected: ${User_State}`);
      } else {
        logger.error("State is missing for a US user.");
      }
    }
    await this.PostalCode.fill(User_Postal_Code);
    logger.info(`Postal code filled ${User_Postal_Code}`);
    await this.Username.fill(User_Username);
    logger.info(`Username filled ${User_Username}`);
  }
  async AcceptTerms() {
    await this.CheckBox.click();
    logger.info("Terms accepted");
  }
  async SingUp() {
    await this.SignUpButton.click();
    logger.info("Sign up button clicked");
  }
  async VerifyRegistration() {
    try {
      await expect(this.VerifyText).toBeVisible({ timeout: 500000 });
      logger.info("Registration successful verify email");
    } catch (error) {
      logger.error(`Error completing registration: ${error}`);
      throw error;
    }
  }
}
