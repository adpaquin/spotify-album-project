import React, { Component } from "react"
import { Link } from 'react-router-dom'
import AlbumTile from '../components/AlbumTile'
import AlbumTileUser from '../components/AlbumTileUser'


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
    let newAlbumLink;
    let signInMessage = ""
    let albums = this.state.albums
    let spotifyAlbumsHeader = ""
    let userAlbumsHeader = ""


    if(albums.length == 0) {
      signInMessage = "No albums to show! Please sign in and link to your Spotify account"
    }
    else {
      newAlbumLink = <Link to='/albums/new'><div className="button">Create New Album</div></Link>
      spotifyAlbumsHeader = "My Album Collection"
    }

    let spotify_albums = albums.filter(album => {
      return(album.from_spotify == true)
    })

    let albumTiles_spotify = spotify_albums.map(album => {
      return (
        <div className="album-tile">
          <AlbumTile
            key={album.id}
            id={album.id}
            artist_name={album.artist_name}
            name={album.name}
            cover_image={album.cover_image}
          />
        </div>
      )
    })

    let user_albums = albums.filter(album => {
      return(album.from_spotify == false)
    })

    if (user_albums.length > 0) {
      userAlbumsHeader = "My Created Albums"
    }

    let albumTiles_user = user_albums.map(album => {
      return (
        <div className="album-tile">
          <AlbumTileUser
            key={album.id}
            id={album.id}
            artist_name={album.artist_name}
            name={album.name}
            cover_image={album.cover_art.url}
          />
        </div>
      )
    })


    return(
      <div>
        <div>
          {newAlbumLink}
        </div>
        {signInMessage}
        <h1 className="index-header">{spotifyAlbumsHeader}</h1>
          {albumTiles_spotify}
        <h1 className="index-header">{userAlbumsHeader}</h1>
          {albumTiles_user}
      </div>
    )
  }
}

export default AlbumsIndexContainer
