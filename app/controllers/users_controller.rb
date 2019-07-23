require 'rspotify'

require_relative '../models/album'
require_relative '../models/song'

class UsersController < ApplicationController

  def seed
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])

    albums = spotify_user.saved_albums(limit: 5)

    albums.each do |album|
      new_album = Album.add(album)
      Song.add(album, new_album)
    end

    @albums = Album.all
  end

end
