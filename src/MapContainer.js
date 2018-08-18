import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

/* MapContainer component created based on: https://www.npmjs.com/package/google-maps-react
and https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/ */


class MapContainer extends React.Component {
  //alerts the user when the map fails loading due to authentication failure. Method suggested by awesome Udacity comunity :)
  gm_authFailure = () => {
     alert ('You will not be able to see the map. There was an error with your authentication.');
  }

  componentDidMount(){
      window.gm_authFailure = this.gm_authFailure;
  }

  render() {
    return(
      <section className="map-container">
          <Map className="map" role="application" aria-label="Map of Baia Mare, Romania, with places marked on it" google={this.props.google} onClick={this.props.closeInfoWindow} activateMarker={this.props.activateMarker} closeInfoWindow={this.props.closeInfoWindow} appState={this.props.appState} zoom={14.25} initialCenter={{
              lat: 47.6533465,
              lng: 23.5723148
            }}>
            { /*maps over the mapMarkers array and displays each marker on the page*/}
            {this.props.appState.mapMarkers.map(mapMarker => {
                return(
                  <Marker role="button" aria-label="marker of the place" className="placeMarker" onClick={(evt) => this.props.activateMarker(mapMarker, evt)}
                      name={mapMarker.name} position={mapMarker.location.lat, mapMarker.location.lng} icon={{
                        url: this.props.appState.iconURL,
                        anchor: new this.props.google.maps.Point(32,32),
                        scaledSize: new this.props.google.maps.Size(64,64)
                  }} />
                )
              })
            }
            {/* if a marker is selected gnerates the infowindow */}
            { (this.props.appState.selectedMarker.length > 0) ? (
                <InfoWindow onClose={this.props.closeInfoWindow} marker={this.props.appState.selectedMarker}
                    visible={this.props.appState.showInfoWindow}>
                    <div role="contentinfo" aria-label="more informations about the place" className="info">
                        <h3 className="placeName">{this.props.marker.name}</h3>
                        {/* if the selected place has picture displays it */
                        (this.props.marker.categories.icon) ? (
                            <img className="picture" src="`${this.props.marker.categories.icon.prefix}/height36/${this.props.marker.categories.icon.suffix}`" alt= "`${this.props.marker.name}`" />
                        ) : (
                        /* if no, will recive a custom placeholder; placeholder source: 'https://placeholder.com' */
                            <img className="picture" src="http://via.placeholder.com/50x36/ffe99b/282c4b?text=No+Image" alt= "a blank placeholder" />
                        )
                        /* if the selected place has an address displays it */
                        (this.props.marker.location.adress) ? (
                            <span aria-label='address of the selected place' className="address" >{this.props.marker.location.adress}, Baia Mare, Romania</span>
                        ) : (
                        /* if no, only town and country will be displayed */
                            <span aria-label='address of the selected place' className="address" > Baia Mare, Romania</span>
                        )
                        /* if the selected place has a description displays it */
                        (this.props.appState.markerDescription.length > 1) ? (
                            <p role='textbox' aria-label='short description of the place' className="description">{this.props.appState.markerDescription}</p>
                        ) : (
                        /* if no, a message will be displayed */
                            <p role='textbox' aria-label='short description of the place' className="description">For the moment this place has no description provided</p>
                        )
                      }
                    </div>
                </InfoWindow>
              ) : (
                console.log ('there is no selected marker')
              )}
          </Map>
      </section>
    )
  }
}

export default MapContainer;
