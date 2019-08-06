require_relative '../models/albumcreator'

class SessionsController < ApplicationController

  def create
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])

    albums = spotify_user.saved_albums(limit: 5)
    user = current_user

    session[:spotify_linked] = true

    current_saved_albums = Album.where(user: user)
    current_saved_albums.each do |current_album|
      if current_album.from_spotify == true
        current_album.destroy
      end
    end

    albums.each do |album|
      AlbumCreator.add(album, user)
      sleep 5
    end

     redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end


# if the user has saved the songs and albums to their playlist in the past, then we shouldnt do it again
