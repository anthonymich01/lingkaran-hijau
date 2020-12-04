import React from "react"
import "./Footer.scss"

class Footer extends React.Component {
  render() {
    return (
      <p className="footer">
        Circles Code Challenge by{" "}
        <a href="https://www.linkedin.com/in/anthonymich01/" target="_blank" rel="noreferrer">
          <span>Anthony Michael</span>
        </a>
      </p>
    )
  }
}

export default Footer
