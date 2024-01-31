def load_dict(file_name):
    with open(file_name, 'r') as file:
        return [line.strip() for line in file]

def wagner_fischer(s1, s2):
    len_s1, len_s2 = len(s1), len(s2)
    if len_s1 > len_s2:
        s1, s2 = s2, s1
        len_s1, len_s2 = len_s2, len_s1
    
    curr_row = range(len_s1 + 1)
    for i in range(1, len_s2 + 1):
        prev_row, curr_row = curr_row, [i] + [0] * len_s1
        for j in range(1, len_s1 + 1):
            add, delete, change = prev_row[j] + 1, curr_row[j-1] + 1, prev_row[j-1]
            if s1[j-1] != s2[i-1]:
                change += 1
            curr_row[j] = min(add, delete, change)
    
    return curr_row[len_s1]

def check_spelling(word, dictionary):
    suggestions = []

    for correct_word in dictionary:
        distance = wagner_fischer(word, correct_word)
        suggestions.append((correct_word, distance))
    
    suggestions.sort(key = lambda x: x[1])

    return suggestions