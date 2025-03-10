FROM python:3.10-slim

WORKDIR /app

# Install git and basic dependencies
RUN apt-get update && \
    apt-get install -y git build-essential && \
    rm -rf /var/lib/apt/lists/*

# Clone the repository
RUN git clone https://github.com/peanut-weanut/DivergentAssociationsDaily.git /app/repo

# Set up the working directory
WORKDIR /app/repo/ecs-server

# Install Python dependencies 
RUN pip install flask flask-cors numpy scipy gunicorn

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=8080

# Expose the port
EXPOSE 8080

COPY startup.sh startup.sh

CMD ["bash","startup.sh"]