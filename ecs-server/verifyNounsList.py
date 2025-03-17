import csv
import dat

model = dat.Model("glove.42B.300d.txt", "words.txt")

with open("word-list.csv", 'r', newline = '') as wordslist:
    reader = csv.reader(wordslist)
    rows = list(reader)
    for lines in rows:
        for x in range(1, 4):
            if lines[x] not in model.returnWords():
                print(f"this word: {lines[x]} will make the website not work")