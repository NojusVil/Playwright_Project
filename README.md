# Test Automation Project Using Playwright/Javascript
## 1. Overview

This test automation project focuses to highlight the basic of test automation using playwright

## 2. Features

### 2.1 Page Object Models (POM) 

### 2.2 Testing done using data files

### 2.3 Result logging

### 2.4 Data Generation

## 3. Test Scenarios

### 3.1 Test login functionality

**Steps:**

1. Create POM Class for login page.
3. Retrieve test data from an external source.
4. Create Tests using Page class and its methods to login.
   - Log in to Salesforce.
   - Verify the success of login
   - Log the results.

### 3.2 Test create new user functionality


**Steps:**

1. Create POM for user page.
2. Generate random data to a json file.
3. Retrieve the generated test data.
4. For each set of data:
   - Log in to Salesforce.
   - Create a new record with the provided data.
   - Verify the record creation is successful.
   - Log the results.

### 3.3 Register new user functionality


**Steps:**

1. Create POM Class for register page.
3. Retrieve test data from an external source.
4. Create Tests using Page class and its methods to register a new user.
   - Fill out all the data.
   - Complete the registration form.
   - Log the results.
   - 
## 4. How to replicate
- copy the repository
- npm install //to install all repositorys
- npx playwright test tests/FillOutRegisterForm.test.js --project=chromium //test to create new developer user
- npx playwright test tests/GenerateRandomUserInfo.test.js --project=chromium //test to create random data for new users
- npx playwright test tests/Login_CreateNewUser.test.js --project=chromium // test that logs in with developer login's and creates users with the random data
      
