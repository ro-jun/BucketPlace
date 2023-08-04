import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
  },
  searchInput: {
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
});

const Footprints = () => {
  const seoulCityHall = { latitude: 37.5662952, longitude: 126.9779451 };
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    // 구글 지도 API를 사용하여 지역 검색을 수행하는 코드를 추가합니다.
    const googleMapApiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchText}&key=AIzaSyDj6P9AGKAATc2EIFxhUvgyYvnTpZJZPik`;
    fetch(googleMapApiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'OK') {
          // 검색 결과를 이용하여 검색 결과 배열 업데이트
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
    // 마커를 클릭할 때의 동작을 정의할 수 있습니다.
    // 이 예시에서는 마커 클릭 시 검색 결과를 모두 지우는 동작을 수행합니다.
    setSearchResults([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          placeholder="지역을 검색하세요"
          onSubmitEditing={handleSearch}
        />
      </View>
      <MapView
        style={styles.map}
        region={{
          latitude: seoulCityHall.latitude,
          longitude: seoulCityHall.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPoiClick={handlePoiClick} // 마커 클릭 이벤트 추가
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
          />
        ))}
      </MapView>
    </View>
  );
};

export default Footprints;
