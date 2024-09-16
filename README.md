# WTWR (What to Wear?) Back End

[Frontend Repository](https://github.com/moorek11c/se_project_react)

[Backend Repository](https://github.com/moorek11c/se_project_express)

## Description

The WTWR (What to Wear?) back-end project is designed to provide a server for the WTWR application. This server facilitates user management and clothing item management through a RESTful API. Key functionalities include user creation, user deletion, user retrieval, as well as the ability to add, delete, like, and unlike clothing items.

## Features

- **User Management**:

  - Create a new user
  - Delete a user
  - Retrieve all users

- **Clothing Item Management**:
  - Add a new clothing item
  - Delete a clothing item
  - Like a clothing item
  - Unlike a clothing item

## Technologies Used

- **MongoDB**: A NoSQL database used for storing user and clothing item data.
- **Express.js**: A web application framework for Node.js that provides robust routing and middleware capabilities.
- **Error Handling**: Implemented using a custom `errorHandler` middleware in the main entry point to manage and respond to errors effectively.

## Running the Project

To start the server, use the following command:

```bash
npm run start
```
