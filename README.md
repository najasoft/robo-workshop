# Robo Workshop

## Overview

Robo Workshop is a full-stack application designed to demonstrate the integration of a backend service with a frontend interface, utilizing MongoDB as the database and Kubernetes for orchestration.

## Project Structure

```
robo-workshop
├── backend
│   ├── src
│   │   ├── server.js        # Main entry point for the backend application
│   │   └── db.js           # Database connection and interactions
│   ├── package.json         # Backend application configuration
│   └── Dockerfile           # Docker instructions for backend
├── frontend
│   ├── src
│   │   └── App.js           # Main component of the frontend application
│   ├── package.json         # Frontend application configuration
│   └── Dockerfile           # Docker instructions for frontend
├── k8s
│   ├── mongo-secret.yaml    # Kubernetes secret for MongoDB
│   ├── mongo-pvc.yaml       # PersistentVolumeClaim for MongoDB
│   ├── mongo-deployment.yaml # Deployment configuration for MongoDB
│   ├── mongo-service.yaml    # Service configuration for MongoDB
│   ├── backend-deployment.yaml # Deployment configuration for backend
│   ├── backend-service.yaml   # Service configuration for backend
│   ├── frontend-deployment.yaml # Deployment configuration for frontend
│   └── frontend-service.yaml   # Service configuration for frontend
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js (version X.X.X)
- Docker
- Kubernetes (Minikube or any other cluster)

### Installation

1. Clone the repository:

   ```
   git clone <repository-url>
   cd robo-workshop
   ```

2. Navigate to the backend directory and install dependencies:

   ```
   cd backend
   npm install
   ```

3. Navigate to the frontend directory and install dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

#### Backend

1. Start the backend server:
   ```
   cd backend
   node src/server.js
   ```

#### Frontend

1. Start the frontend application:
   ```
   cd frontend
   npm start
   ```

### Docker

To build and run the Docker containers for both backend and frontend, use the following commands:

#### Backend

```
cd backend
docker build -t najasoft/robo-backend:latest .
docker push najasoft/robo-backend:latest
```

#### Frontend

```
cd frontend
docker build -t najasoft/robo-frontend:latest .
docker push najasoft/robo-frontend:latest
```

### Kubernetes Deployment

To deploy the application on a Kubernetes cluster, apply the configurations in the `k8s` directory:

```
   kubectl apply -f k8s/
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/) for the backend framework.
- [React](https://reactjs.org/) for the frontend framework.
- [MongoDB](https://www.mongodb.com/) for the database solution.
- [Kubernetes](https://kubernetes.io/) for container orchestration.
