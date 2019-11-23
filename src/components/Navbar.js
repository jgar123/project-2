import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return <div className="navbar" style={{ backgroundColor: '#06B76D' }}>
    <div className="container">
      <div className="navbar-brand">
        <Link style={{ fontFamily: 'Lobster, cursive' }} className="navbar-item title has-text-white is-1" to="/">NewsMe</Link>
      </div>
    </div>
  </div>
}

export default Navbar