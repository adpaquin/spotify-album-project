require 'rspotify'

class Album < ApplicationRecord
  # validates :artist_name, presence: true
  validates :name, presence: true
  validates :acousticness_average, presence: true
  validates :danceability_average, presence: true
  validates :energy_average, presence: true
  validates :instrumentalness_average, presence: true
  validates :liveness_average, presence: true
  validates :tempo_average, presence: true

  has_many :playlists, :dependent => :destroy
  has_many :songs, through: :playlists

  def self.add(album)
    name = album.name
    artist = album.artists[0].name
    cover_image = album.images[0]["url"]

    acousticness_average = Album.acousticness_average(album)
    danceability_average = Album.danceability_average(album)
    energy_average = Album.energy_average(album)
    instrumentalness_average = Album.instrumentalness_average(album)
    liveness_average = Album.liveness_average(album)
    tempo_average = Album.tempo_average(album)

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
    sum = 0.0
    counter = 0.0
    album.tracks_cache.each do |song|
      sum += song.audio_features.acousticness
      counter += 1
    end
    return (sum * 100 / counter)
  end

    def self.danceability_average(album)
      sum = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        sum += song.audio_features.danceability
        counter += 1
      end
      return (sum * 100 / counter)
    end

    def self.energy_average(album)
      sum = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        sum += song.audio_features.energy
        counter += 1
      end
      return (sum * 100 / counter)
    end

    def self.instrumentalness_average(album)
      sum = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        sum += song.audio_features.instrumentalness
        counter += 1
      end
      return (sum * 100 / counter)
    end

    def self.liveness_average(album)
      counter = 0.0
      sum = 0.0
      album.tracks_cache.each do |song|
        sum += song.audio_features.liveness
        counter += 1
      end
      return (sum * 100 / counter)
    end

    def self.tempo_average(album)
      sum = 0.0
      counter = 0.0
      album.tracks_cache.each do |song|
        sum += song.audio_features.tempo
        counter += 1
      end
      return (sum / counter)
    end




    def self.add_new(name, new_song_arr, url)
      name = name
      url = url
      counter = 0.0

      acousticness_sum = 0.0
      danceability_sum = 0.0
      energy_sum = 0.0
      instrumentalness_sum = 0.0
      liveness_sum = 0.0
      tempo_sum = 0.0


      new_song_arr.each do |song|

        acousticness_sum += song[0].acousticness
        danceability_sum += song[0].danceability
        energy_sum += song[0].energy
        instrumentalness_sum += song[0].instrumentalness
        liveness_sum += song[0].liveness
        tempo_sum += song[0].tempo
        counter += 1
      end

      acousticness_average = acousticness_sum / counter
      danceability_average = danceability_sum / counter
      energy_average = energy_sum / counter
      instrumentalness_average = instrumentalness_sum / counter
      liveness_average = liveness_sum / counter
      tempo_average = tempo_sum / counter


      Album.create(
                  name: name,
                  cover_image: url,
                  acousticness_average: acousticness_average,
                  danceability_average: danceability_average,
                  energy_average: energy_average,
                  instrumentalness_average: instrumentalness_average,
                  liveness_average: liveness_average,
                  tempo_average: tempo_average)
    end


end
