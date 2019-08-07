class SongSerializer < ActiveModel::Serializer
  attributes :id, :name, :acousticness,
              :danceability, :energy, :instrumentalness,
              :liveness, :tempo
  belongs_to :album
end
