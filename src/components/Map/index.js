/* eslint-disable react-native/split-platform-components */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View, Image } from 'react-native';
import styles , {customMap }from './styles';
 import places from '../../mock/places';
// import Geocoder from 'react-native-geocoding';
// import { Container } from './styles';
const BarIcon = require('./beer.png')

export default class Map extends React.Component {
  state = {
    marginBottom: 1,
    region: {
      latitude: -19.9640335,
      longitude: -43.993464,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    deltaDefault:{
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    }
    ,
    places:[]

  };
  calculateDistance(lat1, lon1, lat2, lon2, unit) {
    var radlat1 = Math.PI * lat1/180
    var radlat2 = Math.PI * lat2/180
    var radlon1 = Math.PI * lon1/180
    var radlon2 = Math.PI * lon2/180
    var theta = lon1-lon2
    var radtheta = Math.PI * theta/180
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist)
    dist = dist * 180/Math.PI
    dist = dist * 60 * 1.1515
    if (unit=="K") { dist = dist * 1.609344 }
    if (unit=="N") { dist = dist * 0.8684 }
    return dist
  }

  async componentDidMount() {
    await navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        // const response = await Geocoder.from({ latitude, longitude });
        // const address = response.results[0].formatted_address;
        // const location = address.substring(0, address.indexOf(','));

        this.setState({
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
        });
        this.setState({
          places: places.map(place=>({
            ...place, 
            distance:this.calculateDistance(latitude, longitude,place.location.latitude, place.location.longitude, 'k')}))
            .sort((a,b)=>(a.distance-b.distance))
        });
      }, // sucesso
      () => { }, // erro
      {
        timeout: 2000,
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );

  }

  render() {
    const { region, marginBottom } = this.state;
    return (
      <View style={styles.map}>
        <MapView
        customMapStyle={customMap}
        onRegionChangeComplete={x=>console.log(x)}
          onMapReady={() => {
            PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            ).then(() => {
              this.setState({ marginBottom: 0 });
            });
          }}
          style={{ ...styles.map, marginBottom }}
          region={region}
          showsMyLocationButton
          showsUserLocation
          loadingEnabled

        >
          {this.state.places.map(place => (
            <Marker
              key={place.key}
              coordinate={place.location}
              title={place.name}
              description={`distancia: ${place.distance.toFixed(3)}`}       
            >
              <Image
                source={BarIcon}
                style={{height: 40, width: 40}}
            />
              </Marker>
          ))}
        </MapView>
      </View>
    );
  }
}
