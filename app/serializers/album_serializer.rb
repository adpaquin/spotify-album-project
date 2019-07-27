class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :artist_name, :name, :cover_image,
              :acousticness_average, :danceability_average,
              :energy_average, :instrumentalness_average,
              :liveness_average, :tempo_average
  has_many :songs
end
