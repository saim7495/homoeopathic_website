#!/bin/bash

# Production build script for HealWell Homeopathy

set -e

echo "🏥 Building HealWell Homeopathy for production..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --only=production

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the application
echo "🏗️  Building application..."
npm run build:prod

# Verify build
echo "✅ Verifying build..."
if [ -d "dist" ] && [ -f "dist/index.html" ]; then
    echo "✅ Build successful!"
    echo "📊 Build size:"
    du -sh dist/
    echo "📁 Build contents:"
    ls -la dist/
else
    echo "❌ Build failed!"
    exit 1
fi

echo "🎉 Production build completed successfully!"