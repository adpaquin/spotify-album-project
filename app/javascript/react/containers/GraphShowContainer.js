import React, { Component } from 'react';
import {format} from 'd3-format';
import {RadarChart} from 'react-vis';

class GraphShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumInfo: []
    }
    this.addAlbum = this.addAlbum.bind(this)
  }

  addAlbum() {
    // let newAlbum = {
    //   acousticness_average: 40,
    //   danceability_average: 40,
    //   energy_average: 40,
    //   instrumentalness_average: 40,
    //   liveness_average: 40,
    //   tempo_average: 40
    // }

    let baseAlbum = this.state.albumInfo
    let comaparedAlbums = baseAlbum.concat([newAlbum])

    this.setState({ albumInfo: comaparedAlbums })

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
        this.setState({ albumInfo: [body] })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    // debugger

    return (
      <div>

      <RadarChart
        data={this.state.albumInfo}
        startingAngle={0}
        width={600}
        height={500}
        margin={{left: 60,top: 50, bottom: 50, right: 60}}
        style={{
          labels: {fontSize: 20},
          polygons: {
            strokeWidth: 0.5,
            strokeOpacity: 1,
            fillOpacity: 0.1
          },
        }}
        domains={[
          {name: 'acousticness', domain: [0, 100], getValue: d => d.acousticness_average},
          {name: 'danceability', domain: [0, 100], getValue: d => d.danceability_average},
          {name: 'energy', domain: [0, 100], getValue: d => d.energy_average},
          {name: 'instrumentalness', domain: [0, 100], getValue: d => d.instrumentalness_average},
          {name: 'liveness', domain: [0, 100], getValue: d => d.liveness_average},
          {name: 'tempo', domain: [0, 100], getValue: d => d.tempo_average}
        ]}
      />

      <button onClick={this.addAlbum}>Click to add Malibu</button>

      </div>
    );
  }
}

export default GraphShowContainer
