FROM ubuntu:latest
WORKDIR /usr/local/app
RUN apt-get -y update
RUN apt-get install -y git
RUN apt-get install -y curl
RUN apt-get install -y python3
RUN apt-get install -y python3-pip
RUN apt install -y python3.12-venv
RUN git clone https://github.com/peanut-weanut/DivergentAssociationsDaily.git

WORKDIR /usr/local/app/DivergentAssociationsDaily/web-client

COPY startup.sh startup.sh

CMD ["bash","./startup.sh"]
