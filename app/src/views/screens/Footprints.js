import React, { useState, useRef } from 'react';
import { View, TextInput, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row', // 검색창 옆에 버튼을 배치하기 위해 가로 방향으로 정렬합니다.
    alignItems: 'center', // 검색창과 버튼을 세로 방향으로 중앙 정렬합니다.
  },
  searchInput: {
    flex: 1, // 검색창이 남은 공간을 모두 차지하도록 설정합니다.
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  searchButton: {
    marginLeft: 8, // 검색창과 버튼 사이의 간격을 조정합니다.
    padding: 10,
    backgroundColor: '#007AFF', // 버튼 배경색
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff', // 버튼 텍스트 색상
  },
  listItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  calloutContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  calloutAddress: {
    fontSize: 14,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#007AFF',
    marginTop: 10,
    padding: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

const Footprints = () => {
  const seoulCityHall = { latitude: 37.5662952, longitude: 126.9779451 };
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showList, setShowList] = useState(false); // 검색 결과 리스트를 보여줄지 여부를 저장하는 state 변수
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 마커 정보를 저장하는 state 변수
  const mapRef = useRef(null);

  const handleSearch = () => {
    const googleMapApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=AIzaSyDj6P9AGKAATc2EIFxhUvgyYvnTpZJZPik`;
    fetch(googleMapApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          setSearchResults(data.results);
          if (data.results.length > 0 && mapRef.current) {
            const firstResult = data.results[0];
            const latitude = firstResult.geometry.location.lat;
            const longitude = firstResult.geometry.location.lng;

            mapRef.current.animateToRegion({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }
        } else {
          console.log('검색에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('구글 지도 API 요청 오류:', error);
      });
  };

  const handleChangeText = (text) => {
    setSearchText(text);
    const googleMapApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=YOUR_GOOGLE_MAPS_API_KEY`;
    fetch(googleMapApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          setSearchResults(data.results);
        } else {
          console.log('검색에 실패했습니다.');
        }
      })
      .catch((error) => {
        console.error('구글 지도 API 요청 오류:', error);
      });
  };

  const handlePoiClick = (event) => {
    setSearchResults([]);
    const latitude = event.nativeEvent.coordinate.latitude;
    const longitude = event.nativeEvent.coordinate.longitude;
    mapRef.current.animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  const handleMarkerPress = (event, place) => {
    setSelectedPlace(place);
  };

  const handleSaveButtonPress = () => {
    if (selectedPlace) {
      // 여기에서 선택한 장소 정보를 저장하는 로직을 구현합니다.
      // 예를 들어, AsyncStorage나 서버에 저장하는 등의 작업을 수행할 수 있습니다.
      console.log('선택한 장소 정보 저장:', selectedPlace);
    }
  };

  const handleSearchButtonPress = () => {
    handleSearch();
    setShowList(false);
  };

  const handleSearchInputFocus = () => {
    setShowList(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={handleChangeText}
          placeholder="지역을 검색하세요"
          onSubmitEditing={handleSearchButtonPress}
          onFocus={handleSearchInputFocus}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchButtonPress}>
          <Text style={styles.buttonText}>검색</Text>
        </TouchableOpacity>
      </View>
      {showList && searchResults.length > 0 && (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.place_id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.listItem}
              onPress={() => handleListItemPress(item)}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      )}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={{
          latitude: seoulCityHall.latitude,
          longitude: seoulCityHall.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPoiClick={handlePoiClick}
      >
        {searchResults.map((place, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: place.geometry.location.lat,
              longitude: place.geometry.location.lng,
            }}
            title={place.name}
            description={place.formatted_address}
            onPress={(event) => handleMarkerPress(event, place)} // 마커를 누를 때 선택된 장소 정보를 저장합니다.
          >
            <Callout>
              <View style={styles.calloutContainer}>
                <Text style={styles.calloutTitle}>{place.name}</Text>
                <Text style={styles.calloutAddress}>{place.formatted_address}</Text>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveButtonPress}>
                  <Text style={styles.saveButtonText}>save place</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default Footprints;
