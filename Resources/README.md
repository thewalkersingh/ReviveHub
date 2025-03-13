# ReviveHub Project

## Overview

ReviveHub is a vehicle listing platform where owners can list, manage, and sell vehicles. Users can browse vehicles, book test rides, and access services such as financing, insurance, and documentation.

## Tech Stack

- **Backend:** Java, Spring Boot 3.4.2, PostgreSQL
- **Frontend:** React.js (Vite)
- **Development Tools:** IntelliJ IDEA (Backend), VS Code (Frontend)
- **Hosting (Free Services):**
  - **Backend:** Heroku (Free Tier)
  - **Frontend:** Netlify/Vercel
  - **Database:** PostgreSQL (Local for Development, Heroku for Deployment)
  - **Payments:** Stripe (Test Mode)
  - **Analytics:** Google Analytics

## Project Structure

```
backend/
└── src/main/java/com/revivehub/
    ├── config/          # Security, CORS, DataInitializer, etc.
    ├── controller/      # Controllers: UserController, TestController, VehicleController (Day 3)
    ├── dto/             # API Response DTOs (ApiResponse, ApiErrorResponse, UserRequest)
    ├── exception/       # Global Exception Handling (GlobalExceptionHandler)
    ├── model/           # Entity models: User, Role, RoleType, Vehicle (Day 3)
    ├── repository/      # Repositories: UserRepository, RoleRepository, VehicleRepository (Day 3)
    ├── security/        # JWT and Security (JwtUtils, JwtAuthFilter, UserDetailsImpl, UserDetailsServiceImpl)
    └── service/         # Services: UserService, VehicleService (Day 3)
└── src/main/resources/
    ├── application.yml  # Application configuration
    └── static/          # Static assets

frontend/
└── src/
    ├── api/             # Axios configuration
    ├── components/      # Reusable UI components (Navbar, ProtectedRoute, AdminProtectedRoute)
    ├── context/         # React contexts (AuthContext, AuthProvider)
    ├── pages/           # Pages: Home, Services, About, Contact, Login, Signup, Dashboard, TestRequest, VehicleList (Day 3)
    ├── App.jsx         # Main app entry point
    └── main.jsx        # Application bootstrap


```

```
frontend/
└── src/
    ├── features/
    │   ├── auth/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── AuthContext.jsx
    │   │   ├── AuthProvider.jsx
    │   │   └── authStyles.module.css
    │   ├── vehicles/
    │   │   ├── VehicleList.jsx
    │   │   ├── VehicleCard.jsx       // Optional: A component for individual vehicle cards
    │   │   ├── VehicleDetails.jsx    // Optional: For detailed view
    │   │   └── vehiclesStyles.module.css
    │   ├── services/
    │   │   ├── Services.jsx
    │   │   ├── ServiceRequestForm.jsx
    │   │   └── servicesStyles.module.css
    │   └── dashboard/
    │       ├── Dashboard.jsx
    │       └── dashboardStyles.module.css
    ├── components/    # Shared components used across features
    │   ├── Navbar.jsx
    │   ├── ProtectedRoute.jsx
    │   └── AdminProtectedRoute.jsx
    ├── api/
    │   └── axios.js
    |--- pages
    |   |-- Home.jsx
    |   |-- About.jsx
    |   |-- Contact.jsx
    ├── App.jsx
    └── main.jsx


```

---

## Development Progress

### **✅ Day 1: Project Setup & Initialization**

- **Spring Boot Backend Setup:**
  - Initialized Spring Boot project with PostgreSQL, JPA, and Security.
  - Configured `application.yml` for database connection.
  - Successfully connected Spring Boot to PostgreSQL.
- **React Frontend with Vite:**
  - Created frontend using Vite.
  - Installed `react-router-dom` and `axios`.
  - Set up basic routing with a Home page.
- **Version Control:**
  - Initialized Git repositories for backend and frontend.
  - Pushed code to GitHub.

### **Next Step (Day 2): User Authentication (JWT + Spring Security)**

- Implement **User Authentication** (Signup/Login)
- Configure **Spring Security** (Fix deprecated methods)
- Add **JWT Token Generation & Validation**
- Create **User & Role Entities**

### **Day 2: User Authentication, Exception Handling & API Response Standardization**

- **JWT Authentication & Security:**
  - Implemented JWT generation and validation in `JwtUtils.java`.
  - Configured Spring Security with a custom JWT filter (`JwtAuthFilter.java`).
  - Created user authentication endpoints in `UserController.java` for signup and login.
- **User & Role Management:**
  - Defined `User.java`, `Role.java`, and `RoleType.java`.
  - Implemented repositories for users and roles.
  - **Data Initialization:** Added a `DataInitializer` bean to pre-populate `ROLE_USER` and `ROLE_ADMIN` in the database.
- **Global Exception Handling & Logging:**
  - Created `GlobalExceptionHandler.java` to standardize error responses.
  - Enhanced logging across services (e.g., in `UserService.java`).
- **API Response Standardization:**
  - Created DTO classes (`ApiResponse.java`, `ApiErrorResponse.java`, and `UserRequest.java`) for consistent API responses.
- **Testing JWT Flow:**
  - Developed a dummy protected endpoint (`/api/test`) to verify JWT protection.
  - Successfully tested user signup, login, and JWT-based authentication using Postman.
  

  ### **Day 3: Vehicle Listing API & CRUD Operations (Planned)**

#### **Backend Tasks:**
- **Vehicle Entity:**
  - Create `Vehicle.java` in the `model` package with fields such as id, name, type, price, description, etc.
- **Vehicle Repository & Service:**
  - Implement `VehicleRepository` extending `JpaRepository`.
  - Create `VehicleService` to handle CRUD operations for vehicles.
- **Vehicle Controller:**
  - Develop REST endpoints in `VehicleController.java` for creating, reading, updating, and deleting vehicles.
  - Test these endpoints using Postman.
  
#### **Frontend Tasks:**
- **Vehicle List Page:**
  - Create a new React page (e.g., `VehicleList.jsx`) to display the list of vehicles.
  - Use Axios to fetch vehicle data from the backend.
  - Display vehicles using Material-UI components (e.g., Cards or Tables).
- **Vehicle CRUD Integration (if time permits):**
  - Add forms for adding or editing vehicle information.
  - Set up proper routing to view vehicle details and perform CRUD operations.

  
---

## How to Run Locally

### **Backend**

1. Navigate to the backend folder:
   ```sh
   cd revivehub-backend
   ```
2. Run the Spring Boot application:
   ```sh
   ./mvnw spring-boot:run
   ```

### **Frontend**

1. Navigate to the frontend folder:
   ```sh
   cd revivehub-frontend
   ```
2. Start the React application:
   ```sh
   npm run dev
   ```

The backend runs on `and the frontend on`.

---

## Database Setup (PostgreSQL)

### **Creating Database and User**

```sql
CREATE DATABASE revivehub;
CREATE USER revivehub_user WITH ENCRYPTED PASSWORD 'admin';
ALTER ROLE revivehub_user SET client_encoding TO 'utf8';
ALTER ROLE revivehub_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE revivehub_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE revivehub TO revivehub_user;
```

### **Testing Database Connection**

```sh
psql -U revivehub_user -d revivehub
```

If connected successfully, run `\dt` to check tables.

---

## Deployment Plan (Day 10)

1. Deploy backend to **Heroku**.
2. Deploy frontend to **Netlify/Vercel**.
3. Observe traffic for 15 days before upgrading to production setup.

---

This README will be updated daily with new progress and details. 🚀
