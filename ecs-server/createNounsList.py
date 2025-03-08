with open("CSW.txt", "r") as f2:
    sw = set(line.strip().lower() for line in f2)

with open("ourwords.txt", "w") as f3:
    with open("nouns.txt", "r") as f1:
        for noun in f1:
            if len(noun) > 4 and len(noun) < 8:
                noun = noun.strip().lower()
                if noun in sw: 
                    f3.write(noun + "\n")