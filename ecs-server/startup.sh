#!/bin/bash

echo "Starting server application..."

# Navigate to the server directory
cd /app/repo/ecs-server

# List contents of directory
echo "Contents of server directory:"
ls -la

# Print Python version
echo "Python version:"
python3 --version

# Run the Flask application with gunicorn
echo "Starting gunicorn..."
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 DAG_backend:app