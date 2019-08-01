require_relative '../../application_controller'

class Api::V1::PlaylistsController < ApplicationController
  before_action :authenticate_user!

  def create
    binding.pry

  end

end
