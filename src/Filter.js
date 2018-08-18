import React from 'react'
import './App.css'

class Filter extends React.Component {

  render() {
    return(
      <div role="group" aria-label="markers filter options" className="marker-filter">
        <h2>Markers Filter</h2>
        <select value="all" aria-label="Choose your preferred activity" tabindex="-1" id="marker-select">
          <option value="all">All markers</option>
          <option value="museum">Museums</option>
          <option value="history">Historical Places</option>
          <option value="park">Parks</option>
          <option value="play-ground">Playgrounds</option>
          <option value="cinema">Cinema</option>
          <option value="theater">Theaters</option>
        </select>
      </div>
    )
  }
}

export default Filter;
