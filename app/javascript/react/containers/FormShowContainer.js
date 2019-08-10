import React, { Component } from 'react'
import FormAlbumNameField from '../components/FormAlbumNameField'
import FormAlbumSongsField from '../components/FormAlbumSongsField'
import {withRouterm} from 'react-router-dom'
import { Link } from 'react-router-dom'

class FormShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumName: '',
      albumSongs: [],
      albumCoverURL: '',
      files: [],
      errors: {}

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSongsChange = this.handleSongsChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewAlbum = this.addNewAlbum.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.validateName = this.validateName.bind(this)
    this.validateSongs = this.validateSongs.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  addNewAlbum(body) {
    fetch('/api/v1/albums', {
      credentials: "same-origin",
      method: 'POST',
      headers: {
         'Accept': 'application/json',
       },
      body: body
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

  handleFormSubmit(event) {
    event.preventDefault()

    if(this.validateName(this.state.albumName) &&
      this.validateSongs(this.state.albumSongs)) {
      let body = new FormData()
        body.append("name", this.state.albumName)
        body.append("albumSongs", this.state.albumSongs)
        body.append("photo", this.state.files[0])

      this.addNewAlbum(body)
    }
  }

  onDrop(event) {
    this.setState({ files: event.target.files})
  }

  handleClearForm(event) {
    event.preventDefault()
    this.setState({ albumSongs: [], albumName: '' })
  }

  handleNameChange(event) {
    this.validateName(event.target.value)
    this.setState({ albumName: event.target.value })
  }

  handleSongsChange(event) {
    this.validateSongs(event.target.value)
    let currentSongs = this.state.albumSongs
    let newSongs = currentSongs.concat(event.target.value)
    this.setState({ albumSongs: newSongs})
  }

  validateName(input) {
  if (input.trim() === '') {
    let newError = { nameInput: 'You must input an album name' }
    this.setState({ errors: Object.assign({}, this.state.errors, newError) })
    return false
  } else {
      let errorState = this.state.errors
      delete errorState.nameInput
      this.setState({ errors: errorState })
      return true
    }
  }


  validateSongs(input) {
    if (input[0] === undefined) {
      let newError = { songInput: 'You must input an album song' }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
        let errorState = this.state.errors
        delete errorState.songInput
        this.setState({ errors: errorState })
        return true
    }
  }

  render() {
    let errorDiv;
    let errorItems;

    if (Object.keys(this.state.errors).length > 0) {
      errorItems = Object.values(this.state.errors).map(error => {
        return(<li key={error}>{error}</li>)
      })
      errorDiv = <div className="callout alert">{errorItems[0]}</div>
      errorDiv = errorDiv.props.children.key
    }


      let selectedSongs = this.state.albumSongs.map(song => {
        return(
          <div key={song}>
            {song}
          </div>
        )
      })
    return(
      <div>
        <Link className="back-button-link" to='/albums'>Back to Homepage</Link>
        <div className="form-show-container">
          <div className="form-container">
          <h2 className="form-header">Create New Playlist</h2>
          <form className="form" onSubmit={this.handleFormSubmit}>
            {errorDiv}
            <FormAlbumNameField
              label="Album Name"
              name="Album Name"
              handlerFunction={this.handleNameChange}
              value={this.state.albumName}
            />
            <div className="select-form-songs-header">Select Songs</div>
            <FormAlbumSongsField
              label="Songs"
              name="Songs"
              handlerFunction={this.handleSongsChange}
              value={this.state.albumSongs}
            />
            <div className="file-upload-header">
              Add Cover Art
            </div>
            <input className="file-input" type="file" onChange={this.onDrop} />
            <div className="form-buttons">
              <button className="submit-button" type="submit">Submit</button>
              <button className="clear-button" onClick={this.handleClearForm}>Clear</button>
            </div>
          </form>
        </div>
        <div className="select-songs">
          <h2 className="songs-header"></h2>
          <div className="select-song-list">
          <h2 className="song-list-header">Selected Songs</h2>
          {selectedSongs}
          </div>
          </div>
        </div>
      </div>
    )
  }

}

export default FormShowContainer
