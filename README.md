# Divergent Associations Daily

A web application that measures your ability to generate unrelated words.

## How to Play

1. The website presents you with 10 text fields
2. Enter words that are as unrelated to each other as possible
   - "Relation" is defined by how frequently words appear near each other in texts
3. Submit your words to receive a calculated score

## Installation and Setup

### Frontend

The frontend is built with JavaScript:

1. Navigate to the frontend folder:
   ```
   cd web-client
   ```

2. Start the development server:
   ```
   npm run dev
   ```

**Requirements:**
- Node.js
- nvm (Node Version Manager)

### Backend

The backend is built with Flask and runs on Gunicorn:

1. Navigate to the backend folder:
   ```
   cd ecs-server
   ```

2. Create a virtual environment and install dependencies:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. Start the server:
   ```
   make runserver
   ```

## Acknowledgements

- **Jay Olsen** (Harvard University) - For creating the dat.py program used to calculate scores
  - [GitHub Repository](https://github.com/jayolson/divergent-association-task)

- **Jeffrey Pennington, Richard Socher, and Christopher D. Manning** - For creating GloVe: Global Vectors for Word Representation
  - [Project Page](https://nlp.stanford.edu/projects/glove/)