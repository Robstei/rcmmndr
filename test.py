import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

# Set up your Spotify API credentials and redirect URI
client_id = 'd99805bbbc2e40518808f5f98428f59e'      # Austausch durch Variable -> Übergabe parameter
client_secret = '6fe0ddaf7d14459da45afacf2603ef3e'  # Austausch durch Variable -> Übergabe parameter
redirect_uri = 'http://localhost:3000/api/callback'  # This should match the URI specified in your Spotify Developer Dashboard


birdy_uri = 'spotify:artist:2WX2uTcsvV5OnS0inACecP'
spotify = spotipy.Spotify(client_credentials_manager=SpotifyClientCredentials(client_id=client_id, client_secret=client_secret))

results = spotify.artist_albums(birdy_uri, album_type='album')
albums = results['items']
while results['next']:
    results = spotify.next(results)
    albums.extend(results['items'])

for album in albums:
    print(album['name'])