import React, { Component } from 'react';
import {format} from 'd3-format';
import {RadarChart} from 'react-vis';
import SongTile from '../components/SongTile'
import {DiscreteColorLegend} from 'react-vis';
// import AlbumSelectTile from '../components/AlbumSelectTile'



class GraphShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumInfo: [],
      albumTiles: []
    }
    this.addAlbum = this.addAlbum.bind(this)
    this.showCompareableAlbums = this.showCompareableAlbums.bind(this)
  }

  addAlbum(id) {
    let newAlbum;
    let comaparedAlbums;
    let baseAlbum = this.state.albumInfo

    fetch(`/api/v1/albums/${id}`)
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


    showCompareableAlbums() {
      fetch(`/api/v1/albums`)
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
          this.setState({ albumTiles: body })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }




  componentDidMount(){
    let albumId = this.props.match.params.id
    fetch(`/api/v1/albums/${albumId}`, {
        credentials: 'same-origin'
      })
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
    let mainAlbumArtist = ''
    let mainAlbumName = ''
    let mainAlbumSongs = []
    let items = []

    let albumSelectTile = this.state.albumTiles.map(album => {
      return(
        <div id={album.id} onClick={ () => this.addAlbum(album.id) }>
          <img src={album.cover_image} height="200" width="200" />
        </div>

      )
    })

      if(this.state.albumInfo[0]) {

        mainAlbumArtist = this.state.albumInfo[0].artist_name
        mainAlbumName = this.state.albumInfo[0].name

      items = this.state.albumInfo.map(album => {
        return (album.name)
      })


        mainAlbumSongs = this.state.albumInfo[0].songs.map(song => {
          return (
            <SongTile
            key={song.name}
            songName={song.name}
            />
          )
        })
      }


    return (
      <div>
        <h1 class="album-header">
          Album: {mainAlbumName}
        </h1>
        <div className="row">
          <div className="small-8 columns">
          <RadarChart
            data={this.state.albumInfo}
            startingAngle={0}
            width={600}
            height={500}
            margin={{left: 60,top: 50, bottom: 50, right: 60}}
            tickFormat={format('.1r')}
            style={{
              labels: {fontSize: 17},
              polygons: {
                strokeWidth: 0.5,
                strokeOpacity: 1,
                fillOpacity: 0.1
              }
            }}
            domains={[
              {name: 'Acousticness', domain: [0, 100], getValue: d => d.acousticness_average},
              {name: 'Danceability', domain: [0, 100], getValue: d => d.danceability_average},
              {name: 'Energy', domain: [0, 100], getValue: d => d.energy_average},
              {name: 'Instrumentalness', domain: [0, 100], getValue: d => d.instrumentalness_average},
              {name: 'Liveness', domain: [0, 100], getValue: d => d.liveness_average},
              {name: 'Tempo', domain: [50, 150], getValue: d => d.tempo_average}
            ]}
          />
          </div>
          <div className="small-2 columns">
            <h2 className="titles">Legend</h2>
            <DiscreteColorLegend
              height={200}
              width={300}
              items={items} />
          </div>
          <div className="small-2 columns">
            <h2 className="titles"> Album Songs:</h2>
            {mainAlbumSongs}
          </div>
        </div>
          <button onClick={this.showCompareableAlbums}>Show Compareable Albums</button>
          <div className="selectable-albums">
            {albumSelectTile}
          </div>
      </div>
    );
  }
}

export default GraphShowContainer
