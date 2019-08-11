import React from 'react';
import AlbumsIndexContainer from '../../../app/javascript/react/containers/AlbumsIndexContainer'
import testHelper from '../testHelper'
import {BrowserRouter} from "react-router-dom"

describe('AlbumsIndexContainer', () => {
  let wrapper
  let albums

  beforeEach(() => {
    albums = [
      {id: 1,
        artist_name: 'Tycho',
        name: 'Album index_albums_on_user_id',
        acousticness_average: 100,
        danceability_average: 45,
        energy_average: 68,
        instrumentalness_average: 46,
        liveness_average: 90,
        tempo_average: 120
      }
    ]

    wrapper = shallow(
        <AlbumsIndexContainer />
      );
  });


  it('should check the default state of albums', () => {
    expect(wrapper.state()).toEqual({ albums: [] })
  });

  it('should render an AlbumTile component', () => {
    wrapper.setState({ albums: albums })
    expect(wrapper.state()).toEqual({ albums: [{id: 1, artist_name: 'Tycho', name: 'Album index_albums_on_user_id', acousticness_average: 100, danceability_average: 45, energy_average: 68, instrumentalness_average: 46, liveness_average: 90, tempo_average: 120}] })
  });
});
