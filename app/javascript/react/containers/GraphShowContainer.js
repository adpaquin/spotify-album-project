import React, { Component } from 'react';
import {format} from 'd3-format';
import {RadarChart} from 'react-vis';

class GraphShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumInfo_1: [],
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
        this.setState({ albumInfo_1: [body] })
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {

    return (


      <RadarChart
        data={this.state.albumInfo_1}
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
    );
  }
}

export default GraphShowContainer
