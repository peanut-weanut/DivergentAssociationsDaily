import dat
import csv
import random

def main():
    print("model running")
    model = dat.Model("glove.840B.300d.txt", "words.txt")
    print("model done running")
    with open("Word Word Word List.csv", 'r', newline = '') as wordslist:
        reader = csv.reader(wordslist)
        rows = list(reader)
        for lines in rows:
            if not lines[1]:
                lines[1] = random.choice(list(model.returnWords()))
                lines[2] = random.choice(list(model.returnWords()))
                lines[3] = random.choice(list(model.returnWords()))
    
    print("done reading and setting up the rows, on to writing")
    with open("Word Word Word List.csv", 'w', newline = '') as wordslist:
        writer = csv.writer(wordslist)
        for row in rows:
            writer.writerow(row)
    print("done writing, check the csv")

main()