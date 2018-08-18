import React from 'react'
import './App.css'

class Hamburger extends React.Component {

  render() {
    return(
      <div role= "button" aria-label="button to open the sidebar" className="menu" onClick={this.props.clickHandler}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>
    )
  }
}

export default Hamburger;
