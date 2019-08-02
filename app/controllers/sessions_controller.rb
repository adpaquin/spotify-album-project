class SessionsController < ApplicationController

  def create
    spotify_user = RSpotify::User.new(request.env['omniauth.auth'])

    albums = spotify_user.saved_albums(limit: 20)
    user = current_user

    albums.each do |album|
      new_album = Album.add(album, user)
      new_songs_arr = Song.add(album)
      Playlist.add(new_songs_arr, new_album)
    end

    # if the user has saved the songs and albums to their playlist in the past, then we shouldnt do it again

    session[:spotify_linked] = true

    @albums = Album.all

     redirect_to '/'
  end

  protected

  def auth_hash
    request.env['omniauth.auth']
  end
end
