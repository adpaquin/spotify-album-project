import React, { Component } from 'react'
import FormAlbumNameField from '../components/FormAlbumNameField'
import FormAlbumSongsField from '../components/FormAlbumSongsField'
import FormCoverArtField from '../components/FormCoverArtField'


class FormShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumName: '',
      albumSongs: [],
      albumCoverURL: ''

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSongsChange = this.handleSongsChange.bind(this)
    this.handleURLChange = this.handleURLChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewAlbum = this.addNewAlbum.bind(this)

  }

  addNewAlbum(formPayload) {
    debugger
    fetch('/api/v1/albums', {
      credentials: 'same-origin',
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
       },
      body: JSON.stringify(formPayload)
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
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleFormSubmit(event) {
    event.preventDefault()
    let formPayload = {
      name: this.state.albumName,
      albumSongs: this.state.albumSongs,
      albumCoverURL: this.state.albumCoverURL
    }

    this.addNewAlbum(formPayload)
  }

  handleNameChange(event) {
    console.log(this.state.albumName)
    this.setState({ albumName: event.target.value })
  }

  handleURLChange(event) {
    console.log(this.state.albumCoverURL)
    this.setState({ albumCoverURL: event.target.value })
  }

  handleSongsChange(event) {
    let currentSongs = this.state.albumSongs
    let newSongs = currentSongs.concat(event.target.value)
    console.log(this.state.albumSongs)
    this.setState({ albumSongs: newSongs})
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <FormAlbumNameField
          label="Album Name"
          name="Album Name"
          handlerFunction={this.handleNameChange}
        />
        <FormCoverArtField
        label="Album Cover URL"
        name="Album Cover URL"
        handlerFunction={this.handleURLChange}
        />
        <FormAlbumSongsField
          label="Songs"
          name="Songs"
          handlerFunction={this.handleSongsChange}
        />
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  }

}

export default FormShowContainer
