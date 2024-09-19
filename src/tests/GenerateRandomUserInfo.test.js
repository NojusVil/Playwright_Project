import { test, expect } from "@playwright/test";
import { generateTestData, exportToJson } from "../utils/TestDataGenerator.js";

test("Generate Random Test Data", async ({ page }) => {
  const TestData = generateTestData(1);
  exportToJson(TestData, "NewUserData.json");
});
