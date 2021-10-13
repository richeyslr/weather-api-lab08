import React, { Component } from 'react'

export default class Search extends Component {
  render() {
    return (
      <div>
        <input onChange={(e) => this.props.getSearchTerm(e)} placeholder="search for a city"></input>
        <button onClick={this.props.getWeatherData}>Get Location</button>
        {/* <button onClick={this.props.getWeatherData}>Get Weather</button> */}
      </div>
    )
  }
}
