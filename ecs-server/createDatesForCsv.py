import csv
import random

with open("ourwords.txt", "r") as f:
    nouns = [line.strip().lower() for line in f]

with open("word-list.csv", 'r', newline = '') as wordslist:
    reader = csv.reader(wordslist)
    rows = list(reader)
    for lines in rows:
        if not lines[1]:
            x = 1
            while x <= 3:
                lines[x] = random.choice(nouns)
                x += 1

print("done reading and setting up the rows, on to writing")
with open("word-list.csv", 'w', newline = '') as wordslist:
    writer = csv.writer(wordslist)
    for row in rows:
        writer.writerow(row)
print("done writing, check the csv")