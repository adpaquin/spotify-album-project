import React, { Component } from 'react'
import AlbumSelectTile from './AlbumSelectTile'

class FormAlbumSongsField extends Component {
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
    let albums = this.state.albums.map(album => {

      let songs = album.songs.map(song => {
        return song.name
      })

      return (
        <div>
        {album.artist_name} - {album.name}
          <select>
            <option>
              {songs}
            </option>
          </select>
        </div>
      )
    })


    return(
      <div>
        {albums}
      </div>
    )
  }
}

export default FormAlbumSongsField








// <AlbumSelectTile
// songs={album.songs}
// />
