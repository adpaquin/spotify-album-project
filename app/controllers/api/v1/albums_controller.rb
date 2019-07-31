require_relative '../../application_controller'


class Api::V1::AlbumsController <ApplicationController
  protect_from_forgery


  def index
    render json: Album.all
  end

  def show
    render json: Album.find(params[:id])
  end

  def create
    name = params[:name]
    songs = params[:albumSongs]
    url = params[:albumCoverURL]
    new_song_arr = []

    songs.each do |song|
      new_song_arr << Song.where(name: song)
    end

    new_album = Album.add_new(name, new_song_arr, url)

    Playlist.add_new(new_album, new_song_arr)
  end

  def new
    binding.pry

  end

end
