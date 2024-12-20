﻿# PRODIGY_BD_01  User Management API

A simple REST API built with Node.js and Express to perform CRUD (Create, Read, Update, Delete) operations on user data. The API allows users to be created, retrieved, updated, and deleted, with all data stored in memory.

## API Endpoints

### 1. Create User (POST /users)
Create a new user by providing `name`, `email`, and `age`.

#### Request Body:
```json
{
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 30
}
```

#### Response:
- **201 Created** - Returns the created user object.
- **400 Bad Request** - If required fields are missing or email is invalid.

### 2. Get User by ID (GET /users/:id)
Fetch a user by their unique `id`.

#### Example Request:
```bash
GET /users/123e4567-e89b-12d3-a456-426614174000
```

#### Response:
- **200 OK** - Returns the user object.
- **404 Not Found** - If the user does not exist.

### 3. Update User (PUT /users/:id)
Update a user by `id`. You can update any of the following fields: `name`, `email`, or `age`.

#### Example Request:
```json
{
    "name": "Jane Doe",
    "age": 25
}
```

#### Response:
- **200 OK** - Returns the updated user object.
- **404 Not Found** - If the user does not exist.
- **400 Bad Request** - If the email format is invalid.

### 4. Delete User (DELETE /users/:id)
Delete a user by their unique `id`.

#### Example Request:
```bash
DELETE /users/123e4567-e89b-12d3-a456-426614174000
```

#### Response:
- **200 OK** - Returns a success message.
- **404 Not Found** - If the user does not exist.

### 5. List All Users (GET /users)
Fetch all users stored in the API.

#### Example Request:
```bash
GET /users
```

#### Response:
- **200 OK** - Returns a list of all users.

## Input Validation
- **Email validation**: The API ensures that the email provided follows a proper format using a regular expression.
- **Missing fields**: If any required fields (`name`, `email`, or `age`) are missing in the request body, the API will return a **400 Bad Request** response.

## Running the API

### Prerequisites
Ensure you have **Node.js** installed. If not, you can download it from [nodejs.org](https://nodejs.org/).

### 1. Install Dependencies

Install the required dependencies by running:

```bash
npm install express body-parser uuid
```

### 2. Run the Server

Start the server by running the following command:

```bash
node app.js
```

The server will start and the API will be available at `http://localhost:3000`.

### Example API Usage

1. **Create a User** (POST /users):

   ```bash
   curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name": "John Doe", "email": "john.doe@example.com", "age": 30}'
   ```

2. **Get a User by ID** (GET /users/<user_id>):

   ```bash
   curl http://localhost:3000/users/<user_id>
   ```

3. **Update a User** (PUT /users/<user_id>):

   ```bash
   curl -X PUT http://localhost:3000/users/<user_id> -H "Content-Type: application/json" -d '{"age": 31}'
   ```

4. **Delete a User** (DELETE /users/<user_id>):

   ```bash
   curl -X DELETE http://localhost:3000/users/<user_id>
   ```

5. **List All Users** (GET /users):

   ```bash
   curl http://localhost:3000/users
   ```

## Folder Structure
- app.js           # Main API logic (server and routes)
- package.json     # Project dependencies and scripts
- README.md        # API documentation


https://github.com/user-attachments/assets/57eee8db-88d3-4025-b13a-d9588f91389c

