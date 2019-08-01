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
  }

  componentDidMount() {
    fetch('/api/v1/albums', {
      credentials: 'same-origin'
    })
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


  render() {
    let signInMessage = ""
    let albums = this.state.albums

    if(albums.length == 0) {
      signInMessage = "No albums to show! Please sign in and link to your Spotify account"
    }


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
        <Link to='/albums/new'>Add New Album</Link>
        {signInMessage}
        <h1>My Album Collection</h1>
        <div>{albumTiles}</div>
      </div>
    )
  }
}

export default AlbumsIndexContainer
