import React, { Component } from 'react';
import {format} from 'd3-format';
import {RadarChart} from 'react-vis';
import SongTile from '../components/SongTile'

class GraphShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumInfo: []
    }
    this.addAlbum = this.addAlbum.bind(this)
  }

  addAlbum() {
    // let newAlbum = {
    //   acousticness_average: 40,
    //   danceability_average: 40,
    //   energy_average: 40,
    //   instrumentalness_average: 40,
    //   liveness_average: 40,
    //   tempo_average: 40
    // }
    let newAlbum;
    let comaparedAlbums;
    let baseAlbum = this.state.albumInfo

    fetch(`/api/v1/albums/21`)
      .then(response => {
        if(response.ok){
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        comaparedAlbums = baseAlbum.concat([body])
        this.setState({ albumInfo: comaparedAlbums })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }




  componentDidMount(){
    let albumId = this.props.match.params.id
    fetch(`/api/v1/albums/${albumId}`)
      .then(response => {
        if(response.ok){
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => response.json())
      .then(body => {
        this.setState({ albumInfo: [body] })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }




  render() {

    // debugger
    let mainAlbumArtist = ''
    let mainAlbumName = ''
    let mainAlbumSongs = []

      if(this.state.albumInfo[0]) {
        mainAlbumArtist = this.state.albumInfo[0].artist_name
        mainAlbumName = this.state.albumInfo[0].name

        mainAlbumSongs = this.state.albumInfo[0].songs.map(song => {
          return (
            <SongTile
            key={song.id}
            songName={song.name}
            />
          )
        })
      }


      // debugger
    return (
      <div>
        <h1>
          {mainAlbumArtist} - {mainAlbumName}
        </h1>

        <RadarChart
          data={this.state.albumInfo}
          startingAngle={0}
          width={600}
          height={500}
          margin={{left: 60,top: 50, bottom: 50, right: 60}}
          style={{
            labels: {fontSize: 20},
            polygons: {
              strokeWidth: 0.5,
              strokeOpacity: 1,
              fillOpacity: 0.1
            },
          }}
          domains={[
            {name: 'acousticness', domain: [0, 100], getValue: d => d.acousticness_average},
            {name: 'danceability', domain: [0, 100], getValue: d => d.danceability_average},
            {name: 'energy', domain: [0, 100], getValue: d => d.energy_average},
            {name: 'instrumentalness', domain: [0, 100], getValue: d => d.instrumentalness_average},
            {name: 'liveness', domain: [0, 100], getValue: d => d.liveness_average},
            {name: 'tempo', domain: [0, 100], getValue: d => d.tempo_average}
          ]}
        />

        <button onClick={this.addAlbum}>Click to add Malibu</button>

        <div>
          Album Songs:
          {mainAlbumSongs}
        </div>
      </div>
    );
  }
}

export default GraphShowContainer
