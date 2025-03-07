import dat
from flask import Flask, request, jsonify, make_response
from csv import reader
from datetime import date
import numpy as np #incase I figure out how to send shorts via json instead of the string im sending now

#to run a debug version of this python backend, type
#flask --app examples --debug run
#in the terminal
from flask_cors import CORS

# GloVe model from https://nlp.stanford.edu/projects/glove/
#model = dat.Model("glove.840B.300d.txt", "words.txt")
model = dat.Model("glove.840B.300d.txt", "words.txt")

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
def handleListOfWords():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    
    #print('Received data: ', request.json)
    data = request.get_json()
    #print('test')
    #print('Received data: ', data)
    #if 'data' in data and isinstance(data['data'], list):
    score = model.dat(data)
    response_data = {
        'score': str(score)[:5]
    }
    return jsonify(response_data), 200

@app.route('/', methods=['GET'])
def returnThreeDailyWords():
    app.config['TOGGLE_TITLE'] = not app.config['TOGGLE_TITLE']
    todayswords = []
    with open("Word Word Word List.csv", 'r', newline = '') as file:
        datereader = reader(file)
        for line in datereader:
            if line[0] == date.today().strftime('%-m/%-d/%Y'):
                todayswords.append(line[1])
                todayswords.append(line[2])
                todayswords.append(line[3])
    response = {
        "data" : todayswords,
        "title" : app.config['TOGGLE_TITLE']
    }
    return response