#!/bin/bash

# Deployment script for HealWell Homeopathy

set -e

# Configuration
IMAGE_NAME="healwell-homeopathy"
CONTAINER_NAME="healwell-app"
PORT="3000"

echo "🚀 Deploying HealWell Homeopathy..."

# Build the application
echo "🏗️  Building production image..."
docker build -t $IMAGE_NAME .

# Stop existing container if running
echo "🛑 Stopping existing container..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# Run the new container
echo "▶️  Starting new container..."
docker run -d \
    --name $CONTAINER_NAME \
    --restart unless-stopped \
    -p $PORT:8080 \
    $IMAGE_NAME

# Wait for container to be ready
echo "⏳ Waiting for application to start..."
sleep 10

# Health check
echo "🏥 Performing health check..."
if curl -f http://localhost:$PORT/health > /dev/null 2>&1; then
    echo "✅ Application is healthy!"
    echo "🌐 Application is running at: http://localhost:$PORT"
else
    echo "❌ Health check failed!"
    docker logs $CONTAINER_NAME
    exit 1
fi

echo "🎉 Deployment completed successfully!"