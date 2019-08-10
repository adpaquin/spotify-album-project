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
    let signInMessageCredentialsEmail = ""
    let signInMessageCredentialsPassword = ""
    let homePageText;
    let homePageImage;

    if(albums.length == 0) {
      signInMessage = "Please sign in with the following credentials during development:"
      signInMessageCredentialsEmail = "Email: test@email.com"
      signInMessageCredentialsPassword = "Password: password"

      homePageText = <div>
                        <div> Welcome to Album Analytics!</div>
                        <div><span>Sign in to explore your Spotify albums</span></div>
                      </div>

      homePageImage = <img className="home-page-image" src={ require('../../../assets/images/home-page.jpg') } />
      
    }
    else {
      newAlbumLink = <Link className="album-tile add-button" to='/albums/new'><div>Create New Playlist</div></Link>
      spotifyAlbumsHeader = "My Album Collection"
    }

    let spotify_albums = albums.filter(album => {
      return(album.from_spotify == true)
    })

    let albumTiles_spotify = spotify_albums.map(album => {
      return (
        <div key={album.id} className="album-tile">
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
      userAlbumsHeader = "My Playlists"
    }

    let albumTiles_user = user_albums.map(album => {
      return (
        <div key={album.id} className="album-tile">
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
          <div className="sign-in-message-container">
            <div className="home-page-text">{homePageText}</div>
            {homePageImage}
            <div className="sign-in-message-text">{signInMessage}</div>
            <div>{signInMessageCredentialsEmail}</div>
            <div>{signInMessageCredentialsPassword}</div>
          </div>
        <h1 className="index-header">{spotifyAlbumsHeader}</h1>
          <div className="tiles-container">
            {albumTiles_spotify}
            {newAlbumLink}
          </div>
        <h1 className="index-header">{userAlbumsHeader}</h1>
        <div className="tiles-container">
          {albumTiles_user}
        </div>
      </div>
    )
  }
}

export default AlbumsIndexContainer
