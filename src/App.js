import React, { Component } from 'react';
import {GoogleApiWrapper} from 'google-maps-react';
import MapContainer from './MapContainer';
import Sidebar from './Sidebar';
import Hamburger from './Hamburger';
import './App.css';

class App extends Component {
  state = {
      mapMarkers: [],// all the markers
      showingInfoWindow: false, //state of the Info Window: false if closed, true if opened
      selectedMarker: {},//the selected marker object
      markerPhoto: {},// photos for the selected marker
      optionId: '',// the category's id
      sideBarStyle: {display: ''}//style for the sidebar
    }

  //fetches the places to be marked on the map using foursquareAPI
  fetchPlaces = ()=> {
    fetch('https://api.foursquare.com/v2/venues/search?ll=47.6507275,23.5765156&intent=browse&radius=1800&limit=45&categoryId=4bf58dd8d48988d181941735,4bf58dd8d48988d137941735,4bf58dd8d48988d15e941735,4bf58dd8d48988d184941735,4bf58dd8d48988d163941735,4bf58dd8d48988d175941735&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180708')
    .then(result => result.json())
    .then(fetchedPlaces => {
        //if there are items in the venue, adds them to the MapMarkers
        if(fetchedPlaces.response.venues.length >0){
          this.setState({mapMarkers: fetchedPlaces.response.venues});
          console.log (this.state.mapMarkers);
        }else{
          alert("Sorry we couldn't load the data. Please try again");
        }
      }).catch(err => console.log (err));
    }

    //sets the optionId according to the filter option
    onOptionChange = (option) => {
        if (option === 'all'){
          this.setState({optionId: ''});
        } else if (option === 'museum'){
          this.setState({optionId: 'Muzeu'});
        }else if (option === 'theater'){
          this.setState({optionId: 'Teatru'});
        }else if (option === 'stadion'){
          this.setState({optionId: 'Stadion'});
        }else if (option === 'park'){
          this.setState({optionId: 'Parc'});
        }else if (option === 'gym'){
          this.setState({optionId: 'Gym'});
        }
      }


    //when the user clicks on the marker opens the InfoWindow qnd changes marker's icon
    onMarkerClick = (marker, e) => {
      this.setState({
        selectedMarker: marker,
        showingInfoWindow: true,
      });
      this.openInfoWindow(marker.id);
      console.log (this.state.selectedMarker);
      console.log (this.state.showingInfoWindow);
    }

    //fetches the photo for the marker
    openInfoWindow = (markerId) => {
      fetch(`https://api.foursquare.com/v2/venues/${markerId}/photos?&client_id=3T544WQKFOVHSHX5DJW5VOILONS4NQEX0APKY1XSXBZW2EFF&client_secret=0XTVXJHYBHSW3Q55A1MEN1L3HDU1NDARNC0JJ4RPIJPEHFWD&v=20180807`)
      .then(result => result.json())
      .then(fetchedPhotos => {
        if(fetchedPhotos.response.photos !== undefined){
        this.setState({markerPhoto: fetchedPhotos.response.photos});
        };
        console.log(this.state.markerPhoto);
      }).catch(err => console.log (err));
    }

    //when the user clicks on the map hides the infowindow and deselects the marker
    closeInfoWindow = () => {
      // cheks if a infowindow is opened
      if (this.state.showInfoWindow) {
        this.setState({
          showingInfoWindow: false, //closes the window
          selectedMarker: {}, //deselects the marker
          markerPhoto: {},//removes the photos
        })
      }
    }

    //opens and closes the sidebar if the hamburger is clicked
    hideSideBar = () => {
      console.log('menu button clicked');
      if (this.state.sideBarStyle.display === '') {
        //if the sidebar is closed (hidden) makes it visible according to it's initial style
        this.setState({sideBarStyle: {display: 'inherit'}});
      }else{
          //if the sidebar is opened (visible) makes it hiden
        this.setState({sideBarStyle: {display: ''}});
      }
    }

  componentDidMount(){
    this.fetchPlaces();
  }

  render() {
    return (
      <div  tabIndex="0" className="App">
        <header tabIndex="0" aria-label="header of the page">
          <h1 className="mainTitle"> Baia Mare, Romania - Freetime Activities Map </h1>
        </header>
        <main className="main-container">
          <MapContainer
            google={this.props.google}
            showingInfoWindow={this.state.showingInfoWindow}
            selectedMarker={this.state.selectedMarker}
            allMarkers={this.state.mapMarkers}
            markerPhoto={this.state.markerPhoto}
            optionId = {this.state.optionId}
            selectedMarkerIcon = {this.props.selectedMarkerIcon}
            selectedMarkerIndex = {this.props.selectedMarkerIndex}
            activateMarker={this.onMarkerClick}
            closeInfoWindow={this.closeInfoWindow}
          />
          <Hamburger
            clickHandler = {this.hideSideBar}
          />
          <Sidebar
            sideBarStyle={this.state.sideBarStyle}
            allMarkers={this.state.mapMarkers}
            optionId = {this.state.optionId}
            onOptionChange = {this.onOptionChange}
            activateMarker={this.onMarkerClick}
          />
        </main>
        <footer className="app-footer" tabIndex="0" >
          <p>App created for UDACITY-Google Schoolarship Program. Copyright (c) 2018 </p>
          <p>This app uses marker icons from
              <a aria-label="link to marker's icons source" href="https://icons8.com"> Icon pack by Icons8 </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default GoogleApiWrapper({apiKey: 'AIzaSyC9CwH8_ONfHLb98ih45WYibT_bNAcwkPs'})(App);
