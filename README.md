# tacniqueAssignment


# Task Management API
#### This is a RESTful API for managing tasks and user authentication built with Node.js, Express.js, and MongoDB.

## User Routes
#### User Registration
#### User Login
## Table of Contents
#### Task Routes
#### Create a New Task
#### Retrieve All Tasks
#### Retrieve a Specific Task
#### Update a Task
#### Delete a Task



# User Routes
## User Registration
### Endpoint: POST     /users/register

### Request Body:
{
  "name": "User Name",
  "email": "user@example.com",
  "password": "user_password"
}

### Response:
{
  "message": "User registered successfully!"
}


## User Login

### Endpoint: POST   /users/login

### Request Body:  
{
  "email": "user@example.com",
  "password": "user_password"
}


### Response:
{
  "message": "Login successful!",
  "token": "user_token"
}
### provide token into headers

# Task Routes

## Create a New Task

### Endpoint: POST /tasks

#### Request Body:
{
  "title": "Task Title",
  "description": "Task Description",
}

#### Response:
{
  "message": "Task created successfully!",
  "task": {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "creation_date": "timestamp",
    "userEmail": "user@example.com"
  }
}


### Retrieve All Tasks

### Endpoint: GET /tasks 


### Response:
[
  {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "creation_date": "timestamp",
    "userEmail": "user@example.com"
  },
  {
    "_id": "task_id",
    "title": "Task Title",
    "description": "Task Description",
    "creation_date": "timestamp",
    "userEmail": "user@example.com"
  }
]


### Retrieve a Specific Task

### Endpoint: GET /tasks/:id

### Response:
{
  "_id": "task_id",
  "title": "Task Title",
  "description": "Task Description",
  "creation_date": "timestamp",
  "userEmail": "user@example.com"
}

## Update a Task

### Endpoint: PUT /tasks/:id

### Request Body:
{
  "title": "Updated Task Title",
  "description": "Updated Task Description",
  "status": "completed",
}

### you can update title,description and status individually also 


### Response:
{
  "message": "Task updated successfully!"
}


## Delete a Task

### Endpoint: DELETE /tasks/:id


### Response:

{
  "message": "Task deleted successfully!"
}


# Environment Variables


* tokenKey: Secret key used for JWT token generation.
* dbUrl: url for connect from database
* PORT: 8080

# How to Run
#### Clone the repository: git clone https://github.com/your-username/your-repository.git
#### Install dependencies: npm install
#### Set environment variables in a .env file.
#### Start the server: npm run start