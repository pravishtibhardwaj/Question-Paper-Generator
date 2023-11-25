# Question-Paper-Generator

## Tech Stack
- [NodeJS](https://nodejs.org/en)
- [ExpressJS](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Rest API](https://developers.google.com/fit/rest/v1/get-started)



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

- `MONGO_URI` is used to connect the project to a MongoDB database.
- `PORT` - server will run on this port

## Installation & Basic Instructions

Install the project with yarn/npm.

Clone the repository

```bash
  git clone https://github.com/pravishtibhardwaj/Question-Paper-Generator.git/
```

Enter in cloned the directory

```bash
  cd Question-Paper-Generator
```

Install Node modules in the cloned folder

```bash
  npm install
```

Start the server in production mode with

```bash
  npm start
```


Populate the database with the sample data provided. You can do so by using the /question/createMany API. Just copy and paste all the data from the questionStore.json file in the body of the request. You can also use the /question/create API to add a single question. 
