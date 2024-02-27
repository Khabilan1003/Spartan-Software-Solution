# Installation Details

## Steps for Installation
- Install MongoDB in Local Machine
- Run API Code
- Run the Websites

## MongoDB 
1. MongoDB Community Server
   - First We have to install [MongoDB Community Server](https://www.mongodb.com/try/download/community).
   - Select the appropriate version, OS and the package type.
   - Download the file and install it in your computer.
   - Once the installation is over restart your computer
   - Now add the location of bin folder in mongodb in environment variable. In windows the default location will be ```C:\\Program Files\MongoDB\Server\[version]\bin```
2. MongoDB Shell
   - After installation MongoDB Server install [MongoDB Shell](https://www.mongodb.com/try/download/shell)
   - Select the appropriate version, OS and package type.
   - Download the file and install it in your computer.
   - Now go to Command Prompt and enter the command ```mongosh```
   - If the installation is corrent then it will go to mongo shell.

## API
1. Go to the API folder in your terminal and run ```npm install``` to load all the packages
2. Once the installation is over make sure the mongodb is running as background service. If not open a terminal and execute ```mongod``` to enable the server
3. Now run the API using ```npm start```
