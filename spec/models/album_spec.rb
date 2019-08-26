require 'rails_helper'

describe Album do
  it {should have_valid(:name).when("Name")}
  it {should_not have_valid(:name).when(nil)}

  it {should have_valid(:acousticness_average).when(0.5)}
  it {should_not have_valid(:acousticness_average).when(nil)}

  it {should have_valid(:danceability_average).when(0.5)}
  it {should_not have_valid(:danceability_average).when(nil)}

  it {should have_valid(:energy_average).when(0.5)}
  it {should_not have_valid(:energy_average).when(nil)}

  it {should have_valid(:instrumentalness_average).when(0.5)}
  it {should_not have_valid(:instrumentalness_average).when(nil)}

  it {should have_valid(:liveness_average).when(0.5)}
  it {should_not have_valid(:liveness_average).when(nil)}

  it {should have_valid(:tempo_average).when(0.5)}
  it {should_not have_valid(:tempo_average).when(nil)}
end
