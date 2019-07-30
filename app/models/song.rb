require 'rspotify'
require_relative 'playlist'

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

  has_many :playlists
  has_many :albums, through: :playlists

  attr_accessor :new_songs_arr
  @new_songs_arr = []

  def self.add(album)
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

    @new_songs_arr << new_song

    # Playlist.add(@new_song_arr)
    # Playlist.create(songs_id: new_song.id, albums_id: new_album.id)
    # binding.pry

    end

    return @new_songs_arr
  end


end
