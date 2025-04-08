import csv
import nltk
nltk.download('wordnet')

from nltk.corpus import wordnet as wn


with open("word-list.csv", 'r', newline = '') as wordslist:
    reader = csv.reader(wordslist)
    rows = list(reader)
    for lines in rows:
        x = 1
        while x <= 3:
            syns = wn.synsets(lines[x])
            lines.append(syns[0].definition())
            x += 1

print("done reading and setting up the rows, on to writing")
with open("word-list-definitions.csv", 'w', newline = '') as wordslist:
    writer = csv.writer(wordslist)
    for row in rows:
        writer.writerow(row)
print("done writing, check the csv")