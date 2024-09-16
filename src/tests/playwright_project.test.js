import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { NewUserCreatePage } from "../pages/CreateNewUserPage";
import logger from "../utils/ResultLogger";
import cdata from "../data/NewUserData.json";
import { faker } from "@faker-js/faker";
import { generateTestData, exportToJson } from "../utils/TestDataGenerator.js";

test("Generate Random Test Data", async ({ page }) => {
  const TestData = generateTestData(1);
  exportToJson(TestData, "NewUserData.json");
});

test.describe("User creation tests", () => {
  // Login before each user creation test
  test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);
    const Home = new HomePage(page);
    await Login.goToLoginPage();
    await Login.login(process.env.userid, process.env.password);
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
