import numpy as np
import pandas as pd # später switch to Polars -> kann größe Datensätze besser handlen -> long term
import spotipy
import time
from spotipy.oauth2 import SpotifyOAuth

# Set up your Spotify API credentials and redirect URI
client_id = 'd99805bbbc2e40518808f5f98428f59e'      # Austausch durch Variable -> Übergabe parameter
client_secret = '6fe0ddaf7d14459da45afacf2603ef3e'  # Austausch durch Variable -> Übergabe parameter
redirect_uri = 'http://localhost:3000/api/callback'  # This should match the URI specified in your Spotify Developer Dashboard
                                                                                                                                                        
                                                                                                                                                      
    # Klappt parallel zur Web SDK Player
    # Authenticate with Spotify API using OAuth2
scope = 'user-read-currently-playing user-library-read'  # Add any additional scopes required
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id=client_id, client_secret=client_secret, redirect_uri=redirect_uri, scope=scope))

def write_database():

# Retrieve the currently playing track
    current_track = sp.currently_playing()

    
    #Read Data
    data = pd.read_csv("database_songs.csv")

    # get Basis Infos über den Song zum abgleichen der Datenbank, ob der SOng bereits in der Datenbank vorhanden ist.  track_id wird benötigt, um die anderen Parameter abzurufen 
    if current_track is not None:
        track_name = current_track['item']['name']
        artists = [artist['name'] for artist in current_track['item']['artists']]
        album = current_track['item']['album']['name']
        track_id = current_track['item']['id']
        track_info = sp.track(track_id)


        # Print die information  CHECK UP
        print("Current Track: ", track_name)
        print("Artists: ", ", ".join(artists))  
        print("Album: ", album)
    else:
        print("No track is currently playing.")


    if track_id in data['track_id'].values:          
        print("\nDer Track ist bereits in der Datenbank\n")
    else:
        audio_features = sp.audio_features(track_id)        # Abrufen der Audio Features -> Overall Track analyse 
        audio_analysis = sp.audio_analysis(track_id)        # Abrufen der Section features -> Features der Signifikanten Stelle
        sections = audio_analysis['sections']
        sig_sec = sections[1]

        data_current = pd.DataFrame({
                            'track_id':[track_id],
                            'title':[track_name],
                            'artist':[artists],
                            'album':[album],
                            'genres':[sp.recommendation_genre_seeds()],
                            'release_date':[track_info['album']['release_date']],
                            'acousticness': [audio_features[0]['acousticness']],
                            'danceability':[audio_features[0]['danceability']],
                            'energy':[audio_features[0]['energy']],
                            'instrumentalness':[audio_features[0]['instrumentalness']],
                            'key':[audio_features[0]['key']],
                            'speechiness':[audio_features[0]['speechiness']],
                            'tempo':[audio_features[0]['tempo']],
                            'valence':[audio_features[0]['valence']],
                            'sec1_tempo':[sig_sec['tempo']],                            # SECTIONS PARAMETER weiter hinzufügen. Datenbank erweitern, deklarieren als Funktion, Übergabeparameter schaffen(falls welche gebraucht werden). 
                            'sec1_tempo_confidence':[sig_sec['tempo_confidence']],
                            'sec1_key':[sig_sec['key']],
                            'sec1_key_confidence':[sig_sec['key_confidence']],
                            'sec1_mode':[sig_sec['mode']],
                            'sec1_mode_confidence':[sig_sec['mode_confidence']],
                            'sec1_duration':[sig_sec['duration']],
                            'sec1_start':[sig_sec['start']],
                            })
        
        data = pd.concat([data, data_current], ignore_index=True)   # Zusammenfügen der beiden DataFrames
        data.to_csv('database_songs.csv', index = False)    #Save

        ausgabe = True          # True -> printen der Datenbank , false -> nichts printen
        if ausgabe == False:
            print(data,"\n\n\n")
            print(data.info(), "\n\n\n")
            print(data.describe(),"\n\n\n")

        else:
            print("\n\n")

def get_liked_songs():
    results = sp.current_user_saved_tracks()
    track_id = []
     # Iteration durch die Ergebnisse und Ausgabe der Songdetails
    for item in results['items']:
        track_id_temp = item['track']['id']
        track_id.append(track_id_temp)
    
    print(track_id)
        
    return (track_id)
    

def write_multiple_songs(song_array):
    database = pd.read_csv("database_songs.csv")

    for track in song_array:
        track_id = sp.track(track)
        
    if track_id in database['track_id'].values:          
        print("\nDer Track ist bereits in der Datenbank\n")
    else:
        track_info = sp.track(track_id)
        audio_features = sp.audio_features(track_id)        # Abrufen der Audio Features -> Overall Track analyse 
        audio_analysis = sp.audio_analysis(track_id)        # Abrufen der Section features -> Features der Signifikanten Stelle
        sections = audio_analysis['sections']
        sig_sec = sections[1]

        data_current = pd.DataFrame({
                            'track_id':[track],
                            'title':[track_id['item']['name']],
                            'artist':[artist['name'] for artist in track_id['item']['artists']],
                            'album':[track_id['item']['album']['name']],
                            'genres':[sp.recommendation_genre_seeds()],
                            'release_date':[track_info['album']['release_date']],
                            'acousticness': [audio_features[0]['acousticness']],
                            'danceability':[audio_features[0]['danceability']],
                            'energy':[audio_features[0]['energy']],
                            'instrumentalness':[audio_features[0]['instrumentalness']],
                            'key':[audio_features[0]['key']],
                            'speechiness':[audio_features[0]['speechiness']],
                            'tempo':[audio_features[0]['tempo']],
                            'valence':[audio_features[0]['valence']],
                            'sec1_tempo':[sig_sec['tempo']],                            # SECTIONS PARAMETER weiter hinzufügen. Datenbank erweitern, deklarieren als Funktion, Übergabeparameter schaffen(falls welche gebraucht werden). 
                            'sec1_tempo_confidence':[sig_sec['tempo_confidence']],
                            'sec1_key':[sig_sec['key']],
                            'sec1_key_confidence':[sig_sec['key_confidence']],
                            'sec1_mode':[sig_sec['mode']],
                            'sec1_mode_confidence':[sig_sec['mode_confidence']],
                            'sec1_duration':[sig_sec['duration']],
                            'sec1_start':[sig_sec['start']],
                            })
        
        database = pd.concat([database, data_current], ignore_index=True)   # Zusammenfügen der beiden DataFrames
        database.to_csv('database_songs.csv', index = False)    #Save


while True:         # Für mich zum handlen, Aufruf der Funktion muss über Frontend erfolgen 
    write_database()
    liked_songs = get_liked_songs()
    #write_multiple_songs(liked_songs)
    time.sleep(10)  # 10 Sekunden pause, bevor der code erneut gerunnt wird