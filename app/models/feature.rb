require 'rspotify'

class Feature < ApplicationRecord
  validates :acousticness, presence: true
  validates :danceability, presence: true
  validates :energy, presence: true
  validates :instrumentalness, presence: true
  validates :liveness, presence: true
  validates :loudness, presence: true
  validates :speechiness, presence: true
  validates :tempo, presence: true

  belongs_to :song

  def self.add(song)
    song_id = song.id
    song_token = song.token

    song_features = RSpotify::Track.find(song_token)

    acousticness = song_features.audio_features.acousticness
    danceability = song_features.audio_features.danceability
    energy = song_features.audio_features.energy
    instrumentalness = song_features.audio_features.instrumentalness
    liveness = song_features.audio_features.liveness
    loudness = song_features.audio_features.loudness
    speechiness = song_features.audio_features.speechiness
    tempo = song_features.audio_features.tempo

    Feature.create(song_id: song_id, acousticness: acousticness, danceability: danceability, energy: energy, instrumentalness: instrumentalness, liveness: liveness, loudness: loudness, speechiness: speechiness, tempo: tempo)
  end
end
