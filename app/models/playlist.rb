require_relative 'song'

class Playlist < ApplicationRecord
  belongs_to :album
  belongs_to :song

  def self.add_new(new_album, new_song_arr)
    new_song_arr.each do |song|
      Playlist.create(album_id: new_album.id, song_id: song[0].id)
    end
  end

end
