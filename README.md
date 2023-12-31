# Backend Server for User Management System

This repository contains the backend server for a user management system. The server is built using Express.js and MongoDB.

## Prerequisites

Before you can run the server, you will need to install the following dependencies:

-   Node.js
-   yarn
-   MongoDB

## Installation

To install the dependencies, run the following commands in your terminal:

```
yarn add
```

## Configuration

The server can be configured by editing the `config.js` file. The following options are available:

-   `server.port`: The port on which the server will listen.
-   `database.url`: The URL of the MongoDB database.

## Running the Server

To run the server, run the following command in your terminal:

```
yarn start
```

## API

The server provides the following API endpoints:

-   `/`: Returns a JSON object with the status of the server.
-   `/api/user`: CRUD operations for users.

## Error Handling

The server uses Express.js's built-in error handling middleware to handle errors. Errors are logged to the console and a JSON object with the error message is returned to the client.

## Code Explanation

### 1. Import the necessary modules.

```javascript
import bodyParser from 'body-parser';
import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';
import cors from 'cors';
import { userRoutes } from './routes';
import { config, logging } from './config';
```

### 2. Create an Express router.

```javascript
const router = express();
```

### 3. Enable CORS.

```javascript
router.use(cors());
```

### 4. Connect to the MongoDB database.

```javascript
mongoose
    .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
        console.log('Connected to MongoDB');
        let port: string | number = config.server.port;
        if (port == null || port == '') {
            port = 8000;
        }
        router.listen(port, () => {
            console.log(`Backend is running: ${port}`);
        });
    })
    .catch((err) => console.log(err));

```
