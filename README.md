Sure, here's the complete `README.md` content:

```markdown
# Supply Chain Full Stack Application

This project is a full-stack application that includes a backend API built with FastAPI and a frontend application built with React. The application uses Docker and Docker Compose for containerization.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
  - [Clone the Repository](#clone-the-repository)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
  - [Docker Setup](#docker-setup)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Additional Notes](#additional-notes)

## Prerequisites

- Docker Desktop installed
- Node.js and npm installed
- Python installed

## Setup Instructions

### Clone the Repository

```sh
git clone https://github.com/MAURYA2609/supply-chain-full-stack-maurya-patel.git
cd supply-chain-full-stack-maurya-patel
```

### Backend Setup

Navigate to the `backend` directory and install the dependencies.

```sh
cd backend
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
```

### Frontend Setup

Navigate to the `frontend` directory and install the dependencies.

```sh
cd ../frontend
npm install
```

### Docker Setup

Ensure Docker Desktop is running. Create the following `Dockerfile` in the `backend` and `frontend` directories if not already present.

#### `backend/Dockerfile`

```dockerfile
# Use the official Python image as a base image
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install the required Python packages
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

# Expose the port that FastAPI runs on
EXPOSE 8000

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### `frontend/Dockerfile`

```dockerfile
# Use the official Node.js image as a base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the required Node packages
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image to serve the React app
FROM nginx:alpine

# Copy the build files from the previous stage
COPY --from=0 /app/build /usr/share/nginx/html

# Expose the port that Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose Setup

Create a `docker-compose.yml` file in the root directory if not already present.

```yaml
version: '3.9'

services:
  backend:
    build:
      context: ./backend
    container_name: backend
    ports:
      - "8000:8000"
    volumes:
      - ./backend:/app
    networks:
      - app-network

  frontend:
    build:
      context: ./frontend
    container_name: frontend
    ports:
      - "3000:80"
    volumes:
      - ./frontend:/app
    networks:
      - app-network

networks:
  app-network:
    driver: bridge
```

## Running the Application

### Using Docker Compose

To build and run the application using Docker Compose:

```sh
docker-compose up --build
```

### Manually

If you prefer to run the applications without Docker:

#### Run the Backend

```sh
cd backend
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
uvicorn main:app --host 0.0.0.0 --port 8000
```

#### Run the Frontend

```sh
cd ../frontend
npm start
```

## API Endpoints

- **Get all companies**: `GET /companies`
- **Get company details by ID**: `GET /companies/{company_id}`
- **Get all locations for a specific company ID**: `GET /companies/{company_id}/locations`

## Additional Notes

- Ensure Docker Desktop is running before using Docker Compose.
- Make sure the backend and frontend are properly connected by updating the API URLs if necessary.
- For development purposes, you can use `docker-compose down` to stop the containers and `docker-compose up --build` to rebuild and restart them.
