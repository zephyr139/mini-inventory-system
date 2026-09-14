# Mini Inventory System

A simple full-stack inventory application for creating, viewing, editing, and deleting products. The backend is built with Spring Boot and PostgreSQL, and the frontend is built with React and Vite.

## Source code: https://github.com/zephyr139/mini-inventory-system.git

## VIDEO (CODING): https://youtu.be/IA0u2lp48t4

## VIDEO (PRESENTATION): https://youtu.be/n1AwEoIPLgc

## How to Run the Project

### Run with Docker

Make sure Docker is installed and running, then start all services from the project root:

```bash
docker compose up --build
```

Open the frontend in the browser:

```text
http://localhost:5173
```

The backend API runs on:

```text
http://localhost:8080
```

The PostgreSQL database is exposed on the host at port `5436`.

### Run Locally Without Docker

Start PostgreSQL first and create a database named `system-inventory` with:

- username: `postgres`
- password: `secret`
- port: `5432`

Run the backend:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows PowerShell:

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

Run the frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

## Technologies Used

- Java 21
- Spring Boot
- Spring Web MVC
- Spring Data JPA
- Jakarta Validation
- PostgresSQL
- Maven
- React
- Vite
- JavaScript
- CSS
- Docker
- Docker Compose

## API Endpoints

Base URL:

```text
http://localhost:8080
```

| Method   | Endpoint         | Description           |
|----------|------------------|-----------------------|
| `GET`    | `/products`      | Get all products      |
| `POST`   | `/products`      | Create a new product  |
| `PATCH`  | `/products/{id}` | Update product fields |
| `DELETE` | `/products/{id}` | Delete a product      |

### Example Product Request

```json
{
  "name": "Keyboard",
  "description": "Mechanical keyboard",
  "quantity": 10,
  "price": 49.99
}
```

The product status is calculated automatically:

- `IN_STOCK` when quantity is greater than `5`
- `LOW_STOCK` when quantity is between `1` and `5`
- `OUT_OF_STOCK` when quantity is `0`

## Database Description

The project uses PostgresSQL as the database. Hibernate/JPA creates and updates the database table automatically using:

```yaml
spring.jpa.hibernate.ddl-auto: update
```

The main table is `products`.

| Column        | Type        | Description                             |
|---------------|-------------|-----------------------------------------|
| `id`          | Long        | Primary key, auto-generated             |
| `name`        | String      | Product name, required                  |
| `quantity`    | Integer     | Product quantity, required              |
| `price`       | Decimal     | Product price, required                 |
| `status`      | Enum/String | Automatically calculated stock status   |
| `description` | String      | Optional product description            |
| `created_at`  | Timestamp   | Created automatically before saving     |
| `updated_at`  | Timestamp   | Updated when product fields are changed |

Docker Compose creates a PostgresSQL container with:

- database: `system-inventory`
- username: `postgres`
- password: `secret`
- container port: `5432`
- host port: `5436`

## Docker Description

The project contains a `docker-compose.yaml` file that starts three services:

- `postgres`: PostgresSQL 18 database with a persistent Docker volume
- `backend`: Spring Boot API built from `backend/Dockerfile`
- `frontend`: React/Vite app built from `frontend/Dockerfile`

The backend Docker image is built in two stages:

1. Maven builds the Spring Boot JAR.
2. Eclipse Temurin JRE runs the generated JAR on port `8080`.

The frontend Docker image uses Node.js, installs npm dependencies, and starts Vite on port `5173`.

## What Is Completed

- Spring Boot backend project setup
- Product entity, repository, service, and controller
- Product create, read, update, and delete operations
- Request validation for product creation
- Automatic product status calculation
- PostgresSQL database connection
- React frontend project setup
- Product form for adding products
- Product table for displaying products
- Edit product functionality
- Delete product functionality
- Dockerfiles for backend and frontend
- Docker Compose setup for frontend, backend, and database

## What Is Not Completed

- User authentication and authorization
- Advanced search, filtering, and sorting
- Pagination
- Image upload for products
- Detailed error messages in the frontend
- Full automated test coverage
- Production deployment configuration
- OpenAPI functional (using `Swagger`)
- Basic security (login system, JWT, CSRF protection)
- ResponseProductDTO

## AI Usage Report

- AI tool used: ChatGPT / Codex
- What I used AI for: Project planning, backend structure suggestions, frontend CRUD implementation help, Docker setup guidance, debugging support, and README generation.
- Example prompts:
  - "Generate a Spring JPA entity - "Product". With corresponding fields: id - identity name quantity price status - '@Enumerized', createdAt - LocalDateTime, Lombok annotations included."
  - "Generate me a Response entity which will include name, quantity price and status; use basic Validation annotations"
  - "Generate simple but consistent design for the given react code using css"
  - "Generate simple Dockerfiles for ./backend (Temurin 21, Maven 3.9) skippping tests, and for the frontend, generate a Node 22 Dockerfile. in a docker give me a temlate for a docker compose with this docker components + postgre latest setup"
- What I changed manually: I reviewed and adjusted the generated code, connected the frontend to the backend API, changed field names and validation rules, tested the CRUD flow, and updated project-specific configuration.
- What was difficult: Connecting all services correctly with Docker, matching frontend requests to backend endpoints, handling product updates, and making sure the database connection worked in both local and Docker environments.

## Recording Requirement

The development recording should show the following parts of the project:

- Project setup
- AI usage
- Backend implementation
- Database setup
- Frontend implementation
- Docker setup
- Running the project
- Creating a product
- Editing a product
- Deleting a product
- Short explanation of the project structure

The video does not need to be one continuous recording. It can be paused and resumed while developing.

## Project Structure

```text
mini-inventory-system/
├── backend/
│   ├── src/main/java/com/training/backend/
│   │   ├── controllers/
│   │   ├── dtos/
│   │   ├── model/
│   │   ├── repositories/
│   │   └── services/
│   ├── src/main/resources/application.yaml
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yaml
└── README.md
```
