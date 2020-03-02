import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import 'bulma'
import './styles/style.scss'

import Articles from './components/Articles'
import SingleArticle from './components/SingleArticle'
import Navbar from './components/Navbar'
import Weather from './components/Weather'
import Forecast from './components/Forecast'

const App = () => (
  <BrowserRouter basename="/">
    <Navbar />
    <Weather />
    <Switch>
      <Route exact path="/" component={Articles} />
      <Route exact path="/article/:id" component={SingleArticle} />
      <Route exact path="/forecast" component={Forecast} />
    </Switch>
    <div className="footer" id="foot">
      <p>Powered by <strong>News API</strong></p>
    </div>
  </BrowserRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)