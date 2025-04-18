import dat
from flask import Flask, request, jsonify, make_response, abort
from csv import reader
from datetime import date
import numpy as np #incase I figure out how to send shorts via json instead of the string im sending now
import heapq #for the most unique pairs
import os
import threading

# CORS configuration
from flask_cors import CORS

# GloVe model from https://nlp.stanford.edu/projects/glove/
glove = "glove.42B.300d.txt"
words = "words.txt"
csvals = "word-list-definitions.csv"

glove_path = f"/app/data/{glove}"
words_path = f"/app/data/{words}"
csv_path = f"/app/data/{csvals}"

glove_file = glove_path if os.path.exists(glove_path) else glove
words_file = words_path if os.path.exists(words_path) else words
csv_file = csv_path if os.path.exists(csv_path) else csvals

#make true to enable multithreading for the setup of the model
multithreaded = False
if multithreaded:
    model = None
    modelReady = threading.Event()

    def initializeModel():
        global model
        model = dat.Model(glove_file, words_file)
        modelReady.set()

    initThread = threading.Thread(target=initializeModel)
    initThread.start()
else:
    model = dat.Model(glove_file, words_file)

# Needed functions, modularized so they can be ran on unit tests
def resultScreen(data):
    # Calculate 3 most unique pairs
    wordslist = {}
    if multithreaded:
        modelReady.wait()
    for x, y in ((x, y) for x in range(len(data) - 1) for y in range(x + 1, len(data))):
        if y < 3:
            continue
        score = model.dat([data[x], data[y]], 2)
        wordslist[score] = [data[x], data[y]]
    
    top_scores = heapq.nlargest(3, wordslist.keys())
    pairs = [wordslist[score] for score in top_scores]
    return pairs

def getTodaysWords(today_str):
    todayswords = []
    with open(csv_file, 'r', newline='') as file:
        datereader = reader(file)
        for line in datereader:
            if line[0] == today_str:
                todayswords.append(line[1])
                todayswords.append(line[2])
                todayswords.append(line[3])
                todayswords.append(line[4])
                todayswords.append(line[5])
                todayswords.append(line[6])
                
    return todayswords

app = Flask(__name__)

app.config['TOGGLE_TITLE'] = True

allowed_origins = ["http://localhost:3000", "https://divergent-associations.web.app", "https://its.fool.baby/golden-braid"]

# Get port from environment variable or use 8080 as default
port = int(os.environ.get('PORT', 8080))
CORS(app, resources={
    r"/*": {  # Match all routes
        "origins": allowed_origins,
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False
    }
})

@app.route('/', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    origin = request.headers.get('Origin')
    if origin in allowed_origins:
        response.headers.add('Access-Control-Allow-Origin', origin)
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@app.route('/', methods=['POST'])
def handlePost():
    if request.method == 'OPTIONS':
        return handle_options()
    
    data = request.get_json()
    
    if multithreaded:
        modelReady.wait()
    score = model.dat(data['data'], len(data['data']))
    if score == None:
        abort(400, description = "NoneWord")
    elif data['type'] == 0:
        response_data = {
            'score': int(float(str(score*100)[:5]))
        }
    elif data['type'] == 1:
        pairs = resultScreen(data.get('data'))
        response_data = {
            'score': int(float(str(score*100)[:5])),
            'data': pairs
        }
    return jsonify(response_data), 200

@app.route('/', methods=['GET'])
def returnThreeDailyWords():
    app.config['TOGGLE_TITLE'] = not app.config['TOGGLE_TITLE']
    today = date.today()
    today_str = f"{today.month}/{today.day}/{today.year}"
    response = {
        "data": getTodaysWords(today_str),
        "title": app.config['TOGGLE_TITLE']
    }
    return jsonify(response)

# Add a health check endpoint
@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=port, debug=False)