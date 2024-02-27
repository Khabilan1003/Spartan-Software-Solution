# Installation Guide

This guide provides step-by-step instructions for installing and running the MongoDB database, API, and client/admin websites locally on your machine.

## MongoDB Installation

1. **MongoDB Community Server**: 
   - Download MongoDB Community Server from [MongoDB's official website](https://www.mongodb.com/try/download/community).
   - Choose the appropriate version, operating system, and package type.
   - Follow the installation instructions and install MongoDB on your computer.
   - After installation, restart your computer.
   - Add the MongoDB bin folder path to your system's environment variables. For Windows, the default location is typically `C:\\Program Files\\MongoDB\\Server\\[version]\\bin`.

2. **MongoDB Shell**:
   - Download MongoDB Shell from [MongoDB's official website](https://www.mongodb.com/try/download/shell).
   - Select the suitable version, operating system, and package type.
   - Install MongoDB Shell on your computer.
   - Open a command prompt and type `mongosh`. If installed correctly, it should launch the MongoDB shell.

## API Setup

1. **Navigate to API Folder**:
   - Open your terminal and navigate to the API folder.
   - Run `npm install` to install all the required packages.

2. **Start MongoDB**:
   - Ensure that MongoDB is running as a background service. If not, open a terminal and execute `mongod` to start the MongoDB server.

3. **Run API**:
   - Execute `npm start` in the API directory to start the API.

## Client Website Setup

1. **Navigate to Client Website Folder**:
   - Open your terminal and navigate to the Client Website folder.
   - Run `npm install` to install all the necessary packages.

2. **Start Client Website**:
   - Run `npm start` to start the client website.
   - Initially, the website will display "Premium Users can see the data" as there is no data in the database.

3. **Load Data**:
   - Go to the `/loadData` route on the website.
   - Select the `PERM_Data_Analyzer.xlsx` file and choose sheet 2, then submit the data.
   - Once the data is successfully stored in the database, you can view it at `/viewData`.

## Admin Website Setup

1. **Navigate to Admin Website Folder**:
   - Open your terminal and navigate to the Admin Website folder.
   - Run `npm install` to install all the necessary packages.

2. **Start Admin Website**:
   - Run `npm start` to start the admin website.
   - Note: There is no login functionality implemented yet, so simply click the "Login" button to access the admin dashboard.

By following these steps, you should have MongoDB, API, client website, and admin website up and running locally on your machine.
