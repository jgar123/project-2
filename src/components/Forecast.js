import React from 'react'
import axios from 'axios'
import moment from 'moment'

class Forecast extends React.Component {
  constructor() {
    super()
    this.state = {
      fullForecast: [],
      dayForecast: []
    }
  }

  componentDidMount() {
    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=8256de24dbdf6fd7e79723bdc42b4f02&units=metric')
      .then(resp => {
        const dayForecast = resp.data.list.filter(day => {
          return day.dt_txt.includes('12:00:00')
        })
        this.setState({ 
          fullForecast: resp.data.list,
          dayForecast: dayForecast 
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    return <div className="section">
      <div className="container">
        <div className="columns is-multiline">
          {this.state.dayForecast.map((elem, i) => {
            return <div key={i} className="column is-2 has-text-centered">
              <p className="subtitle">{moment(elem.dt_txt).format('dddd')}</p>
              <img src={`http://openweathermap.org/img/wn/${elem.weather[0].icon}@2x.png`} alt=""/>
              <p>{elem.main.temp} <small>C</small></p>
            </div>
          })}
        </div>
      </div>
    </div>
  }
}

export default Forecast
