import React from 'react'
import './App.css'

class Sidebar extends React.Component {
  state = {
    choosedCategory: '', // the category chosed by the user
    optionId: ''// the category's id
  }

onOptionChange = (option) => {
    this.updateState(option);
    this.filterList();
    console.log(this.state.optionId, this.state.choosedCategory);
  }

  updateState = (option) => {
    this.setState({choosedCategory: option});
    return this.state.choosedCategory;
  }

  filterList = () => {
    if (this.state.choosedCategory === 'museum'){
      this.setState({optionId: '4bf58dd8d48988d181941735'});
    }else if (this.state.choosedCategory === 'theater'){
      this.setState({optionId: '4bf58dd8d48988d137941735'});
    }else if (this.state.choosedCategory === 'sport'){
      this.setState({optionId: '4bf58dd8d48988d184941735'});
    }else if (this.state.choosedCategory === 'park'){
      this.setState({optionId: '4bf58dd8d48988d163941735'});
    };
    return this.state.optionId;
}

  componentDidMount(){
    /*this.filterList(); */
    console.log(this.props.allMarkers); /* just for debug purpose */
  }

  render() {
    return(
      <aside className="sidebar-container" style={this.props.sideBarStyle} >
        <div role="group" aria-label="markers filter options" className="marker-filter">
          <h2>Markers Filter</h2>
          <select value={this.state.choosedCategory} aria-label="Choose your preferred activity" tabIndex="-1" className="marker-select" onChange={(event) => this.onOptionChange (event.target.value)}>
            <option value="all">All markers</option>
            <option value="museum">Museums</option>
            <option value="theater">Theaters</option>
            <option value="sport">Sport/Stadions</option>
            <option value="park">Parks</option>
          </select>
        </div>
        <hr></hr>
        <div role="listbox" aria-label="selected markers list" className="list-container">
          <h2 className= "listTitle">Markers List </h2>
          <ol className="marker-list">
            {/*checks the choosedCategory to see if filter is nedded */
              (this.state.choosedCategory === 'all') ? (
                console.log(this.props.allMarkers), /* just for debug purpose */
                this.props.allMarkers.map(m =>{
                    return (
                      <li aria-label="name of the marked place" key={m.id} className="listItem" onClick={(evt) => this.props.activateMarker(evt.target, evt)}>{m.name}</li>
                    )
                })
              ) : (
              /*if needed, filters the markers according to the choosed category */
                this.props.allMarkers.filter(categoryMarker =>
                  categoryMarker.categories[0].id === this.state.optionId
              /*maps over the filtered array and displays a list with all the Markers */
                ).map(m =>{
                  return (
                    <li aria-label="name of the marked place" key={m.id} className="listItem" onClick={(evt) => this.props.activateMarker(evt.target, evt)}>{m.location.name}</li>
                  )
                })
              )
            }
          </ol>
        </div>
      </aside>
    );
  }
}

export default Sidebar;
