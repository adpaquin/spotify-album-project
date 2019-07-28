import React, { Component } from "react"
import AlbumTile from '../components/AlbumTile'

class AlbumsIndexContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albums: []
    }
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

  render() {
    let albumTiles = this.state.albums.map(album => {
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
        <h1>My Albums </h1>
        <div>{albumTiles}</div>
      </div>
    )
  }
}

export default AlbumsIndexContainer
