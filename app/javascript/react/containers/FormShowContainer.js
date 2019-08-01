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
      albumCoverURL: '',
      errors: {}

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSongsChange = this.handleSongsChange.bind(this)
    this.handleURLChange = this.handleURLChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewAlbum = this.addNewAlbum.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)

  }

  addNewAlbum(formPayload) {
    fetch('/api/v1/albums', {
      credentials: "same-origin",
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

  handleClearForm(event) {
    event.preventDefault()
    this.setState({ albumSongs: [], albumName: '', albumCoverURL: '' })
  }

  handleNameChange(event) {
    this.setState({ albumName: event.target.value })
  }

  handleURLChange(event) {
    this.setState({ albumCoverURL: event.target.value })
  }

  handleSongsChange(event) {
    let currentSongs = this.state.albumSongs
    let newSongs = currentSongs.concat(event.target.value)
    this.setState({ albumSongs: newSongs})
  }

  render() {
      let selectedSongs = this.state.albumSongs.map(song => {
        return(
          <div key={song}>
            {song}
          </div>
        )
      })
    return(
      <div>
        Selected Songs: {selectedSongs}
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
            <button onClick={this.handleClearForm}>Clear</button>
          </div>
        </form>
      </div>
    )
  }

}

export default FormShowContainer
