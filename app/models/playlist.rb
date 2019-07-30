require_relative 'song'

class Playlist < ApplicationRecord
  belongs_to :album
  belongs_to :song


  def self.add(new_songs_arr, new_album)
    new_songs_arr.each do |song|
      Playlist.create(album_id: new_album.id, song_id: song.id)
    end
  end

end
