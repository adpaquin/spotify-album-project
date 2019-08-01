class AlbumsController < ApplicationController

  def index
     Album.all
  end

  def show
     Album.find(params[:id])
  end

  def new

  end

end
