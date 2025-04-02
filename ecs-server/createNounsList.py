import dat
model = dat.Model("glove.42B.300d.txt", "words.txt")
modelWordList = model.returnWords()

with open("CSW.txt", "r") as f2:
    sw = set(line.strip().lower() for line in f2)

wordList = []
with open("ourwords.txt", "w") as f3:
    with open("nouns.txt", "r") as f1:
        for noun in f1:
            if len(noun) > 4 and len(noun) < 8:
                noun = noun.strip().lower()
                if noun in sw: 
                    wordList.append(noun)
    for word in wordList:
        if len(word) > 4 and len(word) < 8:
            word = word.strip().lower()
            if word in sw and word in modelWordList:
                f3.write(word + "\n")