import React from 'react';
import { Image } from 'react-bootstrap'
import axios from 'axios';
import Search from './components/Search';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      searchQuery:'',
      location: {},
      weather: '',
      lat: '',
      lon: '',
    }
  }
  updateSearch = (e) => {
    this.setState({ searchQuery: e.target.value })
  }
  

  getLocation = async () => {
    const locQuery = `https://us1.locationiq.com/v1/search.php?key=pk.ef3d54655e3320d15cda54e644219efe&q=${this.state.searchQuery}&format=json`;
    const res = await axios.get(locQuery);
    console.log(res);
    this.setState({ location:res.data[0], lon: res.data[0].lon, lat: res.data[0].lat });
  }
  getWeather = async (e) => {
    console.log(this.state.lon);
    try {
      await this.getLocation(); // await the function that needs to run first
      const API = 'http://localhost:3003';
      const weather = await axios.get(`${API}/weather`, { params: { lat: this.state.lat, lon: this.state.lon }});
      console.log(weather)
      this.setState({ weather: {day1: weather.data.weather.description} });

    } catch(err) {
      console.error(err);
    }
  }

render() {
    return(
      <div>
        <Search getSearchTerm={this.updateSearch} getLocationData={this.getLocation} getWeatherData={this.getWeather} />
        <h2>The city is: {this.state.location.display_name}</h2>
        <h2>The longitude is: {this.state.location.lon} and the latitude is: {this.state.location.lat}</h2>
        {this.state.location.lat && <Image src = {`https://maps.locationiq.com/v3/staticmap?key=pk.ef3d54655e3320d15cda54e644219efe&center=${this.state.location.lat},${this.state.location.lon}&size=600x600&zoom=14`} />}
        {this.state.weather.day1 && <h3>The weather for the week is: 
          <ul>
            <li> {this.state.weather.day1} </li>
          </ul>
          </h3>}      
      </div>
    )
    }
  }

export default App;