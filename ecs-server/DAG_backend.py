import dat
from flask import Flask, request, jsonify, make_response
from csv import reader
from datetime import date
import numpy as np #incase I figure out how to send shorts via json instead of the string im sending now
import heapq #for the most unique pairs
import PyDictionary

#to run a debug version of this python backend, type
#flask --app examples --debug run
#in the terminal
from flask_cors import CORS

# GloVe model from https://nlp.stanford.edu/projects/glove/
model = dat.Model("glove.6b.50d.txt", "words.txt")

#needed functions, modularized so they can be ran on unit tests

def resultScreen(data): #expects a list and returns a list
    #calculate 3 most unique pairs
    wordslist = {}
    for x, y in ((x, y) for x in range(len(data) - 1) for y in range(x + 1, len(data))):
        score = model.dat([data[x], data[y]], 2)
        wordslist[score] = [data[x], data[y]]
    
    top_scores = heapq.nlargest(3, wordslist.keys())

    pairs = [wordslist[score] for score in top_scores]
    return pairs

def getTodaysWords(today_str): #picks out the three words for today from the CSV
    todayswords = []
    with open("Word Word Word List.csv", 'r', newline = '') as file:
        datereader = reader(file)

        for line in datereader:
            if line[0] == today_str:
                todayswords.append(line[1])
                todayswords.append(line[2])
                todayswords.append(line[3])
    return todayswords

app = Flask(__name__)

app.config['TOGGLE_TITLE'] = True

CORS(app, resources={
    r"/*": {  # Match all routes
        "origins": ["http://localhost:3000"],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"],
        "supports_credentials": False
    }
})

@app.route('/', methods=['OPTIONS'])
def handle_options():
    response = make_response()
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

@app.route('/', methods=['POST'])
def handlePost():
    if request.method == 'OPTIONS':
        handle_options()
    
    data = request.get_json()
    print(data)
    #if 'data' in data and isinstance(data['data'], list):
    score = model.dat(data['data'])
    print(int(float(str(score*100)[:5])))
    if data['type'] == 0:
        response_data = {
            'score': int(float(str(score*100)[:5]))
        }
    if data['type'] == 1:
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
        "data" : getTodaysWords(today_str),
        "title" : app.config['TOGGLE_TITLE']
    }
    return response