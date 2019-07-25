class AlbumsSerializer < ActiveModel::Serializer
  attributes :id, :artist_name, name:, :cover_image
  has_many :songs
end
