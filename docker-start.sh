#!/bin/bash

echo "Starting Support Ticketing System..."

# Build and start containers
docker-compose up --build -d

echo "Waiting for backend to be ready..."
sleep 5

# Seed the database
docker-compose exec backend npm run seed

echo ""
echo "========================================="
echo "Support Ticketing System is running!"
echo "========================================="
echo ""
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:3002"
echo ""
echo "Demo Credentials:"
echo "  Admin: admin@test.com / admin123"
echo "  User:  user@test.com / user123"
echo ""
echo "To view logs: docker-compose logs -f"
echo "To stop:      docker-compose down"
echo ""
