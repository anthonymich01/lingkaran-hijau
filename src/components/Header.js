import React from "react"
import { Link } from "react-router-dom"
import "./Header.scss"

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <h1 className="title">
          <Link to="/">
            <img src="/logo192.png" className="logo" alt="logo" />
            Lingkaran Hijau
          </Link>
        </h1>
      </div>
    )
  }
}

export default Header
