import React, { Component } from 'react';
import {format} from 'd3-format';
import {RadarChart} from 'react-vis';

class GraphShowContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      albumInfo: [],
      data: [
        {
          name: 'Album 1',
          acousticness: .7,
          danceability: 1,
          energy: .8,
          instrumentalness: .8,
          liveness: .6,
          tempo: .7
        }
      ]
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

  render() {

    const basicFormat = format('.1r');

    return (

      <div>
        <div>
          Artist: {this.state.albumInfo.artist_name}
        </div>
        <div>
          Album: {this.state.albumInfo.name}
        </div>

      <RadarChart
        data={this.state.data}
        tickFormat={t => basicFormat(t)}
        startingAngle={0}
        domains={[
          {name: 'acousticness', domain: [0, 1], getValue: d => d.acousticness},
          {name: 'danceability', domain: [0, 1], getValue: d => d.danceability},
          {name: 'energy', domain: [0, 1], getValue: d => d.energy},
          {name: 'instrumentalness', domain: [0, 1], getValue: d => d.instrumentalness},
          {name: 'liveness', domain: [0, 1], getValue: d => d.liveness},
          {name: 'tempo', domain: [0, 1], getValue: d => d.tempo}
        ]}
        width={600}
        height={500}
      />

      </div>
    );
  }
}

export default GraphShowContainer
