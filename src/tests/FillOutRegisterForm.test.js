import { test, expect } from "@playwright/test";
import { NewUserRegisterPage } from "../pages/RegisterPage.js";
import logger from "../utils/ResultLogger.js";
import udata from "../data/RegisterData.json";

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
  await Register.VerifyRegistration();
  logger.info("New User Register Form test completed");
});
