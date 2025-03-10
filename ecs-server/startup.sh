#!/bin/bash
echo "Hello world"
#This starts the front end
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
command -v nvm
source ~/.nvm/nvm.sh
nvm install --lts
nvm install node
cd /usr/local/app/DivergentAssociationsDaily/web-client || npm run dev &
#This starts the backend

python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
cd /usr/local/app/DivergentAssociationsDaily/ecs-server || pip install -r requirements.txt
cd /usr/local/app/DivergentAssociationsDaily/ecs-server || make runserver &

echo "fart_reverb.mp4"