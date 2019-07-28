import React, { Component } from 'react'
import FormAlbumNameField from '../components/FormAlbumNameField'
import FormAlbumSongsField from '../components/FormAlbumSongsField'

class FormShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormSubmit() {
    alert("Form submitted")
  }

  render() {
    return(
      <form onSubmit={this.handleFormSubmit}>
        <FormAlbumNameField
          label="Album Name"
          name="Album Name"
        />
        <FormAlbumSongsField
          label="Songs"
          name="Songs"
        />
        <div>
          <input type="submit" value="Submit" />
        </div>
      </form>
    )
  }

}

export default FormShowContainer
