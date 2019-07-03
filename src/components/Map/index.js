/* eslint-disable react-native/split-platform-components */
/* eslint-disable react-native/no-inline-styles */

import React from 'react';
import MapView from 'react-native-maps';
import { PermissionsAndroid, View } from 'react-native';
import Geocoder from 'react-native-geocoding';
// import { Container } from './styles';

export default class Map extends React.Component {
  state = {
    region: {
      latitude: -19.9640335,
      longitude: -43.993464,
      latitudeDelta: 0.0143,
      longitudeDelta: 0.0134,
    },
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
      () => {}, // erro
      {
        timeout: 2000,
        enableHighAccuracy: false,
        maximumAge: 1000,
      },
    );
  }

  render() {
    const { region } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          region={region}
          showsMyLocationButton
          showsUserLocation
          loadingEnabled

        />
      </View>
    );
  }
}
