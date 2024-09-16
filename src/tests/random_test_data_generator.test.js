import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { generateTestData, exportToJson } from "../utils/TestDataGenerator.js";

test("Generate Random Test Data", async ({ page }) => {
  const TestData = generateTestData(3);
  exportToJson(TestData, "NewUserData.json");
});
