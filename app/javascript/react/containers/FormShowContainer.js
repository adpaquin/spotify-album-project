import React, { Component } from 'react'
import FormAlbumNameField from '../components/FormAlbumNameField'
import FormAlbumSongsField from '../components/FormAlbumSongsField'
import FormCoverArtField from '../components/FormCoverArtField'
import {withRouterm} from 'react-router-dom'
import { Link } from 'react-router-dom'


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
    this.validateName = this.validateName.bind(this)
    this.validateURL = this.validateURL.bind(this)
    this.validateSongs = this.validateSongs.bind(this)
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
    .then(response => {
      this.props.history.push("/")
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleFormSubmit(event) {
    event.preventDefault()
    if(this.validateName(this.state.albumName) &&
      this.validateURL(this.state.albumCoverURL) &&
      this.validateSongs(this.state.albumSongs)) {
      let formPayload = {
        name: this.state.albumName,
        albumSongs: this.state.albumSongs,
        albumCoverURL: this.state.albumCoverURL
      }
      this.addNewAlbum(formPayload)
    }
  }

  handleClearForm(event) {
    event.preventDefault()
    this.setState({ albumSongs: [], albumName: '', albumCoverURL: '' })
  }

  handleNameChange(event) {
    this.validateName(event.target.value)
    this.setState({ albumName: event.target.value })
  }

  handleURLChange(event) {
    this.validateURL(event.target.value)
    this.setState({ albumCoverURL: event.target.value })
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

  validateURL(input) {
    if (input.trim() === '') {
      let newError = { URLInput: 'You must input an image URL' }
      this.setState({ errors: Object.assign({}, this.state.errors, newError) })
      return false
    } else {
        let errorState = this.state.errors
        delete errorState.URLInput
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

        <Link to='/albums'>
          <div className="button">Back</div>
        </Link>

      <div className="form-container">
        <form className="form" onSubmit={this.handleFormSubmit}>
          {errorDiv}
          <FormAlbumNameField
            label="Album Name"
            name="Album Name"
            handlerFunction={this.handleNameChange}
            value={this.state.albumName}
          />
          <FormCoverArtField
            label="Album Cover URL"
            name="Album Cover URL"
            handlerFunction={this.handleURLChange}
            value={this.state.albumCoverURL}
          />
          <FormAlbumSongsField
            label="Songs"
            name="Songs"
            handlerFunction={this.handleSongsChange}
            value={this.state.albumSongs}
          />
          <input type="submit" value="Submit" />
          <button onClick={this.handleClearForm}>Clear</button>
        </form>

        <div className="select-songs">
          <h2 className="songs-header">Selected Songs:</h2>
          {selectedSongs}
          </div>
        </div>
      </div>
    )
  }

}

export default FormShowContainer
