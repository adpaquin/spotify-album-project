import React, { Component } from "react"

class AlbumShowContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        albumInfo: {}
      }
    }

    componentDidMount(){
      let albumId = this.props.match.params.id
      fetch(`/api/v1/albums/${albumId}`)
        .then(response => {
          if(response.ok){
            return response;
          } else {
            let errorMessage = `${response.status} (${response.statusText})`,
              error = new Error(errorMessage);
            throw(error);
          }
        })
        .then(response => response.json())
        .then(body => {
          this.setState({ albumInfo: body })
        })
        .catch(error => console.error(`Error in fetch: ${error.message}`));
    }

    render(){
      return(
        <div>
          Artist: {this.state.albumInfo.artist_name}
        </div>
      )
    }
}

export default AlbumShowContainer
