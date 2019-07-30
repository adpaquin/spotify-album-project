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
    new_song_arr = []

    songs.each do |song|
      new_song_arr << Song.where(name: song)
    end

    # binding.pry

    new_album = Album.add_new(name, new_song_arr)

    binding.pry
    Playlist.add_new(new_album, new_song_arr)

    # Find songs in songNames array.
    # use songs to get average album features and create album
    # create playlist object with songs and new album
  end

  def new
    binding.pry

  end

end
