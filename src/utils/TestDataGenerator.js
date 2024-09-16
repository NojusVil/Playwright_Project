import { faker } from "@faker-js/faker";
import * as fs from "fs";
import * as createCsvWriter from "csv-writer";
import path from "path";

class UserData {
  constructor(firstName, lastName, alias, email, userName) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.alias = alias;
    this.email = email;
    this.userName = userName;
  }
}
const generateUserData = () => {
  return {
    firstname: faker.person.firstName(),
    lastname: faker.person.lastName(),
    alias: faker.internet.displayName(),
    email: faker.internet.email(),
    username: faker.internet.email(),
  };
};
// Function to generate an array of fake user data
const generateTestData = (numRecords) => {
  const testData = faker.helpers.multiple(generateUserData, {
    count: numRecords,
  });
  return testData;
};
const currentDir = __dirname;
// Go one level above (back to 'src')
const srcDir = path.resolve(currentDir, "..");

// Change to 'data' folder
const testdataDir = path.resolve(srcDir, "data");

// Function to export data to a JSON file
const exportToJson = (data, fileName) => {
  fs.writeFileSync(
    `${testdataDir}\\${fileName}`,
    JSON.stringify(data, null, 2)
  );
  console.log(`Data exported to JSON file: ${testdataDir}\\${fileName}`);
};
// Exporting the functions if needed
module.exports = { generateTestData, exportToJson };
