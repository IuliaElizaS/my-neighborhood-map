import React from 'react'
import './App.css'

class Sidebar extends React.Component {

  componentDidMount(){
    console.log(this.props.allMarkers); /* just for debug purpose */
  }

  render() {
    return(
      <aside className="sidebar-container" tabIndex="0" style={this.props.sideBarStyle} >
        <div role="group" aria-label="markers filter options" className="marker-filter">
          <h2>Markers Filter</h2>
          <select aria-label="Choose your preferred activity"
                  tabIndex="0"
                  className="marker-select"
                  onChange={(event) => this.props.onOptionChange (event.target.value)}>
              <option value="all">All markers</option>
              <option value="museum">Museums</option>
              <option value="theater">Theaters</option>
              <option value="park">Parks</option>
              <option value="stadion">Stadions</option>
              <option value="gym">Fittness/Gym</option>
          </select>
        </div>
        <hr></hr>
        <div role="listbox" aria-label="selected markers list" className="list-container">
          <h2 className= "listTitle">Markers List </h2>
          <ol className="marker-list">
            {/* Displays a list with the Markers according to the selected filter option */
              this.props.allMarkers.filter(marker => marker.name.indexOf(this.props.optionId) > -1)
              .map(m =>{
                return (
                    <li className="listItem"
                        tabIndex="0"
                        aria-label="name of the marked place"
                        key={m.id}
                        onClick={(evt) => this.props.activateMarker(m, evt)}>{m.name}
                    </li>
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
