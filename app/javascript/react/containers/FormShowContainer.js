import React, { Component } from 'react'
import FormAlbumNameField from '../components/FormAlbumNameField'
import FormAlbumSongsField from '../components/FormAlbumSongsField'

class FormShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumName: '',
      albumSongs: []

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleSongsChange = this.handleSongsChange.bind(this)

  }

  handleFormSubmit() {
    alert("Form submitted")
  }

  handleNameChange(event) {
    this.setState({ albumName: event.target.value })
    console.log(this.state.albumName)
  }

  handleSongsChange(event) {
    let currentSongs = this.state.albumSongs
    let newSongs = currentSongs.concat(event.target.value)
    this.setState({ albumSongs: newSongs})
    console.log(this.state.albumSongs)
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <FormAlbumNameField
          label="Album Name"
          name="Album Name"
          handlerFunction={this.handleNameChange}
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
