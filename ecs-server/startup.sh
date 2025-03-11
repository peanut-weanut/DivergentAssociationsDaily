#!/bin/bash
#This starts the backend

python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
make runserver &

echo "fart_reverb.mp4"