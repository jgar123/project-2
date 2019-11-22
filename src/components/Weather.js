import React from 'react'
import axios from 'axios'

console.log(process.env.W_API_KEY)


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
    axios.get('http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=8256de24dbdf6fd7e79723bdc42b4f02&units=metric')
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
            <p className="has-text-grey-dark">Temp: {this.state.weatherAll.main.temp} <small>celsius</small></p>
          </div>
          <div className="column is-2">
            <p className="has-text-grey-dark">Humidity: {this.state.weatherAll.main.temp}%</p>
          </div>
        </div>   
      </div>
    </section>
  }
}

export default Weather