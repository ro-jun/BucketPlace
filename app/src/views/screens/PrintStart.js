<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
=======
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';

const PrintStart = () => {
  const [location, setLocation] = useState(null);
<<<<<<< HEAD
  const [routeCoordinates, setRouteCoordinates] = useState([]);
=======
  const [recording, setRecording] = useState(false);
  const [currentRouteCoordinates, setCurrentRouteCoordinates] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]); // 저장된 경로 배열
  const locationListenerRef = useRef(null);
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295

  useEffect(() => {
    getLocationAsync();
  }, []);

  const getLocationAsync = async () => {
    try {
<<<<<<< HEAD
      // 위치 권한 요청
=======
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }

<<<<<<< HEAD
      // 위치 변경 이벤트 리스너 등록
      Location.watchPositionAsync(
        {
          distanceInterval: 10, // 10 미터마다 위치 변경 이벤트 발생
        },
        (location) => {
          // 현재 위치 정보 업데이트
          setLocation(location.coords);

          // 경로 업데이트
        setRouteCoordinates((prevCoordinates) => {
          const newCoordinates = [
            ...prevCoordinates,
            {
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            },
          ];

          // 경로 좌표를 로그로 출력 sql 연동 위치
          console.log('New Coordinates:', newCoordinates);
          console.log('New Latitude:', location.coords.latitude);
          console.log('New Longitude:', location.coords.longitude);

          return newCoordinates;
        });
      }
    );
=======
      locationListenerRef.current = Location.watchPositionAsync(
        {
          distanceInterval: 10,
        },
        (location) => {
          setLocation(location.coords);

          if (recording) {
            setCurrentRouteCoordinates((prevCoordinates) => [
              ...prevCoordinates,
              {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
            ]);
          }
        }
      );
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
    } catch (error) {
      console.error('현재 위치를 가져오는데 실패했습니다:', error);
    }
  };

<<<<<<< HEAD
=======
  const handleStartRecording = () => {
    setRecording(true); // recording을 true로 설정하여 새로운 경로 기록 시작
    setCurrentRouteCoordinates([
      // 현재 위치의 시작점을 포함하여 경로 기록 시작
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    ]);
  };

  const handleStopRecording = () => {
    setRecording(false); // recording을 false로 설정하여 경로 기록 중단
    if (currentRouteCoordinates.length > 1) {
      // 경로가 최소 2개 이상일 때 (시작점과 종료점), 저장된 경로에 추가
      setSavedRoutes((prevSavedRoutes) => [
        ...prevSavedRoutes,
        currentRouteCoordinates,
      ]);
    }
  };

>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
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
<<<<<<< HEAD
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={2}
            strokeColor="blue"
          />
        </MapView>
      )}
=======
          {savedRoutes.map((savedRoute, index) => (
            <Polyline
              key={index}
              coordinates={savedRoute}
              strokeWidth={2}
              strokeColor="blue"
            />
          ))}
          {recording && currentRouteCoordinates.length > 0 && (
            <Polyline
              coordinates={currentRouteCoordinates}
              strokeWidth={2}
              strokeColor="blue"
            />
          )}
        </MapView>
      )}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: recording ? 'red' : 'blue' }]}
        onPress={recording ? handleStopRecording : handleStartRecording}
      >
        <Text style={styles.buttonText}>
          {recording ? 'recording stop' : 'recording start'}
        </Text>
      </TouchableOpacity>
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
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
<<<<<<< HEAD
=======
  button: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
>>>>>>> e42e3ab73dcc772123e9d1c6c9481b65c070d295
});

export default PrintStart;