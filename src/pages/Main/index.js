/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import MapView from 'react-native-maps';
import { PermissionsAndroid, View } from 'react-native';


const Main = () => (
  <View style={{ flex: 1 }}>
    <MapView
      onMapReady={() => {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
      }}
      style={{ flex: 1 }}
      region={{
        latitude: -19.9640335,
        longitude: -43.993464,
        latitudeDelta: 0.0143,
        longitudeDelta: 0.0134,
      }}
      showsUserLocation
      showsMyLocationButton
    />
  </View>
);

export default Main;
