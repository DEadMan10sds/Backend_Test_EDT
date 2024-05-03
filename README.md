## EDT Backend test - Adán Sánchez

This is the repo for the Backend test of EDT received on thursday 02, May, 2024.

The repo consists in a Nodejs server that connects to a mssql and loads a
given csv file to a table. It allows the user to manage CRUD operations,
reset the state of the backend and handle a specific task described down.

This backend is deployed in Render.

## Online Server: https://backend-test-edt.onrender.com

## Local Installation

- Download or clone the repo
- Open terminal in the repo folder
- Run "npm install" to install dependencies
- Create a .env fill with the structure of the .env.example file
- Populate the .env file
- Run "npm run dev" to start the server
- Check the health route to confirm everything is correct

## Documentation

The documentation is developed in React with TypeScript, there you can download
the postman collection to load them into postman and test the endpoints.

For more information contact: adan.sanchez@proton.me

## Task descriptions

Task 1

The first task consists in importing the raw data into a relational database and exposing a REST API that implements CRUD (Create, Read, Update, Delete) operations.

The Restaurants table needs to have the following schema:

Restaurants (

id TEXT PRIMARY KEY, -- Unique Identifier of Restaurant

rating INTEGER, -- Number between 0 and 4

name TEXT, -- Name of the restaurant

site TEXT, -- Url of the restaurant

email TEXT,

phone TEXT,

street TEXT,

city TEXT,

state TEXT,

lat FLOAT, -- Latitude

lng FLOAT) -- Longitude

You can find the CSV with the raw data at the following link (it contains dummy data): https://recruiting-datasets.s3.us-east-2.amazonaws.com/restaurantes.csv

Task 2

The second task consists in implementing the following endpoint:

/restaurants/statistics?latitude=x&longitude=y&radius=z

It receives a latitude and a longitude as parameters, which correspond to the center of a circle, and a third parameter that corresponds to a radius in METERS.

- Hint: A tool like PostGIS or equivalent may help you with the spatial queries ;)

This endpoint needs to return a JSON with the following data:

{

count: Count of restaurants that fall inside the circle with center [x,y] and radius z,

avg: Average rating of restaurant inside the circle,

std: Standard deviation of rating of restaurants inside the circle

}
