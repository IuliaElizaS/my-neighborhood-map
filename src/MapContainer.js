import React from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import './App.css';

/* MapContainer component created based on: https://www.npmjs.com/package/google-maps-react
and https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/  https://developers.google.com/maps/documentation/javascript/examples/hiding-features*/


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
          <Map
            className="map"
            role="application"
            aria-label="Map of Baia Mare, Romania, with places marked on it"
            google={this.props.google}
            onClick={this.props.closeInfoWindow}
            selectedMarker = {this.props.selectedMarker}
            allMarkers = {this.props.allMarkers}
            markerIcon = {this.props.markerIcon}
            markerDescription = {this.props.markerDescription}
            activateMarker={this.props.activateMarker}
            closeInfoWindow={this.props.closeInfoWindow}
            infoVisibility = {this.props.infoVisibility}
            zoom={14.25}
            initialCenter={{
              lat: 47.6573916,
              lng: 23.5652344
            }}
            styles = {[{
              featureType: 'poi',
              stylers: [{'visibility': 'off'}]
          }]} >
            { /*displays each marker on the page*/
              this.props.allMarkers.map(mapMarker => {
                return(
                <div key= {mapMarker.id}>
                  <Marker
                      key= {mapMarker.location.lng}
                      role="button"
                      aria-label="marker of the place"
                      className="placeMarker"
                      markerIcon = {this.props.markerIcon}
                      onClick={(evt) => this.props.activateMarker(mapMarker, evt)}
                      name={mapMarker.name}
                      position={{
                        lat: mapMarker.location.lat,
                        lng: mapMarker.location.lng
                      }}
                      icon={{
                         url: this.props.markerIcon,
                         anchor: new this.props.google.maps.Point(32,32),
                         scaledSize: new this.props.google.maps.Size(35,35)
                    }}/>
                    <InfoWindow
                        key= {mapMarker.location.lat}
                        onClose={this.props.closeInfoWindow}
                        visible={this.props.infoVisibility}
                        markerDescription = {this.props.markerDescription}
                    >
                        <div role="contentinfo" aria-label="more informations about the place" className="info">
                            <h3 className="placeName">{mapMarker.name}</h3>
                            {/* if the selected place has picture displays it, else provides a placeholder. Placeholder source: 'https://placeholder.com' */
                            (mapMarker.categories[0].icon) ? (
                                <img className="picture" src="{mapMarker.categories[0].icon.prefix}/height36/{mapMarker.categories[0].icon.suffix}" alt= "{mapMarker.location.name}"/>
                            ) : (
                                <img className="picture" src="http://via.placeholder.com/50x36/ffe99b/282c4b?text=No+Image" alt= "a blank placeholder"/>
                            )
                            /* if the selected place has an address displays it, else only town and country will be displayed  */
                            (mapMarker.location.address) ? (<span aria-label='address of the selected place' className="address" >{mapMarker.location.address}, Baia Mare, Romania</span>
                            ) : (
                                <span aria-label='address of the selected place' className="address" > Baia Mare, Romania</span>
                            )
                            /* if the selected place has a description displays it */
                            (this.props.markerDescription.length > 1) ? (<p role='textbox' aria-label='short description of the place' className="description">{this.props.markerDescription}</p>
                            ) : (
                                <p role='textbox' aria-label='short description of the place' className="description">For the moment this place has no description provided</p>
                            )}
                          </div>
                      </InfoWindow>
                    </div>
                  )
                })
              }
            </Map>
        </section>
    )
  }
}

export default MapContainer;
