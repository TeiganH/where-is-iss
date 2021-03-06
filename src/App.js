import React, { Component } from 'react';
import Map from './components/Map.js'
import './App.css';
import Nav from './components/Nav.js'
import Footer from './components/Footer.js'
import Article from './components/Article.js'

// Map provided by leaflet.js

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      lat: '',
      lng: '',
      position: [],
      isstelemetry: [],
      latitude: '',
      longitude: '',
      altitude: '',
      velocity: '',
      visibility: '',
      footprint: '',
      timestamp: '',
      days: '',
      units: '',
    }
    this.issInfo=this.issInfo.bind(this)
  }
  
  getISS(){
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response=>response.json())
    .then(json=>{
        this.setState({
            lat: json.latitude,
            lng: json.longitude,
        })
    }) 
  }

  issInfo(){
    fetch('https://api.wheretheiss.at/v1/satellites/25544')
    .then(response=>response.json())
    .then(issJson=>{
      this.setState({
        latitude: issJson.latitude,
        longitude: issJson.longitude,
        altitude: issJson.altitude,
        velocity: issJson.velocity,
        visibility: issJson.visibility,
        footprint: issJson.footprint,
        timestamp: issJson.timestamp,
        days: issJson.daynum,
        units: issJson.units,
      })
    })
  }

  componentDidMount(){
    setInterval(this.issInfo, 2000)
  }
    
  render() {
    let position = [this.state.lat, this.state.lng]
    let isstelemetry = [
      `latitude: ${this.state.latitude}`,
      `longitude: ${this.state.longitude}`,
      `altitude: ${this.state.altitude}`,
      `velocity: ${this.state.velocity}`,
      `visibility: ${this.state.visibility}`,
      `footprint: ${this.state.footprint}`,
      `timestamp: ${this.state.timestamp}`,
      `days: ${this.state.days}`,
      `units: ${this.state.units}`,
    ]
  
  return (
      <div className="App">
        <aside>
          <div className="text-shadow-pop-bottom">ISS</div>
          <Nav />
          <div className="buttonDiv">
            <button onClick={()=>this.getISS()}>Find the ISS</button>
          </div>
          <Article isstelemetry={isstelemetry}/>
        </aside>
        <section>
          <div className="mapDiv">
              <Map latlng={position} />
          </div>    
        </section>
        <footer>
        <Footer />
        </footer>
      </div>
  )
    
   }}
export default App;
