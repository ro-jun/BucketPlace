import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Modal } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { captureRef } from 'react-native-view-shot';
import { Alert } from 'react-native';

  const PrintStart = () => {
  const [location, setLocation] = useState(null);
  const [recording, setRecording] = useState(false);
  const [currentRouteCoordinates, setCurrentRouteCoordinates] = useState([]);
  const [savedRoutes, setSavedRoutes] = useState([]); // 저장된 경로 배열
  const locationListenerRef = useRef(null);
  const [newMarkers, setNewMarkers] = useState([]); // 새로운 마커들을 저장할 배열
  const [selectedMarkerIndex, setSelectedMarkerIndex] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [newMarkerName, setNewMarkerName] = useState('');

  useEffect(() => {
    getLocationAsync();
  }, []);

  const handleCaptureScreen = async () => {
    try {
      const result = await captureRef(mapRef, {
        format: 'jpg',
        quality: 0.8,
      });
  
      // 캡처된 이미지는 'result'에 있습니다 (base64 문자열 또는 파일 경로)
      console.log('화면 캡처 완료:', result);
  
      // 캡쳐 완료 메시지 표시
      Alert.alert('캡처 완료', '화면이 성공적으로 캡처되었습니다.');
    } catch (error) {
      console.error('화면 캡처 중 오류 발생:', error);
      // 오류 메시지 표시
      Alert.alert('오류', '화면 캡처 중 오류가 발생했습니다.');
    }
  };

  const getLocationAsync = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('위치 권한이 거부되었습니다.');
        return;
      }

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

              // Send location update to the server
              handleLocationUpdate(location.coords);
          }
        }
      );
    } catch (error) {
      console.error('현재 위치를 가져오는데 실패했습니다:', error);
    }
  };

  const handleLocationUpdate = (updatedLocation) => {
    // Send location data to the server when location updates
    fetch('https://e6ff-120-142-74-163.ngrok-free.app/root', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: updatedLocation.latitude,
        lon: updatedLocation.longitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Location data sent to the server:', data);
      })
      .catch((error) => {
        console.error('Error sending location data:', error);
      });
  };

  const handleStartRecording = () => {
    setRecording(true); // recording을 true로 설정하여 새로운 경로 기록 시작
    setCurrentRouteCoordinates([
      // 현재 위치의 시작점을 포함하여 경로 기록 시작
      {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    ]);
  
    // Send location data to the server when recording starts
    fetch('https://e6ff-120-142-74-163.ngrok-free.app/root', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        lat: location.latitude,
        lon: location.longitude,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Start location data sent to the server:', data);
      })
      .catch((error) => {
        console.error('Error sending start location data:', error);
      });
  };  

  const handleStopRecording = () => {
    setRecording(false);
    if (currentRouteCoordinates.length > 1) {
      setSavedRoutes((prevSavedRoutes) => [
        ...prevSavedRoutes,
        currentRouteCoordinates,
      ]);

      // Send location data to the server
      fetch('https://e6ff-120-142-74-163.ngrok-free.app/root', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lat: currentRouteCoordinates[currentRouteCoordinates.length - 1].latitude,
          lon: currentRouteCoordinates[currentRouteCoordinates.length - 1].longitude,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Location data sent to the server:', data);
        })
        .catch((error) => {
          console.error('Error sending location data:', error);
        });
    } else {
      console.log('Recording stopped. Route too short to save.');
    }
  };

  const handlePlaceMarker = () => {
    if (location && location.latitude && location.longitude) {
      // 현재 위치에 새로운 마커를 찍습니다.
      const newMarker = {
        latitude: location.latitude,
        longitude: location.longitude,
        title: `새로운 마커 #${newMarkers.length + 1}`, // 기본 이름 설정
      };

      setNewMarkers((prevMarkers) => [...prevMarkers, newMarker]);
    }
  };

  const handleMarkerPress = (index) => {
    setSelectedMarkerIndex(index);
    setIsEditModalVisible(true);
    setNewMarkerName(newMarkers[index]?.title || '');
  };

  const handleConfirmMarkerName = (index) => {
    if (index !== null) {
      const updatedMarkers = [...newMarkers];
      updatedMarkers[index].title = newMarkerName;
      setNewMarkers(updatedMarkers);
      setSelectedMarkerIndex(null);
      setIsEditModalVisible(false);
      setNewMarkerName('');

      // 수정된 마커 정보 출력
      const updatedMarker = updatedMarkers[index];
      console.log('Updated marker:', updatedMarker);
    }
  };

  const handleDeleteMarker = (index) => {
    if (index !== null) {
      const updatedMarkers = [...newMarkers];
      updatedMarkers.splice(index, 1); // 선택한 마커 삭제
      setNewMarkers(updatedMarkers);
      setSelectedMarkerIndex(null);
      setIsEditModalVisible(false);
      setNewMarkerName('');
  
      // 삭제된 마커 정보 출력
      console.log('Deleted marker at index', index);
    }
  };

  return (
    <View style={styles.container}>
      {location && (
        <MapView
        ref={(ref) => (mapRef = ref)} // MapView의 참조를 저장
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* 저장된 경로 표시 */}
          {savedRoutes.map((savedRoute, index) => (
            <Polyline
              key={index}
              coordinates={savedRoute}
              strokeWidth={2}
              strokeColor="blue"
            />
          ))}

          {/* 현재 녹화 중이라면 라인 표시 */}
          {recording && currentRouteCoordinates.length > 0 && (
            <Polyline
              coordinates={currentRouteCoordinates}
              strokeWidth={2}
              strokeColor="blue"
            />
          )}

          {/* 새로운 마커 표시 */}
          {newMarkers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.title}
              pinColor="blue"
              onPress={() => handleMarkerPress(index)}
            />
          ))}

          {/* 현재 위치에 마커 표시 위도,경도,title sql 저장하기 */}
          {location.latitude !== null && location.longitude !== null && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="내 위치"
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

      <TouchableOpacity
        style={[styles.button, { top: 70, backgroundColor: 'green' }]}
        onPress={handlePlaceMarker}
      >
        <Text style={styles.buttonText}>현재위치에 마커 찍기</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { top: 120, backgroundColor: 'purple' }]}
        onPress={handleCaptureScreen}
      >
        <Text style={styles.buttonText}>화면 캡처</Text>
      </TouchableOpacity>

      {/* 마커 이름 수정 모달 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isEditModalVisible}
        onRequestClose={() => setIsEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.markerNameInput}
              value={newMarkerName}
              onChangeText={setNewMarkerName}
              placeholder="새로운 마커 이름"
            />
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={() => handleConfirmMarkerName(selectedMarkerIndex)}
            >
              <Text style={styles.buttonText}>확인</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton} // 삭제 버튼 스타일
              onPress={() => handleDeleteMarker(selectedMarkerIndex)} // 삭제 버튼 클릭 핸들러
            >
              <Text style={styles.buttonText}>삭제</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setIsEditModalVisible(false)}
            >
              <Text style={styles.buttonText}>취소</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  markerNameInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  confirmButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: 'red', // 삭제 버튼 배경색
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 5,
  },
});

export default PrintStart;