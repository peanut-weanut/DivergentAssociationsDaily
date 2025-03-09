import DAG_backend

#dates that are supposed to work
assert DAG_backend.getTodaysWords("3/8/2025") == ["minus","year","eclair"], "means that the CSV changed from what it originally was"
assert DAG_backend.getTodaysWords("8/2/2025") == ["sleuth","snug","hill"], "means that the CSV changed from what it originally was"
assert DAG_backend.getTodaysWords("8/27/2025") == ["spume","covey","niece"], "means that the CSV changed from what it originally was"

#dates that dont work
assert DAG_backend.getTodaysWords("2/30/2025") == [], "this date doesnt exist, no reason for it to be here"
assert DAG_backend.getTodaysWords("3/32/2025") == [], "this date doesnt exist, no reason for it to be here"
assert DAG_backend.getTodaysWords("4/31/2025") == [], "this date doesnt exist, no reason for it to be here"
assert DAG_backend.getTodaysWords("2/-1/2025") == [], "this date doesnt exist, no reason for it to be here"

assert DAG_backend.resultScreen(
    ["cheese", "car", "scheme",
     "galaxy", "spy", "mushroom",
     "cream", "philanthropist",
     "murder", "ganja"]) == [['scheme', 'ganja'],
                             ['car', 'philanthropist'],
                             ['galaxy', 'philanthropist']], "something is wrong with the calculation"

