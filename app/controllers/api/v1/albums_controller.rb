# require_relative '../../application_controller'

class Api::V1::AlbumsController <ApplicationController

  def index
    Album.all
    render json: Album.all
  end

end
