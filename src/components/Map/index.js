/* eslint-disable react-native/split-platform-components */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { PermissionsAndroid, View } from 'react-native';
import styles from './styles';
// import { places } from '../../mock/places';
// import Geocoder from 'react-native-geocoding';
// import { Container } from './styles';

export default class Map extends React.Component {
  state = {
    marginBottom: 1,
    region: {
      latitude: -19.9640335,
      longitude: -43.993464,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
    places: [{
      key: 1,
      name: 'Restaurante 1',
      description: 'Restaurante com rodizio de carnes e chop gelado',
      rating: [],
      location: {
        latitude: -19.9664297,
        longitude: -43.9957961,
      },
      beer: 5.50,
    },
    {
      key: 2,
      name: 'Restaurante 2',
      description: 'Restaurante de comida japonesa com rodizio e chop.',
      rating: [],
      location: {
        latitude: -19.9648468,
        longitude: -43.9933418,
      },
      beer: 5.50,
    },
    ],

  };

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
    const { region, marginBottom, places } = this.state;
    return (
      <View style={styles.map}>
        <MapView
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
          {places.map(place => (
            <Marker
              key={place.key}
              coordinate={place.location}
              title={place.name}
              description={place.description}
            />
          ))}
        </MapView>
      </View>
    );
  }
}
