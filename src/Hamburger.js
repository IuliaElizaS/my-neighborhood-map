import React from 'react'
import './App.css'

class Hamburger extends React.Component {

  render() {
    return(
      <div className="menu" tabIndex="0" role= "button" aria-label="button to open the sidebar" onClick={this.props.clickHandler}>
        <div className="line" tabIndex="-1"></div>
        <div className="line" tabIndex="-1"></div>
        <div className="line" tabIndex="-1"></div>
      </div>
    )
  }
}

export default Hamburger;
