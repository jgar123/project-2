import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <div className="navbar">
    <div className="container">
      <div className="navbar-brand">
        <Link className="navbar-item title" to="/">Home</Link>
        <Link className="navbar-item subtitle" to="/forecast">Forecast</Link>
      </div>
    </div>
  </div>
}

export default Navbar