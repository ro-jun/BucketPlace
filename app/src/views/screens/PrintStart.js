import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const PrintStart = () => {
  const [location, setLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
      // 위치 권한 요청
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }

      // 위치 변경 이벤트 리스너 등록
      Location.watchPositionAsync(
        {
          distanceInterval: 10, // 10 미터마다 위치 변경 이벤트 발생
        },
        (location) => {
          // 현재 위치 정보 업데이트
          setLocation(location.coords);

          // 경로 업데이트
          setRouteCoordinates((prevCoordinates) => [
            ...prevCoordinates,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ]);
        }
      );
    } catch (error) {
      console.error('현재 위치를 가져오는데 실패했습니다:', error);
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="내 위치"
          />
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={2}
            strokeColor="blue"
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },
});

export default PrintStart;
