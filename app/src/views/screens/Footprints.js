import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

const Footprints = () => {
  const seoulCityHall = { latitude: 37.5662952, longitude: 126.9779451 };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: seoulCityHall.latitude,
          longitude: seoulCityHall.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
        <Marker
          coordinate={seoulCityHall}
          title="서울 시청"
          description="서울의 중심지입니다."
        />
      </MapView>
    </View>
  );
};

export default Footprints;
