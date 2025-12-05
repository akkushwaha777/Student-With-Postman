# Student Management System - Backend API

A RESTful API built with Node.js and Express for managing students, users, and resources with JWT authentication.

## Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB database connection
├── controllers/
│   ├── userController.js     # User operations logic
│   └── resourceController.js # Resource operations logic
├── middleware/
│   └── authMiddleware.js     # JWT authentication middleware
├── models/
│   ├── User.js               # User schema and model
│   └── Resource.js           # Resource schema and model
├── routes/
│   ├── authRoutes.js         # Authentication endpoints
│   ├── resourceRoutes.js     # Resource endpoints
│   └── Userroutes.js         # User endpoints
├── .env                      # Environment variables
├── index.js                  # Application entry point
├── server.js                 # Express server configuration
└── package.json              # Dependencies and scripts
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root of the backend directory with the following variables:
```env
PORT=5000
DB_URI=mongodb://localhost:27017/student_db
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## Running the Server

Start the development server:
```bash
npm start
```

Or use nodemon for automatic restart on file changes:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Health Check
- `GET /` - API status check

### Authentication Routes (`/api/User`)
- `POST /register` - Register a new user
- `POST /login` - User login

### User Routes (`/api/User`)
- `GET /` - Get all users
- `PUT /:id` - Update user profile
- `DELETE /:id` - Delete user account

### Resource Routes (`/api/resources`)
- `GET /` - Get all resources
- `GET /:id` - Get resource by ID
- `POST /` - Create new resource (requires auth)
- `PUT /:id` - Update resource (requires auth)
- `DELETE /:id` - Delete resource (requires auth)

## Environment Variables

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
DB_URI=mongodb://localhost:27017/student_db

# Authentication
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
```

## Dependencies

- **express** - Web framework
- **cors** - Enable CORS
- **dotenv** - Environment variable management
- **mongoose** - MongoDB ODM
- **jsonwebtoken** - JWT authentication
- **bcryptjs** - Password hashing
- **validator** - Input validation

## Middleware

### CORS
Enabled for all routes. Configure in [server.js](server.js) as needed.

### JSON Parser
Configured to handle JSON request bodies.

### Authentication
Protected routes use JWT verification via [authMiddleware.js](middleware/authMiddleware.js).

## Database

MongoDB is used as the primary database. Connection is initialized in [config/db.js](config/db.js).

### Models
- **User** - Stores user accounts and profile information
- **Resource** - Stores educational resources and materials

## Authentication Flow

1. User registers via `POST /api/user/register`
2. User logs in via `POST /api/User/login` (receives JWT token)
3. Include token in `Authorization: Bearer <token>` header for protected routes
4. [authMiddleware.js](middleware/authMiddleware.js) verifies token on protected endpoints
5. User can refresh token via `POST /api/auth/refresh-token`

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Development

For development with auto-reload, ensure nodemon is installed:
```bash
npm install --save-dev nodemon
```

Then add to [package.json](package.json):
```json
"scripts": {
  "start": "node index.js",
  "dev": "nodemon index.js"
}
```
## Base URL
```
http://localhost:5000
```

---

## 1. Authentication Routes (`/api/user`)

### 1.1 User Registration
**Endpoint:** `POST /api/User/register`
http://localhost:5000/api/user/register
**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "Avinsh Kumar",
    "mobile": 9016841444,
    "email": "avinsh@gmail.com",
    "password": "Avinsh4500",
    "address": "Kalol Gandhinagar"
}
```

**Success Response (201):**
```json
{
    "msg": "User registered successfully",
    "user": {
        "id": "6932dfb46fcda95ec45f5439",
        "name": "Avinsh Kumar",
        "email": "avinsh@gmail.com",
        "role": "user"
    }
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "User already exists with this email"
}
```

**curl Example:**
```bash
curl -X POST http://localhost:5000/api/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Avinsh Kumar",
    "mobile": 9016841444,
    "email": "avinsh@gmail.com",
    "password": "Avinsh4500",
    "address": "Kalol Gandhinagar"
}'
```

---

### 1.2 User Login
**Endpoint:** `POST /api/User/login`
http://localhost:5000/api/user/login
**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "email": "avinsh@gmail.com",
    "password": "Avinsh4500"
}
```

**Success Response (200):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzJkZmI0NmZjZGE5NWVjNDVmNTQzOSIsImlhdCI6MTc2NDk0MTg0MiwiZXhwIjoxNzY0OTQ1NDQyfQ.Y04GmsAFkRW84oHfcCV978YqBiPeRU3k19VFSL2dh4w",
    "user": {
        "id": "6932dfb46fcda95ec45f5439",
        "name": "Avinsh Kumar",
        "email": "avinsh@gmail.com",
        "role": "user"
    }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

