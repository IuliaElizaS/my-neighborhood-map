import React from 'react'
import './App.css'
import Hamburger from './Hamburger'

class Sidebar extends React.Component {

  //filters the list of markers according to the selected option
  filterList = (option) => {
      let optionMarkers;
      if (option === 'all'){
        optionMarkers = this.props.appState.mapMarkers;
      }else{
        optionMarkers = this.props.appState.mapMarkers.filter(marker => marker.markerType === option);
      };
      return optionMarkers;
  }

  render() {
    return(
      <aside className="sidebar-container">
        <div role="group" aria-label="markers filter options" className="marker-filter">
          <h2>Markers Filter</h2>
          <select value="all" aria-label="Choose your preferred activity" tabindex="-1" className="marker-select" onChange={(event) => this.filterList (event.target.value)}>
            <option value="all">All markers</option>
            <option value="museum">Museums</option>
            <option value="park">Parks</option>
            <option value="cinema">Cinemas</option>
            <option value="theater">Theaters</option>
          </select>
        </div>
        <hr>
        <div role="listbox" aria-label="selected markers list" className="list-container">
          <h2>Markers List</h2>
          <ol className="marker-list">
            {//maps over the optionMarkers array and displays a list with all the Markers in the array
              optionMarkers.map(m =>{
                  return (
                    <li aria-label="name of the marked place" key={m.venue.id} className="listItem" onclick={(evt) => this.props.activateMarker(m, evt)}>{m.venue.name}</li>
                  )
              })
            }
          </ol>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
