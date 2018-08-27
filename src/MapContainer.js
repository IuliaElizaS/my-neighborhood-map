import React from 'react';
import {Map, InfoWindow, Marker} from 'google-maps-react';
import './App.css';

/* MapContainer component created based on: https://www.npmjs.com/package/google-maps-react
and https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/  https://developers.google.com/maps/documentation/javascript/examples/hiding-features*/


class MapContainer extends React.Component {
  //alerts the user when the map fails loading due to authentication failure. Method suggested by awesome Udacity comunity :)
  gm_authFailure = () => {
     alert ('You will not be able to see the map. There was an error with the authentication.');
  }

  componentDidMount(){
      window.gm_authFailure = this.gm_authFailure;
  }

  render() {
    const markerIcon = {
      url: "https://png.icons8.com/ultraviolet/40/000000/marker.png",// the icon for the marker on the map,
      anchor: new this.props.google.maps.Point(32,32),
      scaledSize: new this.props.google.maps.Size(32,32)
    };

    const selectedMarkerIcon = {
      url: "https://png.icons8.com/color/48/000000/marker.png",// the icon for the selected marker,
      anchor: new this.props.google.maps.Point(32,32),
      scaledSize: new this.props.google.maps.Size(38,38)
    };

    return(
      <section className="map-container" tabIndex="0">
          <Map
            className="map"
            tabIndex="0"
            role="application"
            aria-label="Map of Baia Mare, Romania, with places marked on it"
            google={this.props.google}
            onClick={this.props.closeInfoWindow}
            selectedMarker = {this.props.selectedMarker}
            allMarkers = {this.props.allMarkers}
            markerPhoto = {this.props.markerPhoto}
            optionId = {this.props.optionId}
            activateMarker={this.props.activateMarker}
            showingInfoWindow = {this.props.showingInfoWindow}
            zoom={14.25}
            initialCenter={{
              lat: 47.6573916,
              lng: 23.5652344
            }}
            styles = {[{
              featureType: 'poi',
              stylers: [{'visibility': 'off'}]
            }]}
          >
          {/* displays the markers on the page according to the user option */}
            {this.props.allMarkers.filter(marker => marker.name.indexOf(this.props.optionId) > -1)
            .map(mapMarker => {
                return (
                  <Marker
                      className="placeMarker"
                      tabIndex="0"
                      role="button"
                      aria-label="marker of the place"
                      key= {mapMarker.id}
                      selectedMarker = {this.props.selectedMarker}
                      showingInfoWindow={this.props.showingInfoWindow}
                      markerPhoto = {this.props.markerPhoto}
                      onClick={(evt) => this.props.activateMarker(mapMarker, evt)}
                      name={mapMarker.name}
                      position={{
                        lat: mapMarker.location.lat,
                        lng: mapMarker.location.lng
                      }}
                      icon={this.props.selectedMarker !== undefined && this.props.selectedMarker.id === mapMarker.id ? selectedMarkerIcon : markerIcon}
                      >
                    {/* if a marker is selected populates the InfoWindow */}
                    (this.props.selectedMarker) ? (
                      return (
                        <div>
                          {<InfoWindow
                            visible={this.props.showingInfoWindow}
                            markerPhoto = {this.props.markerPhoto}
                            >
                             {<dialog className="info" aria-label="more informations about the place" >
                                <h3 className="placeName">{mapMarker.name}</h3>
                                <p aria-label='address of the selected place' className="address" > {mapMarker.location.address} Baia Mare, Romania</p>
                                {/* if the selected place has picture displays it, else provides a placeholder. Placeholder source: 'https://placeholder.com' */}
                                  {(this.props.markerPhoto.items !== undefined && this.props.markerPhoto.items.length >0) ? (
                                    <img className="picture" src= {`${this.props.markerPhoto.items[0].prefix}height36${this.props.markerPhoto.items[0].suffix}`} alt= {mapMarker.name}/>
                                  ) : (
                                    <img className="picture" src="http://via.placeholder.com/50x36/ffe99b/282c4b?text=No+Image" alt= "a blank placeholder"/>
                                  )}
                                </dialog>
                              }
                            </InfoWindow>
                           }
                          </div>
                          )
                        ) : (
                        console.log ('no infowindow to display')
                      ),
                  </Marker>
                )
              })
             }
            </Map>
        </section>
    )
  }
}

export default MapContainer;
