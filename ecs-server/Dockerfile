FROM python:3.9-slim

# Set working directory for the backend
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Clone the repository
RUN git clone https://github.com/peanut-weanut/DivergentAssociationsDaily.git /app/repo

# Set working directory to the backend directory
WORKDIR /app/repo/ecs-server

# Install Python dependencies
RUN pip install --no-cache-dir flask flask-cors numpy gunicorn

# Make sure our application is accessible outside the container
ENV HOST=0.0.0.0
ENV PORT=8080

# Expose the port the app runs on
EXPOSE 8080

# Create a simple startup script
RUN echo '#!/bin/bash\n\
echo "Starting Flask application..."\n\
exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 DAG_backend:app\n'\
> /app/startup.sh && chmod +x /app/startup.sh

# Run the startup script
CMD ["/app/startup.sh"]