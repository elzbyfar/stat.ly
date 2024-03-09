# Power Dash

This is a Full Stack Application to to visualize power data produced by heavy machinary. 

## Setup

- Clone/Fork repo containing both /backend and /dashboard directories
- cd into /backend directory
  - Make a .env file in the root of backend directory (contact luis.alejo.codes@gmail.com for the ```MONGO_ATLAS_URI``` private key)
  - From backend directory, run ```npm install```
  - Start server by running ```node server.js```
- cd into /dashboard
  - run ```npm install```
  - run ```npm run dev```
 
- Open browswer to https://localhost:3001 (or whatever the frontend defaults to for you)

## Backend

This NodeJS / Express app interacts with a MongoDB Atlas database.


## Frontend

The Frontend is a NextJS/TypeScript App styled with TailwindCSS. 
