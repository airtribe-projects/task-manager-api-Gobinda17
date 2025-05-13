# Task Manager API

This is a simple Task Manager API built with Node.js and Express.js. It allows users to manage tasks by performing CRUD operations. The data is stored in memory and is not persisted to a database.

---

## Features
- Get all tasks
- Get a task by ID
- Get tasks by priority level
- Create a new task
- Update an existing task
- Delete a task

---

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd task-manager-api-Gobinda17

2. Install dependencies:
    npm install

3. Start the server in development mode:
    npm run dev
    > **Note**: Ensure that you have Nodemon install in devDependencies.

4. The server will start at http://localhost:3000.


### API Endpoints

1. **Get All Tasks**
   - **URL**: `GET http://localhost:3000/tasks`
   - **Query Parameters**:
     - `completed` (optional): `true` or `false` (filters tasks by completion status)
   - **Response**:
     - **Status**: `200 OK`
     - **Body**:
       ```json
       {
         "tasks": [/* array of tasks */]
       }
       ```

2. **Get a Task by ID**
   - **URL**: `GET http://localhost:3000/tasks/:id`
   - **Path Parameter**:
     - `id`: Task ID
   - **Response**:
     - **Status**: `200 OK` (if found) or `404 Not Found`
     - **Body**:
       ```json
       {
         "task": {/* task object */}
       }
       ```

3. **Get Tasks by Priority Level**
   - **URL**: `GET http://localhost:3000/tasks/priority/:level`
   - **Path Parameter**:
     - `level`: Priority level (e.g., `high`, `medium`, `low`)
   - **Response**:
     - **Status**: `200 OK` (if found) or `404 Not Found`
     - **Body**:
       ```json
       {
         "task": [/* array of tasks with the specified priority */]
       }
       ```

4. **Create a New Task**
   - **URL**: `POST http://localhost:3000/tasks`
   - **Request Body**:
     ```json
     {
       "title": "Task Title",
       "description": "Task Description",
       "priority": "high",
       "completed": false
     }
     ```
   - **Response**:
     - **Status**: `201 Created`
     - **Body**:
       ```json
       {
         "status": "success",
         "message": "Task created successfully",
       }
       ```

5. **Update a Task by ID**
   - **URL**: `PUT http://localhost:3000/tasks/:id`
   - **Path Parameter**:
     - `id`: Task ID
   - **Request Body**:
     ```json
     {
       "title": "Updated Title",
       "description": "Updated Description",
       "priority": "medium",
       "completed": true
     }
     ```
   - **Response**:
     - **Status**: `200 OK` (if updated) or `404 Not Found`
     - **Body**:
       ```json
       {
         "status": "success",
         "message": "Task updated successfully",
       }
       ```

6. **Delete a Task by ID**
   - **URL**: `DELETE http://localhost:3000/tasks/:id`
   - **Path Parameter**:
     - `id`: Task ID
   - **Response**:
     - **Status**: `204 No Content` (if deleted) or `404 Not Found`
     - **Body**:
       ```json
       {
         "status": "success",
         "message": "Task deleted successfully",
       }
       ```


### How to Test the API
 - Using Postman
1. Open Postman.
2. Create a new request.
3. Select the HTTP method (e.g., GET, POST, PUT, DELETE).
4. Enter the API URL (e.g., http://localhost:3000/tasks).
5. Add query parameters, path parameters, or request body as needed.
6. Click Send to execute the request.
7. View the response in the Postman interface.