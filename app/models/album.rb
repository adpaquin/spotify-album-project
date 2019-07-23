require 'rspotify'

class Album < ApplicationRecord
  validates :artist_name, presence: true
  validates :name, presence: true

  has_many :songs, :dependent => :destroy

  def self.add(album)
    name = album.name
    artist= album.artists[0].name
    cover_image = album.images[0]["url"]

    Album.create(artist_name: artist, name: name, cover_image: cover_image)
  end

end
