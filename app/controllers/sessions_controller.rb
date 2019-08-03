require_relative '../models/albumcreator'

class SessionsController < ApplicationController

  def create
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])

    albums = spotify_user.saved_albums(limit: 3)
    user = current_user

    session[:spotify_linked] = true

    albums.each do |album|
      AlbumCreator.add(album, user)
    end

     redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end


# if the user has saved the songs and albums to their playlist in the past, then we shouldnt do it again
