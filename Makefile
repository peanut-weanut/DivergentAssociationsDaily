PROJECT_ID := 
divergent-associations # Replace with your project ID
FRONTEND_DIR := web-client
BACKEND_DIR := ecs-server
BUILD_DIR := $(FRONTEND_DIR)/build

.PHONY: install-deps build deploy clean deploy-functions

install-deps:
    @echo "Installing frontend dependencies..."
    @cd $(FRONTEND_DIR) && npm install
    @echo "Installing backend dependencies..."
    @cd $(BACKEND_DIR) && npm install
    @echo "Installing python backend dependencies..."
    @cd $(BACKEND_DIR) && pip install -r requirements.txt -t $(BACKEND_DIR)/lib

build:
    @echo "Building frontend..."
    @cd $(FRONTEND_DIR) && npm run build

deploy:
    @echo "Deploying to Firebase..."
    @firebase deploy --project $(PROJECT_ID)

clean:
    @echo "Cleaning frontend build directory..."
    @rm -rf $(BUILD_DIR)
    @echo "Cleaning python lib directory..."
    @rm -rf $(BACKEND_DIR)/lib

deploy-functions:
    @echo "Deploying Firebase Functions..."
    @firebase deploy --only functions --project $(PROJECT_ID)

init:
    @echo "Initializing firebase"
    @firebase init