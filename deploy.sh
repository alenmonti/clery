#!/bin/bash
echo "🚀 Deploying CLÉRY to GitHub Pages..."

# Build del proyecto
echo "📦 Building project..."
npm run build

# Deploy a GitHub Pages
echo "🌐 Deploying to GitHub Pages..."
npm run deploy

echo "✅ Deploy completed!"
echo "🔗 Your app will be available at: https://TU-USUARIO.github.io/catalog-app"
echo ""
echo "Note: GitHub Pages can take a few minutes to update."