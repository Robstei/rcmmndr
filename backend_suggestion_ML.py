import sklearn
import pandas as pd
import numpy as np


#Daten einlesen
filename = "database_songs.csv"

data = pd.read_csv(filename, sep="\t")

print(data)

data = data.dropna()

""" Idee!
    Bewertungssystem mit Likert-Skala
    Genau, was ich will -> klingt gut -> ist okay -> bitte nicht -> auf keinen Fall
    1 -> 0,5 -> 0 -> -0,5 -> -1
    Target = 1
    KnearstNeigbhor
    Eventuell ein Boost System, nach unüberwachten ML schauen
    Parameter hinzufügen, ob die Playlist gut war oder nicht
    maybe aus den Nutzerdaten -> Viel geskippt -> nur kurz gehört -> Bewertung 0-1
    Wie speichern wir Playlists ab???

    TYPE = Song -> parameter, in welcher Playlist, der Song vorkommt. 
    TYPE = Playlist -> Anzahl Songs, Userbewertung, SOng ID -> Angegebene Parameter
    Übergabe an ML -> Target Song Parameter

"""
