require_relative '../../application_controller'

class Api::V1::AlbumsController <ApplicationController

  def index
    render json: Album.all
  end

  def show
    render json: Album.find(params[:id])
  end

  def create
    binding.pry
  end

  def new
    binding.pry
  end

end