**curl Example:**
```bash
curl -X POST http://localhost:5000/api/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "avinsh@gmail.com",
    "password": "Avinsh4500"
}'
```
### 1.3 User protected
**Endpoint:** `GET /api/User/protected`
http://localhost:5000/api/User/protected
**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
    "name": "Avinsh Kumar",
    "mobile": 9016841444,
    "email": "avinsh@gmail.com",
    "password": "Avinsh4500",
    "address": "Kalol Gandhinagar"
}
```

**Success Response (200):**
```json
{
    "msg": "Protected data access granted",
    "user": {
        "_id": "6932dfb46fcda95ec45f5439",
        "name": "Avinsh Kumar",
        "mobile": "9016841444",
        "address": "Kalol Gandhinagar",
        "email": "avinsh@gmail.com",
        "role": "user",
        "createdAt": "2025-12-05T13:35:48.296Z",
        "updatedAt": "2025-12-05T13:35:48.296Z",
        "__v": 0
    }
}
```

**Error Response (401):**
```json
{
  "success": false,
  "message": "Server error"
}
```

**curl Example:**
```bash
curl -X POST http://localhost:5000/api/User/protected \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Avinsh Kumar",
    "mobile": 9016841444,
    "email": "avinsh@gmail.com",
    "password": "Avinsh4500",
    "address": "Kalol Gandhinagar"
}'
```

---

## 2. User Routes (`/api/User`)

### 2.1 Get All Users
**Endpoint:** `GET /api/User`

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
[
    {
        "_id": "692ff0e0e7d8c110fcf7e6d3",
        "name": "Kushi kumari",
        "mobile": "9886575758",
        "address": "Kalol Gandhinagar",
        "email": "kushi1@gmail.com",
        "role": "user",
        "createdAt": "2025-12-03T08:12:16.009Z",
        "updatedAt": "2025-12-03T08:12:16.009Z",
        "__v": 0
    },
    {
        "_id": "692ff147e7d8c110fcf7e6d7",
        "name": "Jyoti kumari",
        "mobile": "9016742102",
        "address": "Bihar",
        "email": "jyoti@gmail.com",
        "role": "user",
        "createdAt": "2025-12-03T08:13:59.168Z",
        "updatedAt": "2025-12-03T08:13:59.168Z",
        "__v": 0
    },
    {
        "_id": "692ff176e7d8c110fcf7e6db",
        "name": "Another User",
        "mobile": "9876543211",
        "address": "456 Oak Ave",
        "email": "another@example.com",
        "role": "user",
        "createdAt": "2025-12-03T08:14:46.854Z",
        "updatedAt": "2025-12-03T08:14:46.854Z",
        "__v": 0
    },
    {
        "_id": "692ff19ce7d8c110fcf7e6de",
        "name": "Avinsh",
        "mobile": "9876585211",
        "address": "Ahemdbad",
        "email": "avinsh@example.com",
        "role": "user",
        "createdAt": "2025-12-03T08:15:24.142Z",
        "updatedAt": "2025-12-03T08:15:24.142Z",
        "__v": 0
    },
    {
        "_id": "69300f24856bdeb11e053e91",
        "name": "Amit",
        "mobile": "1234567890",
        "address": "Some Address",
        "email": "a@a.com",
        "role": "user",
        "createdAt": "2025-12-03T10:21:24.027Z",
        "updatedAt": "2025-12-03T10:21:24.027Z",
        "__v": 0
    },
    {
        "_id": "6932dfb46fcda95ec45f5439",
        "name": "Avinsh Kumar",
        "mobile": "9016841444",
        "address": "Kalol Gandhinagar",
        "email": "avinsh@gmail.com",
        "role": "user",
        "createdAt": "2025-12-05T13:35:48.296Z",
        "updatedAt": "2025-12-05T13:35:48.296Z",
        "__v": 0
    }
]
```

**curl Example:**
```bash
curl -X GET http://localhost:5000/api/User \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

### 2.2 Update User
**Endpoint:** `PUT /api/User/:id`

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "name": "Avinsh Kumar",
  "phone": "90168415555"
}
```

