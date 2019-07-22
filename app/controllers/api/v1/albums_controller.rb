class Api::V1::AlbumsController <ApplciationController

  def index
    Album.all
  end

end
