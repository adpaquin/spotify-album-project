class SongSerializer < ActiveModel::Serializer
  attributes :name, :duration, :track_number,
              :acousticness, :danceability, :energy,
              :instrumentalness, :liveness, :tempo
  belongs_to :album
end
