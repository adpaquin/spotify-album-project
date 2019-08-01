require 'rspotify'

require_relative '../models/album'
require_relative '../models/song'

class UsersController < ApplicationController

  def seed
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])

    albums = spotify_user.saved_albums(limit: 3)
    user = current_user

    albums.each do |album|
      new_album = Album.add(album, user)
      new_songs_arr = Song.add(album)
      Playlist.add(new_songs_arr, new_album)
    end

    @albums = Album.all
    redirect_to "/albums"
  end

  def albums
  end

end
