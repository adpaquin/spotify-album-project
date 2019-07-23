require 'rspotify'

class Song < ApplicationRecord
  validates :name, presence: true
  validates :duration, presence: true
  validates :track_number, presence: true
  validates :acousticness, presence: true
  validates :danceability, presence: true
  validates :energy, presence: true
  validates :instrumentalness, presence: true
  validates :liveness, presence: true
  validates :tempo, presence: true

  has_many :features, :dependent => :destroy

  belongs_to :album

  def self.add(album, new_album)
    album_id = new_album.id

    album.tracks_cache.each do |song|
      name = song.name
      duration = song.duration_ms
      track_number = song.track_number
      acousticness = song.audio_features.acousticness
      danceability = song.audio_features.danceability
      energy = song.audio_features.energy
      instrumentalness = song.audio_features.instrumentalness
      liveness = song.audio_features.liveness
      tempo = song.audio_features.tempo


      Song.create(album_id: album_id,
                  name: name,
                  duration: duration,
                  track_number: track_number,
                  acousticness: acousticness,
                  danceability: danceability,
                  energy: energy,
                  instrumentalness: instrumentalness,
                  liveness: liveness,
                  tempo: tempo)
    end

  end
end








# acousticness = song.audio_features.acousticness
# danceability = song.audio_features.danceability
# energy = song.audio_features.energy
# instrumentalness = song.audio_features.instrumentalness
# liveness = song.audio_features.liveness
# loudness = song.audio_features.loudness
# speechiness = song.audio_features.speechiness
# tempo = song.audio_features.tempo
