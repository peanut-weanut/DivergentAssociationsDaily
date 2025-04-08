import DAG_backend
import dat
import random

def testDates():
    #dates that are supposed to work
    assert DAG_backend.getTodaysWords("3/8/2025") == ["minus","year","eclair"], "means that the CSV changed from what it originally was"
    assert DAG_backend.getTodaysWords("8/2/2025") == ["sleuth","snug","hill"], "means that the CSV changed from what it originally was"
    assert DAG_backend.getTodaysWords("8/27/2025") == ["spume","covey","niece"], "means that the CSV changed from what it originally was"

    #dates that dont work
    assert DAG_backend.getTodaysWords("2/30/2025") == [], "this date doesnt exist, no reason for it to be here"
    assert DAG_backend.getTodaysWords("3/32/2025") == [], "this date doesnt exist, no reason for it to be here"
    assert DAG_backend.getTodaysWords("4/31/2025") == [], "this date doesnt exist, no reason for it to be here"
    assert DAG_backend.getTodaysWords("2/-1/2025") == [], "this date doesnt exist, no reason for it to be here"

def testResult():
    assert DAG_backend.resultScreen(
        ["cheese", "car", "scheme",
        "galaxy", "spy", "mushroom",
        "cream", "philanthropist",
        "murder", "ganja"]) == [['scheme', 'ganja'],
                                ['car', 'philanthropist'],
                                ['galaxy', 'philanthropist']], "something is wrong with the calculation"
    
def testModelFood():
    model1 = dat.Model("glove.6B.300d.txt", "words.txt")
    model2 = dat.Model("glove.42B.300d.txt", "words.txt")
    wordslist = []
    with open("words.txt", "r") as file:
        for word in file:
            wordslist.append(word)
    for _ in range(100):
        comparisonList = [random.choice(wordslist), random.choice(wordslist), random.choice(wordslist), random.choice(wordslist), random.choice(wordslist), 
                          random.choice(wordslist), random.choice(wordslist), random.choice(wordslist), random.choice(wordslist), random.choice(wordslist)]
        print("=====================================")
        print(f"words: {comparisonList}")
        print(f"with 6B 300d and words.txt: + {model1.dat(comparisonList)}")
        print(f"with 840B 300d and with words.txt: {DAG_backend.model.dat(comparisonList)}")
        print(f"with 42B 300d and with words.txt: {model2.dat(comparisonList)}")
        print("=====================================")
    peanlist = "aloe schema silicosis pelagic titty preamble lover".split(" ")
    print(f"with 6B 300d and words.txt: + {model1.dat(peanlist)}")
    print(f"with 840B 300d and with words.txt: {DAG_backend.model.dat(peanlist)}")
    print(f"with 42B 300d and with words.txt: {model2.dat(peanlist)}")

def debugger():
    model = dat.Model("glove.42B.300d.txt", "words.txt")
    print(model.dat("disservice meanwhile consistency besets intratissue bacteriophobiable re-deployed surreptitiousness beaning ableness".split(" ")))
    print(model.dat("slummy conservationists overprealbumination misnoegenesisation auditable outethnozoologication ataxia prostates pitilessnesses psionically".split(" ")))
#testDates()
#testResult()
#testModelFood()
debugger()