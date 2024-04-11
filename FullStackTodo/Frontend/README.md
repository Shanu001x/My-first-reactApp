## Simple Todo
This project contains simple TODO application
it has following features

- Anyone Can Create Todo
- Anyone can see their existing Todo
- Anyone can mark a Todo as Done


## How to make
**We are building a complete full stack simple todo application. we are using Node js for backend and React for frontend.**
* First install all dependencies which are neccessary to work with in this project.
* Make a directory in which create two folders. One for frontend "Frontend" and second for backend "Backend".
*  firstly work on backend. go to backend folder and make a project using node. to do this first make sure how many dependencies you are going to work on. 
* Install them. like in this project i am going to use **Express** for backend code, **Zod** for input validation and **mongoDb (mongoose)** for Database.
* Open Your terminal and make sure you are in the backend folder - Run **npm init -y** or **npm init** 
* it asks some few question about your project answer them and whenever it done,  Install dependencies.
* Run **npm install express Zod mongoose**.
* You can check your dependencies on pakage.json file created.
* Now you can start writing your backend Code. 

## Index.js
Now start with writing basic express boilerPlate Code. Add neccessary routes with methods. like in our application we want to access data from database **(get method)** and to show it on frontend , And **(post method)** to post data from frontend to database. And **Put Method** for update existing todo state as completed or Not.

-   We start by importing the necessary modules and variables:
    -   `express`: The core Express.js library for creating the web server.
    -   `{ createTodo, updateTodo }`: These are Zod schema definitions that we'll use for validating the incoming data. They are imported from a separate file called `./types`.
    -   `{ todo }`: This is a Mongoose model for the `todo` collection, imported from the `./db` file.
    -   `cors`: Middleware to enable CORS (Cross-Origin Resource Sharing) for our API.
-   We create an Express app instance and set the port to `3000`.
-   We configure the app to use the `express.json()` middleware to parse incoming JSON data in the request body.
-   We also enable CORS for our API using the `cors()` middleware.

### Post Method 
* In post method usually we are responsible for handling the incoming request of data.  There are several ways to access and process the data sent by the client. we use req.body to handle the requested data from body. 

**POST /todo Route**:

-   When a client makes a POST request to the `/todo` endpoint:
    -   We extract the request body data into the `createPayload` variable.
    -   We then use the `createTodo.safeParse(createPayload)` function to validate the `createPayload` data against a predefined schema.
    -   If the validation fails (i.e., `parsedPayload.success` is `false`), we return a 411 (Length Required) HTTP status code with an error message.
    -   If the validation succeeds, we proceed to create a new todo item in the MongoDB database using the `todo.create()` function. We populate the new todo with the `title`, `description`, and `completed` fields from the validated `createPayload` data.
    -   Finally, we send a JSON response back to the client with a success message indicating that the todo was created.

**GET /todos Route**:

-   When a client makes a GET request to the `/todos` endpoint:
    -   We currently have a placeholder implementation that simply returns an empty array of todos.
    -   In a real-world application, you would likely fetch the actual todos from the MongoDB database using the `todo.find()` function and return them in the response.

**PUT /completed Route**:

-   When a client makes a PUT request to the `/completed` endpoint:
    -   We extract the request body data into the `updatePayload` variable.
    -   We then use the `updateTodo.safeParse(updatePayload)` function to validate the `updatePayload` data against a predefined schema.
    -   If the validation fails (i.e., `parsedPayload.success` is `false`), we return a 411 (Length Required) HTTP status code with an error message.
    -   If the validation succeeds, we update the `completed` field of the todo item in the MongoDB database using the `todo.update()` function.
    -   Finally, we send a JSON response back to the client with a success message indicating that the todo has been marked as completed.

## **db.js**: Database Setup

-   In this file, we define the Mongoose schema for the `todo` model, which includes `title`, `description`, and `completed` fields.
-   We then create a Mongoose model using this schema and export it as the `todo` variable.
-   The MongoDB connection string is hardcoded in this file, but it's recommended to use environment variables or a configuration file to store sensitive information like the database connection details.

## **Types.js**:

-   This file contains the Zod schema definitions for the `createTodo` and `updateTodo` objects.
-   The `createTodo` schema likely defines the expected shape and data types for a new todo item, such as `title` (a string), `description` (an optional string), and `completed` (a boolean).
-   The `updateTodo` schema likely defines the expected shape and data types for updating an existing todo item, such as the `id` (the unique identifier of the todo) and the `completed` field.
-   These schema definitions are then used in the `index.js` file to validate the incoming data from the client before processing the requests.

## **Overall Flow**:

1.  The client makes a POST request to the `/todo` endpoint, sending the data for a new todo item in the request body.
2.  The `index.js` file extracts the request body data into the `createPayload` variable.
3.  The `createTodo.safeParse(createPayload)` function is called to validate the `createPayload` data against the predefined schema in the `Types.js` file.
4.  If the validation is successful, the new todo item is created in the MongoDB database using the `todo.create()` function from the `db.js` file.
5.  If the validation fails, a 411 (Length Required) HTTP status code is returned with an error message.
6.  Similarly, when the client makes a PUT request to the `/completed` endpoint to mark a todo as completed, the `updateTodo.safeParse(updatePayload)` function is used to validate the request body data before updating the todo in the database.
7.  The GET `/todos` route is a placeholder that currently returns an empty array of todos. In a real-world application, this route would fetch the actual todo items from the MongoDB database and return them in the response.

**Potential Improvements**:

-   Consider using environment variables or a configuration file to store sensitive information like the MongoDB connection string, instead of hardcoding it in the `db.js` file.
-   Implement error handling for the MongoDB operations in case of any database-related errors.
-   Add pagination or query parameters to the GET `/todos` route to support fetching a subset of todos rather than returning all of them.
-   Implement authentication and authorization mechanisms to control access to the todo management API.
-   Add more detailed logging and monitoring to the application to aid in debugging and troubleshooting.
