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
    let signInMessage = ""
    let signInMessageCredentialsEmail = ""
    let signInMessageCredentialsPassword = ""
    let homePageText;
    let homePageImage;
    let albumsLink;
    let albumLinkMessage;

    // debugger

    if(this.state.albums != 0) {
      albumsLink = <Link className="album-tile add-button" to='/albums'><div>View My Albums</div></Link>
      albumLinkMessage = "Already Signed In? Click link below to view albums"
    }

    signInMessage = "Please sign in with the following credentials during development:"
    signInMessageCredentialsEmail = "Email: test@email.com"
    signInMessageCredentialsPassword = "Password: password"

    homePageText = <div>
                      <div> Welcome to Album Analytics!</div>
                      <div><span>Sign in to explore your Spotify albums</span></div>
                    </div>

    homePageImage = <img className="home-page-image" src={ require('../../../assets/images/home-page.jpg') } />


    return(
      <div>
        <div className="sign-in-message-container">
          <div className="home-page-text">{homePageText}</div>
          {homePageImage}
          <div className="sign-in-message-text">{signInMessage}</div>
          <div>{signInMessageCredentialsEmail}</div>
          <div>{signInMessageCredentialsPassword}</div>
          <div className="sign-in-link-text">{albumLinkMessage}{albumsLink}</div>
        </div>
      </div>
    )
  }
}

export default AlbumsIndexContainer
