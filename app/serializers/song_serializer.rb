class SongSerializer < ActiveModel::Serializer
  attributes :id, :duration, :track_number, :acousticness,
              :danceability, :energy, :instrumentalness,
              :liveness, :tempo
  belongs_to :album
end