**Success Response (200):**
```json
{
    "_id": "6932dfb46fcda95ec45f5439",
    "name": "Avinsh Kumar",
    "mobile": "9016841444",
    "address": "Kalol Gandhinagar",
    "email": "avinsh@gmail.com",
    "password": "$2b$10$DMsTUd7YPLy4Cal7i8A9aOLBjRx6gCahn4ZT66F17KiD82C2uAGLS",
    "role": "user",
    "createdAt": "2025-12-05T13:35:48.296Z",
    "updatedAt": "2025-12-05T14:03:26.308Z",
    "__v": 0
}
```

**curl Example:**
```bash
curl -X PUT http://localhost:5000/api/user/6932dfb46fcda95ec45f5439 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
  "name": "Avinsh Kumar",
  "phone": "90168415555"
}'
```

---

### 2.3 Delete User
**Endpoint:** `DELETE /api/User/:id`

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
    "message": "User successfully removed"
}
```

**curl Example:**
```bash
curl -X DELETE http://localhost:5000/api/user/6932dfb46fcda95ec45f5439 \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
## 3. Resource Routes (`/api/resources`)

### 3.1 Add Resources
**Endpoint:** `POST /api/resources`
**Request Body:**
```json
{
  "title": "My first resource",
  "description": "Sample description",
  "category": "general",
  "status": "active",
  "amount": 1200
}
```
**Success Response (201):**
```json
{
    "message": "Resource created",
    "resource": {
        "title": "My first resource",
        "description": "Sample description",
        "category": "general",
        "status": "active",
        "amount": 1200,
        "createdBy": "6932e7986fcda95ec45f5448",
        "_id": "6932e8e16fcda95ec45f544b",
        "createdAt": "2025-12-05T14:14:57.093Z",
        "updatedAt": "2025-12-05T14:14:57.093Z",
        "__v": 0
    }
}
```

**curl Example:**
```bash
curl -X GET "http://localhost:5000/api/resources"
```

---

### 3.2 Get Resource by ID
**Endpoint:** `GET /api/resources/:id`

**Success Response (200):**
```json
{
    "_id": "6932e8e16fcda95ec45f544b",
    "title": "My first resource",
    "description": "Sample description",
    "category": "general",
    "status": "active",
    "amount": 1200,
    "createdBy": "6932e7986fcda95ec45f5448",
    "createdAt": "2025-12-05T14:14:57.093Z",
    "updatedAt": "2025-12-05T14:14:57.093Z",
    "__v": 0
}
```

**curl Example:**
```bash
curl -X http://localhost:5000/api/resources
```

---

### 3.3 GET Resource
**Endpoint:** `GET /api/resources`

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (201):**
```json
[
    {
        "_id": "6932e8e16fcda95ec45f544b",
        "title": "My first resource",
        "description": "Sample description",
        "category": "general",
        "status": "completed",
        "amount": 1500,
        "createdBy": "6932e7986fcda95ec45f5448",
        "createdAt": "2025-12-05T14:14:57.093Z",
        "updatedAt": "2025-12-05T14:21:25.527Z",
        "__v": 0
    }
]
```
---

### 3.4 Update Resource
**Endpoint:** `PUT /api/resources/:id`

**Request Headers:**
```
Content-Type: application/json
Authorization: Bearer <token>
```

**Request Body:**
```json
{
  "status": "completed",
  "amount": 1500
}
```

**Success Response (200):**
```json
{
    "message": "Updated",
    "resource": {
        "_id": "6932e8e16fcda95ec45f544b",
        "title": "My first resource",
        "description": "Sample description",
        "category": "general",
        "status": "completed",
        "amount": 1500,
        "createdBy": "6932e7986fcda95ec45f5448",
        "createdAt": "2025-12-05T14:14:57.093Z",
        "updatedAt": "2025-12-05T14:21:25.527Z",
        "__v": 0
    }
}
```

**curl Example:**
```bash
curl -X PUT http://localhost:5000/api/resources/6932e8e16fcda95ec45f544b\
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
  "status": "completed",
  "amount": 1500
}'
```

---

### 3.5 Delete Resource
**Endpoint:** `DELETE /api/resources/:id`

**Request Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
    "message": "Deleted"
}
```

**curl Example:**
```bash
curl -X DELETE http://localhost:5000/api/resources/6932e8e16fcda95ec45f544b \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```
---

## HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Successful request |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Access denied |
| 404 | Not Found - Resource doesn't exist |
| 500 | Server Error - Internal error |

---

## Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution:** Ensure token is included in Authorization header and hasn't expired.

### Issue: 400 Bad Request
**Solution:** Verify all required fields are present and correctly formatted.

### Issue: CORS Error
**Solution:** Confirm CORS is enabled in server.js configuration.
