class AlbumShowSerializer < ActiveModel::Serializer
  attributes :artist_name, :name, :cover_image
  has_many :songs
end
