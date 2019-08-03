class AlbumCreator

def self.add(album, user)

  album_name = album.name
  artist = album.artists[0].name
  cover_image = album.images[0]["url"]
  from_spotify = true

  album_length = album.tracks_cache.length.to_d
  album_acousticness = 0.0
  album_danceability = 0.0
  album_energy = 0.0
  album_instrumentalness = 0.0
  album_liveness = 0.0
  album_tempo = 0.0

  @new_songs_arr = []

  album.tracks_cache.each do |song|
    name = song.name
    duration = song.duration_ms
    track_number = song.track_number
    acousticness = song.audio_features.acousticness * 100
    danceability = song.audio_features.danceability * 100
    energy = song.audio_features.energy * 100
    instrumentalness = song.audio_features.instrumentalness * 100
    liveness = song.audio_features.liveness * 100
    tempo = song.audio_features.tempo

      new_song = Song.create(name: name,
                  duration: duration,
                  track_number: track_number,
                  acousticness: acousticness,
                  danceability: danceability,
                  energy: energy,
                  instrumentalness: instrumentalness,
                  liveness: liveness,
                  tempo: tempo)

      album_acousticness += song.audio_features.acousticness * 100
      album_danceability += song.audio_features.danceability * 100
      album_energy += song.audio_features.energy * 100
      album_instrumentalness += song.audio_features.instrumentalness * 100
      album_liveness += song.audio_features.liveness * 100
      album_tempo += song.audio_features.tempo

      @new_songs_arr << new_song

    end

    album_acousticness_average = album_acousticness / album_length
    album_danceability_average = album_danceability / album_length
    album_energy_average = album_energy / album_length
    album_instrumentalness_average = album_instrumentalness / album_length
    album_liveness_average = album_liveness / album_length
    album_tempo_average = album_tempo / album_length


    new_album = Album.create(user: user,
                          artist_name: artist,
                          from_spotify: from_spotify,
                          name: album_name,
                          cover_image: cover_image,
                          acousticness_average: album_acousticness_average,
                          danceability_average: album_danceability_average,
                          energy_average: album_energy_average,
                          instrumentalness_average: album_instrumentalness_average,
                          liveness_average: album_liveness_average,
                          tempo_average: album_tempo_average
                          )

      @new_songs_arr.each do |song|
        Playlist.create(album_id: new_album.id, song_id: song.id)
      end

end

end
