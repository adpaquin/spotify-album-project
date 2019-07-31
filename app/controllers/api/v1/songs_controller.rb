require_relative '../../application_controller'

class Api::V1::SongsController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: Song.all
  end

end
