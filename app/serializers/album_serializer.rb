class AlbumSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :from_spotify, :artist_name, :name, :cover_image,
              :acousticness_average, :danceability_average,
              :energy_average, :instrumentalness_average,
              :liveness_average, :tempo_average
  has_many :songs
end
