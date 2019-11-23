import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



class Weather extends React.Component {
  constructor() {
    super()
    this.state = {
      weatherAll: {
        main: '',
        weather: [{
          main: '',
          icon: ''
        }]
      }
    }
  }

  componentDidMount() {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=${process.env.W_API_KEY}&units=metric`)
      .then(resp => this.setState({ weatherAll: resp.data }))
      .catch(err => console.log(err))
  }


  render() {
    return <section id="weather" className="section">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-2">
            <img src={`http://openweathermap.org/img/wn/${this.state.weatherAll.weather[0].icon}@2x.png`} alt="" className="image"/>
          </div>
          <div className="column is-2">
            <p className="has-text-grey-dark">Temp: {Math.floor(this.state.weatherAll.main.temp)} <small>C</small></p>
          </div>
          <div className="column is-2">
            <p className="has-text-grey-dark">Humidity: {this.state.weatherAll.main.humidity}%</p>
          </div>
          <Link className="column is-2" to="/forecast" id="forecast-link">5-DAY FORECAST</Link>
          {/* <div className="column is-2">
            <Link to="/forecast" id="forecast-link">5-DAY FORECAST</Link>
          </div> */}
        </div>   
      </div>
    </section>
  }
}

export default Weather