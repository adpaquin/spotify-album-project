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

  def self.add(song, new_song)

    song_id = new_song.id

    acousticness = song.audio_features.acousticness
    danceability = song.audio_features.danceability
    energy = song.audio_features.energy
    instrumentalness = song.audio_features.instrumentalness
    liveness = song.audio_features.liveness
    loudness = song.audio_features.loudness
    speechiness = song.audio_features.speechiness
    tempo = song.audio_features.tempo

    Feature.create(song_id: song_id, acousticness: acousticness, danceability: danceability, energy: energy, instrumentalness: instrumentalness, liveness: liveness, loudness: loudness, speechiness: speechiness, tempo: tempo)
  end
end
