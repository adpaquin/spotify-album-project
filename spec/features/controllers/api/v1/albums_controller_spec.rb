require 'rails_helper'

RSpec.configure do |config|
  config.include Devise::Test::ControllerHelpers, type: :controller
end

RSpec.describe Api::V1::AlbumsController, type: :controller do

  let!(:first_album) {Album.create(
      id: 1,
      name: "Album Name",
      acousticness_average: 0.5,
      danceability_average: 0.5,
      energy_average: 0.5,
      instrumentalness_average: 0.5,
      liveness_average: 0.5,
      tempo_average: 0.5
    )}

  describe "GET#show", :type => :request do
    before { get '/api/v1/albums/1' }
    it "should return an album" do
      expect(response.status).to eq 302
      expect(response.content_type).to eq("text/html")
    end
  end

end
