import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer'
import Sidebar from './Sidebar'
import Hamburger from './Hamburger'
import './App.css';

class App extends Component {
  state = {
      mapMarkers: [],// all the markers
      museums: [], //museums markers
      parks: [],//parks markers
      cinemas: [],//cinema markers
      theaters: [],//theaters markers
      showInfoWindow: false, //state of the Info Window: false if closed, true if opened
      selectedMarker: {},//the selected marker object
      iconURL: "https://png.icons8.com/ultraviolet/40/000000/marker.png",// the icon for the marker on the map
      markerDescription: '',// details for the selected marker
      sideBarStyle: {display: 'block'}//style for the sidebar
    }

    //fetches the places to be marked on the map using foursquareAPI
    fetchPlaces = () => {
        this.fetchMuseums();
        this.fetchCinemas();
        this.fetchParks();
        this.fetchTheaters();
      }

    //fetches the museums in the area
    fetchMuseums = () => {
        fetch('https://api.foursquare.com/v2/venues/search?ll=47.6507275,23.5765156&intent=browse&radius=1500&query=muzeu&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180708')
        .then(result => result.json())
        .then(fetchedMuseums => {
            //if there are items in the venue, adds them to the museums state
            if(fetchedMuseums.response.venues.length >0){
              this.setState({museums: fetchedMuseums.response.venues});
              //also sets a new proprety 'markerType' for each venue
              this.state.museums.forEach(item => {
                  item.markerType = 'museum';
              });
              return this.state.museums;
            }else{
              alert("Sorry we couldn't load the data for Museums. Please try again");
            }
          }).catch(err => console.log (err));
      }

    //fetches the cinemas in the area
    fetchCinemas = () => {
        fetch('https://api.foursquare.com/v2/venues/search?ll=47.6507275,23.5765156&intent=browse&radius=2000&query=cinema&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180708')
        .then(result => result.json())
        .then(fetchedCinemas => {
            //if there are items in the venue, adds them to the cinemas state
            if(fetchedCinemas.response.venues.length >0){
              this.setState({cinemas: fetchedCinemas.response.venues});
              this.state.cinemas.forEach(item => {
                  item.markerType = 'cinema';
              });
              return this.state.cinemas;
            }else{
              alert("Sorry we couldn't load the data for Cinemas. Please try again");
            }
          }).catch(err => console.log (err));
      }

    //fetches the parks in the area
    fetchParks = () => {
        fetch('https://api.foursquare.com/v2/venues/search?ll=47.6507275,23.5765156&intent=browse&radius=2000&query=parcul&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180708')
        .then(result => result.json())
        .then(fetchedParks => {
            //if there are items in the venue, adds them to the parks state
            if(fetchedParks.response.venues.length >0){
              this.setState({parks: fetchedParks.response.venues});
              this.state.parks.forEach(item => {
                item.markerType = 'park';
              });
              return this.state.parks;
            }else{
              alert("Sorry we couldn't load the data for Parks. Please try again");
            }
          }).catch(err => console.log (err));
      }

      //fetches the theaters in the area
      fetchTheaters = () => {
        fetch('https://api.foursquare.com/v2/venues/search?ll=47.6507275,23.5765156&intent=browse&radius=1500&query=teatru&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180708')
        .then(result => result.json())
        .then(fetchedTheaters => {
            //if there are items in the venue, adds them to the parks state
            if(fetchedTheaters.response.venues.length >0){
              this.setState({theaters: fetchedTheaters.response.venues});
              this.state.theaters.forEach(item => {
                item.markerType = 'theater';
              });
              return this.state.theaters;
            }else{
              alert("Sorry we couldn't load the data for Theaters. Please try again");
            }
          }).catch(err => console.log (err));
      }

    //when all the data are fetched updates the mapMarkers state
    updateState = () => {
      this.fetchPlaces();
      //creates one array for all the fetched data using spread sintax
      let allMarkers= [...this.state.museums, ...this.state.parks, ...this.state.cinemas, ...this.state.theaters];
      //and adds it to the state
      this.setState({mapMarkers: allMarkers});
    }


    //when the user clicks on the marker opens the InfoWindow qnd changes marker's icon
    onMarkerClick = (marker, e) => {
      this.setState({
        selectedMarker: marker,
        showInfoWindow: true,
        iconURL: "https://png.icons8.com/color/48/000000/marker.png"
      });
      this.openInfoWindow(this.state.selectedMarker.venue.id);
    }

    //fetches the description for the marker
    openInfoWindow = (markerId) => {
      fetch(`https://api.foursquare.com/v2/venues/${markerId}?&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180807`)
      .then(result => result.json())
      .then(fetchedDetails => {
        //if the result contains a description, adds it to the parks state
        if(fetchedDetails.response.venues.description){
            this.setState({markerDescription: fetchedDetails.response.venues.description});
        }
      }).catch(err => console.log (err));
    }

    //when the user clicks on the map or InfoWindow's close button hides the infowindow and deselects the marker
    closeInfoWindow = () => {
      // cheks if a infowindow is opened
      if (this.state.showInfoWindow) {
        this.setState({
          showInfoWindow: false, //closes the window
          selectedMarker: null, //deselectes the marker
          markerDescription: '',//empties the details string
          iconURL: "https://png.icons8.com/ultraviolet/40/000000/marker.png" //sets the marker icon to it's original icon
        })
      }
    }

    //opens and closes the sidebar if the hamburger is clicked
    hideSideBar = () => {
      console.log('menu button clicked');
      if (this.state.sideBarStyle.display === 'none') {
        //if the sidebar is closed (hidden) makes it visible according to it's initial style
        this.setState({sideBarStyle: {display: 'block'}});
      }else{
          //if the sidebar is opened (visible) makes it hiden
        this.setState({sideBarStyle: {display: 'none'}});
      }
      /*return this.state.sideBarStyle;*/
    }

  componentDidMount(){
    this.updateState();
  }

  render() {
    return (
      <div className="App">
        <header aria-label="header of the page">
          <h1 className="mainTitle"> Baia Mare, Romania - Freetime Activities Map </h1>
        </header>
        <main className="main-container">
          <Hamburger clickHandler = {this.hideSideBar}/>
          <Sidebar sideBarStyle={this.state.sideBarStyle} appState={this.state} activateMarker={this.onMarkerClick}/>
          <MapContainer style={this.state.mapContainerStyle} google={this.props.google} appState={this.state} activateMarker={this.onMarkerClick} closeInfoWindow={this.closeInfoWindow}/>
        </main>
        <footer className="app-footer">
          <p>App created for UDACITY-Google Schoolarship Program. Copyright (c) 2018 </p>
          <p>This app uses marker icons from
              <a aria-label="link to marker's icons source" href="https://icons8.com"> Icon pack by Icons8 </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyChc63cHsVUo0L-UUrBYIEFF1BQGTsjyUY'})(App);
