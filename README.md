# Installing and Running NGINX and a Server Application Using Docker

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation and Setup](#installation-and-setup)
    1. [1. Installing Docker](#1-installing-docker)
    2. [2. Running NGINX](#2-running-nginx)
    3. [3. Managing NGINX Containers](#3-managing-nginx-containers)
    4. [4. Building the Docker Image](#4-building-the-docker-image)
    5. [5. Creating a Docker Network](#5-creating-a-docker-network)
    6. [6. Running Backend Applications](#6-running-backend-applications)
    7. [7. Launching the proxy NGINX Container](#7-launching-the-proxy-nginx-container)
    8. [8. Launching the proxy NGINX Container and Backend Applications via Docker Compose](#8-launching-the-proxy-nginx-container-and-backend-applications-via-docker-compose)
    9. [9. Using HTTPS](#9-using-https)

## Prerequisites

- **Docker**: Make sure Docker is installed on your machine. 
- If not, follow the official [Docker installation guide](https://docs.docker.com/get-docker/).

## Installation and Setup

### 1. Installing Docker

If Docker is not yet installed, download and install it by 
following the instructions on the official [Docker website](https://docs.docker.com/get-docker/).

### 2. Running NGINX

Start an NGINX container with port 80 mapped to local port 8070:

```bash
docker run --name nginx-server -p 8070:80 -d nginx:latest
```

### 3. Managing NGINX Containers

Check running containers:

```bash
docker ps
```

To remove an existing NGINX container:

```bash
docker rm -f nginx-server
```

Run a new NGINX container with a mounted local directory for the server:

```bash
docker run --name nginx-server -p 8070:80 -v localpath\nginx\html:/usr/share/nginx/html -d nginx
```

### 4. Building the Docker Image

Create a Docker image for your backend application. Make sure the Dockerfile is in the current directory:

```bash
docker build . --tag=nginx-backend-app:latest
```

### 5. Creating a Docker Network

Create a custom Docker network to enable communication between the backend application containers:

```bash
docker network create nginx-backend-network
```

### 6. Running Backend Applications

Run five instances of your backend application, connected to the created network:

```bash
docker run --network=nginx-backend-network --name backendapp1 -p 8091:8090 --hostname=backendapp1 -d nginx-backend-app
docker run --network=nginx-backend-network --name backendapp2 -p 8092:8090 --hostname=backendapp2 -d nginx-backend-app
docker run --network=nginx-backend-network --name backendapp3 -p 8093:8090 --hostname=backendapp3 -d nginx-backend-app
docker run --network=nginx-backend-network --name backendapp4 -p 8094:8090 --hostname=backendapp4 -d nginx-backend-app
docker run --network=nginx-backend-network --name backendapp5 -p 8095:8090 --hostname=backendapp5 -d nginx-backend-app
```

### 7. Launching the proxy NGINX Container

Launch an additional NGINX container that will use its own configuration file and be connected to the same network:

```bash
docker run --network=nginx-backend-network --name nginx-server -p 8070:8080 -v localpath/nginx.conf:/etc/nginx/nginx.conf -d nginx-backend-app
```

### 8. Launching the proxy NGINX Container and Backend Applications via Docker Compose

Launch a Docker Compose setup with a proxy NGINX container and backend applications on the same network:

```bash
docker-compose up --build
docker-compose down -v
```

### 9. Using HTTPS

Obtain an SSL certificate use docker-compose.https.yml and nginx.https.conf:

```bash
docker-compose down -v
docker-compose up --build
https://localhost:8443
```
