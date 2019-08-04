import React, { Component } from 'react';
import {format} from 'd3-format';
import {RadarChart} from 'react-vis';
import SongTile from '../components/SongTile'
import {DiscreteColorLegend} from 'react-vis';
import TextTile from '../components/TextTile'
import {Link} from 'react-router-dom'


const descriptionText = [
  'Energy: Intensity and Activity',
  'Danceability: Intensity and Activity',
  'Acousticness: rhythm stability, beat strength, and overall regularity',
  'Tempo: Beats per minute (BPM)',
  'Liveness: Probability the album was performed live',
  'Instrumentalness: How instrumental the album is'
]

class GraphShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumInfo: [],
      albumTiles: [],
      albumBaseId: ''
    }
    this.addAlbum = this.addAlbum.bind(this)
    this.showCompareableAlbums = this.showCompareableAlbums.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.clearGraph = this.clearGraph.bind(this)
  }

  addAlbum(id) {
    let newAlbum;
    let comaparedAlbums;
    let baseAlbum = [this.state.albumInfo[0]]

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

        comaparedAlbums = baseAlbum.concat(body)
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


    handleDelete() {
      let albumId = this.props.match.params.id
      fetch(`/api/v1/albums/${albumId}`, {
        credentials: "same-origin",
        method: 'DELETE',
        headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
      })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
           error = new Error(errorMessage);
          throw(error);
        }
      })
      .then(response => {
        this.props.history.push("/")
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    clearGraph() {
      let baseGraph = this.state.albumInfo[0]
      this.setState({ albumInfo: [baseGraph] })
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
        let albumBaseId = body.id
        this.setState({ albumInfo: [body], albumBaseId: albumBaseId })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    let mainAlbumArtist = ''
    let mainAlbumName = ''
    let mainAlbumSongs = []
    let items = []
    let baseId = this.state.albumBaseId
    let deleteButton;


    let albumSelectTile = this.state.albumTiles.filter(album => {
        return(album.id !== baseId)
    })

      albumSelectTile = albumSelectTile.map(album => {
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
            key={song.id}
            songName={song.name}
            />
          )
        })
        if(this.state.albumInfo[0].from_spotify == false) {
          deleteButton = <button onClick={this.handleDelete}>Delete Album</button>
        }
        else {
          deleteButton = <div></div>
        }
      }

      let descriptionTextTiles = descriptionText.map( text => {
        return (
          <TextTile
            key={text}
            text={text}
          />
        )
      })




    return (
      <div>
        <Link to='/albums'>
          <div className="button">Back</div>
        </Link>
        <h1 className="album-header">
          Album: {mainAlbumName}
        </h1>
          {deleteButton}
        <div>
        </div>
        <div className="container">
          <div className="item graph">
          <RadarChart
            className={"chart"}
            data={this.state.albumInfo}
            startingAngle={0}
            width={700}
            height={500}
            margin={{left: 100}, {right: 100}}
            tickFormat={format('.1r')}
            style={{
              labels: {fontSize: 17},
              polygons: {
                strokeWidth: 0.5,
                strokeOpacity: 1,
                fillOpacity: 0.2
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
          <div className="item album-info">
            <h2 className="titles album-info">Album Info:</h2>
            {descriptionTextTiles}
          </div>
          <div className="item album-songs">
            <h2 className="titles"> Album Songs:</h2>
            {mainAlbumSongs}
          </div>
        </div>
          <div>
            <DiscreteColorLegend
              height={100}
              width={200}
              items={items} />
          </div>
          <button onClick={this.clearGraph}>Clear Graph</button>
          <button onClick={this.showCompareableAlbums}>Show Compareable Albums</button>
          <div className="selectable-albums">
          {albumSelectTile}
          </div>
      </div>
    );
  }
}

export default GraphShowContainer




// <button onClick={this.handleDelete}>Delete Album</button>
