require_relative '../../application_controller'


class Api::V1::AlbumsController <ApiController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token


  def index
    render json: Album.where(user: current_user)
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

    user = current_user
    new_album = Album.add_new(name, new_song_arr, url, user)

    Playlist.add_new(new_album, new_song_arr)

    render json: Album.where(user: current_user)
  end

  def destroy
    album = Album.find(params[:id])
    album.destroy

    render json: Album.where(user: current_user)
  end

end
