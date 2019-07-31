import React, { Component } from "react"
import { Link } from 'react-router-dom'
import AlbumTile from '../components/AlbumTile'

// let spotifyAlbums = true
// let userAlbums = true

class AlbumsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }
    this.handleShowSpotifyAlbums = this.handleShowSpotifyAlbums.bind(this)
  }

  componentDidMount() {
    fetch('/api/v1/albums')
    .then(response => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(body => {
      this.setState({ albums: body })
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleShowSpotifyAlbums() {

  }

  render() {
    // spotifyAlbums;
    // userAlbums;

    let albums = this.state.albums


    let albumTiles = albums.map(album => {
      return (
        <AlbumTile
          key={album.id}
          id={album.id}
          artist_name={album.artist_name}
          name={album.name}
          cover_image={album.cover_image}
        />
      )
    })


    return(
      <div>
        <Link to='/form'>Add New Album</Link>
        <button onClick={this.handleShowSpotifyAlbums}>Albums From Spotify</button>
        <div>{albumTiles}</div>
      </div>
    )
  }
}

export default AlbumsIndexContainer
