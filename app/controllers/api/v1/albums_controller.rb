require_relative '../../application_controller'
require_relative '../../../models/serializers/album_show_serializer'

class Api::V1::AlbumsController <ApplicationController

  def index
    render json: Album.all
  end

  def show
    render json: Album.find(params[:id]), serializer: AlbumShowSerializer
  end

end
