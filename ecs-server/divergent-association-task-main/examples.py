import dat
from flask import Flask, request, jsonify
import numpy as np #incase I figure out how to send shorts via json instead of the string im sending now

#to run a debug version of this python backend, type
#flask --app examples --debug run
#in the terminal
from flask_cors import CORS

# GloVe model from https://nlp.stanford.edu/projects/glove/
model = dat.Model("glove.6B.50d.txt", "words.txt")

# Compound words are translated into words found in the model
print(model.validate("cul de sac")) # cul-de-sac

# Compute the cosine distance between 2 words (0 to 2)
print(model.distance("cat", "dog")) # 0.1983
print(model.distance("cat", "thimble")) # 0.8787

# Compute the DAT score between 2 words (average cosine distance * 100)
print(model.dat(["cat", "dog"], 2)) # 19.83
print(model.dat(["cat", "thimble"], 2)) # 87.87

app = Flask(__name__)
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

@app.route('/test', methods=['POST'])
def handleListOfWords():
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    
    print('test')
    print('Received data: ', request.json)
    print('test')
    data = request.get_json()
    print('test')
    print('Received data: ', data)
    #if 'data' in data and isinstance(data['data'], list):
    score = model.dat(data['data'])
    response_data = {
        'score': str(score)[:5]
    }
    return jsonify(response_data), 200
'''
status = False
while status:
    curWordList = []
    for x in range(10):
        curWordList.append(input("\ntype in word nr : " + str(x+1) + "\n"))
    print("\nyour score is: " + str(model.dat(curWordList)))
    print("\n here is how each word related to eachother")
    for word in curWordList:
        for x in range(len(curWordList)):
            print(word + " & " + curWordList[x] + ": " + str(model.dat([word, curWordList[x]], 2)))
    proceed = ""
    while proceed != "y" and proceed != "n":
        proceed = input("do you want to continue?\ny/n\n")
        if proceed == "n":
            status = False
        if proceed == "y":
            status = True
'''