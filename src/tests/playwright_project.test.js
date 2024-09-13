import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { HomePage } from "../pages/HomePage";

test("Login", async ({ page }) => {
  const Login = new LoginPage(page);
  const Home = new HomePage(page);
  await Login.goToLoginPage();
  await Login.login("playwrightlearning@test.com", "nmBTgQXMmaZq7Sg");
  await Home.CheckIfHomeTextVisible();
});
