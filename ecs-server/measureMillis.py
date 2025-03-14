import time
import dat
import random

model = dat.Model("glove.42B.300d.txt", "words.txt")

wordlist = []
with open("CSW.txt", "r") as file:
    for word in file:
        wordlist.append(word)

def pickRandom(model, wordlist):
    randwords = []
    for x in range(10):
        randwords.append(random.choice(wordlist))
    for x in range(3,10):
        model.dat(randwords[:x])

def cycle(cycles, words):
    totalTime = 0
    for _ in range(cycles):
        randwords = []
        for x in range(words):
            randwords.append(random.choice(wordlist))
        startTime = time.time()
        model.dat(randwords)
        endTime = time.time()
        totalTime += endTime-startTime
    return totalTime

def measuretime():
    cycles = 1000000
    print(f"3 words {cycles} times: {cycle(cycles, 3)} s")

    print(f"100 words {cycles} times: {cycle(cycles, 100)} s")

    print(f"50 words {cycles} times: {cycle(cycles, 50)} s")

    print(f"25 words {cycles} times: {cycle(cycles, 25)} s")

    print(f"10 words {cycles} times: {cycle(cycles, 10)} s")
    
    print(f"4 words {cycles} times: {cycle(cycles, 4)} s")

measuretime()