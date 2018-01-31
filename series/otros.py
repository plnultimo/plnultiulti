from nltk.corpus import wordnet as wn
import nltk

for synset in wn.synsets('dog'):
    for lemma in synset.lemmas():
        print(        lemma.name())