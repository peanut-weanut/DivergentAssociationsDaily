import dat
import csv
import random

with open("ourwords.txt", "r") as f:
    nouns = [line.strip().lower() for line in f]

print("model running")
model = dat.Model("glove.840B.300d.txt", "words.txt")
print("model done running")
with open("Word Word Word List.csv", 'r', newline = '') as wordslist:
    reader = csv.reader(wordslist)
    rows = list(reader)
    for lines in rows:
        if not lines[1]:
            x = 1
            while x <= 3:
                curattempt = random.choice(nouns)
                if curattempt in model.returnWords():
                    lines[x] = curattempt
                    x += 1

print("done reading and setting up the rows, on to writing")
with open("Word Word Word List.csv", 'w', newline = '') as wordslist:
    writer = csv.writer(wordslist)
    for row in rows:
        writer.writerow(row)
print("done writing, check the csv")
