require 'rspotify'

class Song < ApplicationRecord
  validates :name, presence: true
  validates :token, presence: true
  validates :duration, presence: true
  validates :track_number, presence: true

  has_many :features, :dependent => :destroy

  belongs_to :album

  def self.add(album, new_album)
    album_id = new_album.id

    album.tracks_cache.each do |song|
      name = song.name
      token = song.id
      duration = song.duration_ms
      track_number = song.track_number
      new_song = Song.create(album_id: album_id, name: name, token: token, duration: duration, track_number: track_number)

      Feature.add(song, new_song)
    end

  end
end
