require 'rspotify'

class Album < ApplicationRecord
  validates :artist_name, presence: true
  validates :name, presence: true
  validates :acousticness_average, presence: true
  validates :danceability_average, presence: true
  validates :energy_average, presence: true
  validates :instrumentalness_average, presence: true
  validates :liveness_average, presence: true
  validates :tempo_average, presence: true


  has_many :songs, :dependent => :destroy

  def self.add(album)
    # binding.pry
    name = album.name
    artist = album.artists[0].name
    cover_image = album.images[0]["url"]
    # binding.pry
    acousticness_average = Album.acousticness_average(album)
    danceability_average = Album.acousticness_average(album)
    energy_average = Album.acousticness_average(album)
    instrumentalness_average = Album.acousticness_average(album)
    liveness_average = Album.acousticness_average(album)
    tempo_average = Album.acousticness_average(album)


    Album.create(artist_name: artist,
                name: name,
                cover_image: cover_image,
                acousticness_average: acousticness_average,
                danceability_average: danceability_average,
                energy_average: energy_average,
                instrumentalness_average: instrumentalness_average,
                liveness_average: liveness_average,
                tempo_average: tempo_average)
  end

  def self.acousticness_average(album)
    average = 0.0
    counter = 0.0
    album.tracks_cache.each do |song|
      average += song.audio_features.acousticness
      counter += 1
    end
    return average / counter
  end

    def self.danceability_average(album)
      average = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        average += song.audio_features.danceability
        counter += 1
      end
      return danceability_average / counter

    end

    def self.energy_average(album)
      average = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        average += song.audio_features.energy
        counter += 1
      end
      return energy_average / counter
    end

    def self.instrumentalness_average(album)
      average = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        average += song.audio_features.instrumentalness
        counter += 1
      end
      return averahe / counter
    end

    def self.liveness_average(album)
      counter = 0.0
      average = 0.0
      album.tracks_cache.each do |song|
        average += song.audio_features.liveness
        counter += 1
      end
      return average / counter
    end

    def self.tempo_average(album)
      average = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        tempo = song.audio_features.tempo
        counter += 1
      end
      return average / counter
    end

end
