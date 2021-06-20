# url-shortner

Pass your original URL and get a shortened version of it.

  - [Introduction](#introduction)
  - [Quick Start](#quick-start)
  - [Folder Structure](#folder-structure)
## Introduction

The application is built on MERN stack. [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) as server and MongoDB for database. Client side code is written in React and the backend API is written using Express.  Used [Create React App](https://github.com/facebook/create-react-app) boilerplate to get started. 

This is a simple full stack [React](https://reactjs.org/) application with a [Node.js](https://nodejs.org/en/) and [Express](https://expressjs.com/) backend. Client side code is written in React and the backend API is written using Express. This application is configured with [Airbnb's ESLint rules](https://github.com/airbnb/javascript) and formatted through [prettier](https://prettier.io/).

### Prerequisite

* NodeJS (12.0+)
* ExpressJS
* NPM latest.

### Libraries Used (Backend)

* [nodemon](https://www.npmjs.com/package/nodemon) - For auto start
* [config](https://www.npmjs.com/package/config) - Configuring dev and production setups
* [mongoose](https://www.npmjs.com/package/mongoose) - MongoDB object modeling tool
* [valid-url](https://www.npmjs.com/package/valid-url) - Validating URLs

### Libraries used (Client)

* [React-Toastify](https://www.npmjs.com/package/react-toastify) -  Showing toast messages
* [axios](https://www.npmjs.com/package/axios) - XHR requests

## Quick Start

```bash
# Clone the repository
git clone https://github.com/Sudharshaun/url-shortner.git

# Go inside the directory
cd url-shortener

# Install dependencies
yarn (or npm install)

# Start development server
yarn dev (or npm run dev)

# Build for production
yarn build (or npm run build)

# Start production server
yarn start (or npm start)
```

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

## APIs

* /api/getAllUrls (**GET**) - Fetches all the URLs saved in the DB
* /api/:shortUrl (**GET**) - Called when Short URL is hit. (In URL bar, usually)
* /api/shorturl (**POST**) - Validates the given URL and generates a short URL then saves it in DB.
