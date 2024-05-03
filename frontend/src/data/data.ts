export const content = [
  {
    text: "Home",
    to: "/",
    data: [
      {
        title: "General",
        content: [
          {
            paragraph: `This is a Node js backend server that uses express. 
              Loads a given CSV to seed the database and allow the user to 
              handle CRUD operations over the auto generated database tables 
              according to the defined models. It also implements a few extra functions 
              to have more control over the general state of the Database (see 'Extra Features' section for more info).`,
          },
          {
            paragraph: `In this case, we're using the given model of the test, this is described
            more detailed on 'Database' section.`,
          },
        ],
      },
      {
        title: "Dependencies",
        content: [
          {
            paragraph: `This server uses the lest dependencies as it can, but as
            certain features of node aren't in LTS yet, there are dependencies that
            are recomended to be as devDependencies but here are normal dependencies
            and they're used in production. The server dependencies are:
            `,
            list: [
              "express: To setup the server.",
              "sequelize: For handling the connection to MSSQL easier.",
              "cors: Allows the CORS.",
              "csv-parser: Facilitates the load of the csv file to an array.",
              "dotenv: Allows the use of env variables.",
              "nodemon: This dependency handles hot reload on file change and keeps up the server.",
              "tedious & mysql2: These are sequelize dependencies to fullfill the needs to connect to MSSQL",
            ],
          },
        ],
      },
      {
        title: "Server architecture",
        content: [
          {
            paragraph: `
            The server implements a Class architecture, where the constructor
            loads the basic needs of itself, as the port, generates the routers, load the middlewares, etc.
            This allow us to manage more instances if they're needed.`,
            image: [
              {
                src: "/server.png",
                alt: "Server diagram.",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: "CRUD",
    to: "/crud",
    data: [
      {
        title: "CRUD Operations",
        content: [
          {
            paragraph: `The server allows the user to handle the basic operations 
            of a CRUD on the Restaurant model as described here. In certain endpoints is
            required a id param, if the id isn't in the request, it will return an error response
            to let know the user that the id is required.`,
          },
        ],
      },
      {
        title: `GET single restaurant`,
        content: [
          {
            paragraph: `Endpint route: /api/restaurant/:id`,
          },
          {
            paragraph: `To select a single restaurant we have to define the id on the route as a param, 
          this will allow the controller to extract this data and use a 'findByPk' method on the
          model to retrieve the data if exists, if it doesn't, it will send a error response.`,
          },
        ],
      },
      {
        title: `GET all restaurants`,
        content: [
          {
            paragraph: `Endpint route: /api/restaurant/all`,
          },
          {
            paragraph: `To select a all the restaurants is way easier, it just do a 
            'findAll' call on the model to retrieve all data of the table. As 
            filtering queries aren't solicitated, they're not implemented, but with
            this architecture, the method 'findAll' can receive the queries that the user
            sets to filter data.`,
          },
        ],
      },
      {
        title: "POST a restaurant",
        content: [
          {
            paragraph: `Endpoint route: /api/restaurant/create`,
          },
          {
            paragraph: `When you are creating a restaurant, at the moment, there are just the 
            database validations, that's why I'm using sequelize too, it allows me to define models
            and within the models it makes easier to handle this validations.`,
          },
          {
            paragraph: `To create a model you just have to send in the body of the request, the
            minimum required data, for this example you need the id, name and rating. If these data isn't
            in the body, the server will retorn an errror response with the validation fails.`,
          },
        ],
      },
      {
        title: "PUT (Update) a restaurant",
        content: [
          {
            paragraph: "Endpoint route: /api/restaurant/update/:id",
          },
          {
            paragraph: `The update is easier, as in the creation it uses the validation of
            the model, but instead of creating and deleting, it uses the 'update' method with the
            'where' query to find the restaurant to update by its id.`,
          },
        ],
      },
      {
        title: "DELETE a restaurant",
        content: [
          {
            paragraph: "Endpoint route: /api/restaurant/delete/:id",
          },
          {
            paragraph: `As in the update, to delete a restaurant you are required to set an id in the 
            request params, then, the server will call the 'destroy' method of the model with the
            'where' query to select the specific restaurant by its id and delete it if it exists.`,
          },
        ],
      },
    ],
  },
  {
    text: "Database",
    to: "/database",
    data: [
      {
        title: "Database instance",
        content: [
          {
            paragraph: `The database used in for the test is an instance of Azure sql server.`,
          },
        ],
      },
      {
        title: "Model sync",
        content: [
          {
            paragraph: `The server makes use of the sync function to create the tables in the
            database according to the models, also, we can set an options object that drops all the 
            tables and regenerate them as brand new on every restart of the server. This allow us to just
            connect to any database server and reduce the configuration and SQL sentences we may have to use.`,
          },
        ],
      },
      {
        title: "Restaurant model",
        content: [
          {
            paragraph: `The server loads the model given (in the test details) of the restaurant.
            The model follows the strcuture: 
            `,
            list: [
              "id: string, primary key, not null, unique",
              "rating: integer, not null, minimum 0 and maximum 4",
              "name: text, not null",
              "site: text",
              "email: text",
              "phone: text",
              "street: text",
              "city: text",
              "state: text",
              "lat: float",
              "lng: float",
            ],
          },
        ],
      },
    ],
  },
  {
    text: "Extra features",
    to: "/extra",
    data: [
      {
        title: "Extra features",
        content: [
          {
            paragraph: `When I was testing the endpoints of the server, I noticed that
            if you wanted to reset or have a little bit more control of the data, you would need
            a few simple endpoints that allows you for example to reset the state of the data
            to it's initial state, these features are shown in this section.`,
          },
        ],
      },
      {
        title: "Reset data state",
        content: [
          {
            paragraph: `If you want to do several requests and when you're done or if you want
          to re do certain queries, you can reset the state of the database by calling the endpoint: /reset with a 'put' request,
          this will drop the current table and load the data of the given csv.`,
          },
        ],
      },
      {
        title: "Load CSV",
        content: [
          {
            paragraph: `If for some situation, you have an empty database or you want to reload the csv data, 
            you can access the endpoint: /api/restaurant/loadCSV with a get request, this will read the csv and
            make a bulkCreate to store all the data.`,
          },
        ],
      },
      {
        title: "Drop table",
        content: [
          {
            paragraph:
              "And, as if for any case, you want to have an empty table, you can call the endpoint: /api/restaurant/drop with a delete request, this will indeed, drop the table and leave it empty.",
          },
        ],
      },
    ],
  },
  {
    text: "Task 2: Statistics",
    to: "/statistics",
    data: [
      {
        title: "Statitstics endpoint",
        content: [
          {
            paragraph: `For the test, I was asked to do a 2nd task that calculates the restaurants that are inside
      of an circle area with the center on certain coordinates. The average rating and Rating standard deviation of those restaurants.`,
          },
          {
            paragraph: `For these functionality I was recomended to use a tool like PostGIS, but as I wasn't using postgress, I looked up for a equivalent, which I did find, 
            and tried to use, but for keeping things simple and more direct, I prefer using the maths that gave me the same results with a new temporary column where that keeps the distance, then
            comparing it with the given radius and filtering the results.`,
            image: [
              {
                src: "/test2queries.png",
                alt: "Statistics query",
              },
            ],
          },
          {
            paragraph: `Once we have the restaurants that are within the radius, we can just loop over and calculate the 
            average rating and rating standard deviation with 2 reduce functions.`,
            image: [
              {
                src: "/avrRating.png",
                alt: "Average rating and Standard Deviation",
              },
            ],
          },
          {
            paragraph:
              "And with this, we can just return the data to the user.",
          },
        ],
      },
    ],
  },
  {
    text: "Repository",
    to: "https://github.com/DEadMan10sds/Backend_Test_EDT",
  },
];
