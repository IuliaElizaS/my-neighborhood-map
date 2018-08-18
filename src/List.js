import React from 'react'
import './App.css'

class List extends React.Component {

  render() {
    return(
      <div role="" aria-label="selected markers list" className="list-container">
        <ol className="marker-list">
          {/* filtreaza lista de markeri apoi fa map peste ea si genereaza fiecare marker
            <li key="">
              nume marker + iconita
            </li> */}
            <li>markeri</li>
        </ol>
      </div>
    )
  }
}

export default List;
