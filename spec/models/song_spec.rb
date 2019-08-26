require 'rails_helper'

describe Song do
  it {should have_valid(:name).when("Name")}
  it {should_not have_valid(:name).when(nil)}

  it {should have_valid(:acousticness).when(0.5)}
  it {should_not have_valid(:acousticness).when(nil)}

  it {should have_valid(:danceability).when(0.5)}
  it {should_not have_valid(:danceability).when(nil)}

  it {should have_valid(:energy).when(0.5)}
  it {should_not have_valid(:energy).when(nil)}

  it {should have_valid(:instrumentalness).when(0.5)}
  it {should_not have_valid(:instrumentalness).when(nil)}

  it {should have_valid(:liveness).when(0.5)}
  it {should_not have_valid(:liveness).when(nil)}

  it {should have_valid(:tempo).when(0.5)}
  it {should_not have_valid(:tempo).when(nil)}
end
