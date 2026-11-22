# Robo Workshop

## Overview

Robo Workshop is a full-stack application designed to demonstrate the integration of a backend service with a frontend interface, utilizing MongoDB as the database and Kubernetes for orchestration.

## Project Structure

```
robo-workshop
├── backend
│   ├── src
│   │   └── server.js        # Main entry point for the backend application
│   ├── package.json         # Backend application configuration
│   └── Dockerfile           # Docker instructions for backend
├── frontend
│   ├── src
│   │   └── App.js           # Main component of the frontend application
│   ├── package.json         # Frontend application configuration
│   ├── nginx.conf           # Nginx configuration (static files and /api proxy)
│   └── Dockerfile           # Docker instructions for frontend
├── k8s
│   ├── mongo-secret.yaml    # Kubernetes secret for MongoDB
│   ├── mongo-statefulset.yaml # StatefulSet (with its volume) for MongoDB
│   ├── mongo-service.yaml    # Service configuration for MongoDB
│   ├── backend-deployment.yaml # Deployment configuration for backend
│   ├── backend-service.yaml   # Service configuration for backend
│   ├── frontend-deployment.yaml # Deployment configuration for frontend
│   └── frontend-service.yaml   # Service configuration for frontend
└── README.md                # Project documentation
```

## Getting Started

### Prerequisites

- Node.js 24
- Docker
- Kubernetes (Docker Desktop, Minikube or any other cluster)

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
docker build -t robo-backend:1.0 .
```

#### Frontend

```
cd frontend
docker build -t robo-frontend:1.0 .
```

### Kubernetes Deployment

To deploy the application on a Kubernetes cluster, apply the configurations in the `k8s` directory:

```
   kubectl apply -f k8s/
```

The deployments use the locally built images (`imagePullPolicy: IfNotPresent`). With Docker Desktop (kubeadm cluster), the images built above are directly available to the cluster. With Minikube, load them first:

```
minikube image load robo-backend:1.0
minikube image load robo-frontend:1.0
```

The frontend is then available on the NodePort 31000: http://localhost:31000 with Docker Desktop, or `minikube service robo-frontend-service` with Minikube.

## Acknowledgments

- [Express](https://expressjs.com/) for the backend framework.
- [React](https://reactjs.org/) for the frontend framework.
- [MongoDB](https://www.mongodb.com/) for the database solution.
- [Kubernetes](https://kubernetes.io/) for container orchestration.
