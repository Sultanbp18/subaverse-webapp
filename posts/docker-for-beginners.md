---
title: Docker for Beginners
date: '2024-01-20'
category: Tutorial
description: A step-by-step guide to getting started with Docker
coverImage: https://assets.subaverse.xyz/blogs/docker.png
---

# Docker for Beginners

Docker is one of the most popular tools for containerization. It allows developers to package applications and their dependencies into a single, portable container.

## Why Docker?

- Consistency across environments  
- Faster development cycles  
- Lightweight compared to virtual machines  
- Huge ecosystem of prebuilt images  

## Key Concepts

### Images
An image is a snapshot of your application and its dependencies.  

### Containers
A container is a running instance of an image.  

### Dockerfile
A Dockerfile is a text file that contains instructions for building a Docker image.  

## Example: Building a Simple Docker Image

```dockerfile
# Use Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy files
COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Start the app
CMD ["npm", "start"]
```

## Running Your Container
```bash
docker build -t my-app .
docker run -p 3000:3000 my-app
```

## Next Steps
1. Learn about Docker Compose
2. Explore container orchestration with Kubernetes
3. Push your images to Docker Hub

By the end of this tutorial, you’ll be able to containerize simple applications and run them anywhere.