import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { HomePage } from "../pages/HomePage.js";
import { NewUserCreatePage } from "../pages/CreateNewUserPage.js";
import logger from "../utils/ResultLogger.js";
import cdata from "../data/NewUserData.json";
import LoginData from "../data/LoginData.json";

test.describe("User creation tests", () => {
  // Login before each user creation test
  test.beforeEach(async ({ page }) => {
    const LogData = LoginData[0];
    const Login = new LoginPage(page);
    const Home = new HomePage(page);
    await Login.goToLoginPage();
    await Login.login(LogData.Login_Username, LogData.Login_Password);
    await Home.CheckIfHomeTextVisible();
    logger.info("Login test completed");
  });

  // Loop through contact data and create new users
  for (const contact of cdata) {
    test(`Create New User for ${contact.firstname} ${contact.lastname}`, async ({
      page,
    }) => {
      const Home = new HomePage(page);
      const User = new NewUserCreatePage(page);
      await Home.NavigateToCreateNewUserPage();
      await User.VerifyUserPage();
      await User.FillOutNewUserForm(
        contact.firstname,
        contact.lastname,
        contact.email,
        contact.alias,
        contact.username
      );
      await User.SaveNewUserFrom();
      await User.VerifyNewUser(contact.firstname, contact.lastname);
    });
  }
});
