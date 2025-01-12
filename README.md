# Web-Application-Mimicking-Google-Sheets

# Overview

Developing an web application that closely mimics the user interface and core functionalities
of Google Sheets, with a focus on mathematical and data quality functions, data entry,
and key UI interactions.

# Features

  # 1. Spreadsheet Interface:
       Mimics the Google Sheets UI where it strive for a visual design and layout that
       closely resembles Google Sheets, formula bar and cell sturcture
  # 2. Mathematical Functions:
       In this web application we have add some mathematical functions into it like Sum function,
       Average function and Count fucntion into the application
  # 3. Data Quality Functions:
       We have added the data quality functions also into it like TRIM, UPPER, LOWER
  # 4. Extra Feature:
       In the web apllication the Drag and Drop feature has been added into it

# Implementation
---

## **Table of Contents**
1. [Prerequisites](#prerequisites)
2. [Setting Up the Application](#setting-up-the-application)
3. [Running the Application](#running-the-application)
4. [Common Errors and Fixes](#common-errors-and-fixes)

---

## **Prerequisites**
Before setting up the application, ensure you have the following installed on your system:

- **Node.js and npm**: Download and install from [https://nodejs.org/](https://nodejs.org/).
- **Text Editor**: Visual Studio Code (VS Code) is recommended. Download it from [https://code.visualstudio.com/](https://code.visualstudio.com/).

To verify installations:

```bash
node -v   # Checks Node.js version
npm -v    # Checks npm version
```

---

## **Setting Up the Application**

### **Step 1: Clone or Create the Project Folder**
Ensure you have a project folder ready, e.g., `spreadsheet-app`.

```bash
mkdir spreadsheet-app
cd spreadsheet-app
```

### **Step 2: Initialize the React Application**
Run the following command to initialize a new React app:

```bash
npx create-react-app .
```

This sets up a new React project in the current directory.

### **Step 3: Add the Application Code**
1. Replace the default files in the `src/` directory with the provided application code (e.g., `App.js`, `SpreadsheetApp.js`, `index.js`).
2. Ensure `package.json` includes all required dependencies.

---

## **Running the Application**

### **Step 1: Install Dependencies**
Install the project dependencies by running:

```bash
npm install
```

### **Step 2: Start the Application**
Run the app with:

```bash
npm start
```

This starts the development server and opens the application in your default web browser at [http://localhost:3000](http://localhost:3000).

---

## **Common Errors and Fixes**

### **Error 1: PowerShell Script Error**
If you encounter the error:

```
npm : File cannot be loaded because running scripts is disabled on this system.
```

**Fix:** Enable scripts in PowerShell by running:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### **Error 2: Missing `start` Script**
If `npm start` throws:

```
npm ERR! Missing script: "start"
```

**Fix:** Ensure your `package.json` includes the following under `scripts`:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test"
}
```

### **Error 3: Module Not Found: `web-vitals`**
If the error mentions `Module not found: Can't resolve 'web-vitals'`:

**Fix:** Install the missing package:

```bash
npm install web-vitals
```

### **Error 4: Corrupted `node_modules` Folder**
If errors persist, clear and reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

---



