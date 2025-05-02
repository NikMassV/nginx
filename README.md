# Installing and Running NGINX and a Server Application Using Docker

## Table of Contents

1. [Предварительные условия](#предварительные-условия)
2. [Установка и настройка](#установка-и-настройка)
    1. [1. Установка Docker](#1-установка-docker)
    2. [2. Запуск NGINX](#2-запуск-nginx)
    3. [3. Управление Контейнерами NGINX](#3-управление-контейнерами-nginx)

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
docker run --name nginx-server -p 8070:80 -v C:\WS\projects\nginx\html:/usr/share/nginx/html -d nginx
```
