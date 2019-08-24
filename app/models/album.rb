require 'rspotify'

class Album < ApplicationRecord
  mount_uploader :cover_art, CoverArtUploader
  validates :name, presence: true
  validates :acousticness_average, presence: true
  validates :danceability_average, presence: true
  validates :energy_average, presence: true
  validates :instrumentalness_average, presence: true
  validates :liveness_average, presence: true
  validates :tempo_average, presence: true

  belongs_to :user
  has_many :playlists, :dependent => :delete_all
  has_many :songs, through: :playlists, :dependent => :delete_all

    def self.add_new(name, new_song_arr, user, photo )
      name = name
      url = url
      user = user
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

      from_spotify = false
      acousticness_average = acousticness_sum / counter
      danceability_average = danceability_sum / counter
      energy_average = energy_sum / counter
      instrumentalness_average = instrumentalness_sum / counter
      liveness_average = liveness_sum / counter
      tempo_average = tempo_sum / counter

      Album.create(user: user,
                  from_spotify: from_spotify,
                  name: name,
                  cover_art: photo,
                  acousticness_average: acousticness_average,
                  danceability_average: danceability_average,
                  energy_average: energy_average,
                  instrumentalness_average: instrumentalness_average,
                  liveness_average: liveness_average,
                  tempo_average: tempo_average)
    end

end
