run:
	python3 examples.py

install: glove.840B.300d.txt
	pip3 install --user numpy scipy

glove.840B.300d.txt:
	# Download from Stanford NLP GloVe page (Pennington et al.)
	wget https://nlp.stanford.edu/data/glove.840B.300d.zip && \
		unzip glove.840B.300d.zip

glove.twitter.27B.txt:
	wget https://nlp.stanford.edu/data/glove.twitter.27B.zip && \
		unzip glove.twitter.27B.zip

words.txt:
	# Requires unmunch from hunspell-tools and language files (.dic and .aff) from
	# https://cgit.freedesktop.org/libreoffice/dictionaries/tree/en
	for lang in AU CA GB US; do unmunch en_$$lang.dic en_$$lang.aff; done | \
		grep '^[a-z][a-z-]*[a-z]$$' | \
		sort -u > $@

.PHONY: run
.PHONY: install

devserver:
	flask --app DAG_backend --debug run

runserver:
	gunicorn -w 4 -b 0.0.0.0:5000 DAG_backend:app

rendertest:
	glove.twitter.27B.txt
	runserver

fromscratch:
	make install
	make runserver