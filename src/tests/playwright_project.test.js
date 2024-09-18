import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";
import { NewUserCreatePage } from "../pages/CreateNewUserPage";
import { NewUserRegisterPage } from "../pages/RegisterPage.js";
import logger from "../utils/ResultLogger";
import cdata from "../data/NewUserData.json";
import udata from "../data/RegisterData.json";
import LoginData from "../data/LoginData.json";
import { faker } from "@faker-js/faker";
import { generateTestData, exportToJson } from "../utils/TestDataGenerator.js";

test("register new user", async ({ page }) => {
  const Register = new NewUserRegisterPage(page);
  const userData = udata[0];
  await Register.goToRegisterPage();
  await Register.AcceptCookies();
  await Register.RegisterNewUser(
    userData.First_Name,
    userData.Last_Name,
    userData.Email_Adress,
    userData.User_Role,
    userData.Company_Name,
    userData.User_Country,
    userData.User_Postal_Code,
    userData.User_Username,
    userData.User_State
  );
  await Register.AcceptTerms();
  await Register.SingUp();
  logger.info("New User Register Form test completed");
});

test("Generate Random Test Data", async ({ page }) => {
  const TestData = generateTestData(5);
  exportToJson(TestData, "NewUserData.json");
});

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
