import React from 'react'
import axios from 'axios'
import moment from 'moment'

class Forecast extends React.Component {
  constructor() {
    super()
    this.state = {
      dayForecast: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=${process.env.W_API_KEY}&units=metric`)
      .then(resp => {
        const dayForecast = resp.data.list.filter(day => {
          return day.dt_txt.includes('12:00:00')
        })
        this.setState({ 
          dayForecast: dayForecast 
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return <div id="forecastSection" className="section">
      <div className="container hero-body has-bg-img">
        <div className="columns is-multiline is-centered">
          {this.state.dayForecast.map((elem, i) => {
            return <div id="forecastCard" key={i} className="column is-2 has-text-centered">
              <p className="subtitle has-text-white">{moment(elem.dt_txt).format('dddd')}</p>
              <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt=""/>
              <p className="has-text-white">{Math.floor(elem.main.temp)} <small>C</small></p>
            </div>
          })}
        </div>
      </div>
    </div>
  }
}

export default Forecast
