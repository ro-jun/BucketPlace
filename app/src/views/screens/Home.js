import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card } from 'react-native-elements';
import { Agenda } from 'react-native-calendars';
import axios from 'axios';

const FestivalScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [festivalData, setFestivalData] = useState([]);
  const [items, setItems] = useState({});

  useEffect(() => {
    const fetchFestivalData = async (date) => {
      try {
        const response = await axios.get(
          'http://api.data.go.kr/openapi/tn_pubr_public_cltur_fstvl_api',
          {
            params: {
              authKey: '3Q4YOF/wpptIJpHlQch8hcX+Z017/bFAHLVFjNa1UAhnIGOGkapnR9O/WCesQiZ+jnmk18bTObj9Uuwh9XnOdg==', // 본인의 인증키로 대체
              pageNo: 1,
              numOfRows: 10,
              evtYmd: date, // 선택한 날짜를 API 요청에 전달
            },
          }
        );

        console.log('API Response:', response.data);

        const fetchedData = response.data; // API 응답 데이터 처리
        setFestivalData(fetchedData); // 축제 데이터 설정

        const updatedItems = {}; // Agenda 컴포넌트에 사용할 items 객체 생성

        fetchedData.forEach((festival) => {
          const formattedDate = festival.date.replace(/\./g, '-');
          if (!updatedItems[formattedDate]) {
            updatedItems[formattedDate] = [];
          }
          updatedItems[formattedDate].push({
            name: festival.name,
            location: festival.location,
          });
        });

        setItems(updatedItems); // items 객체 설정
      } catch (error) {
        console.error('Error fetching festival data:', error);
      }
    };

    if (selectedDate) {
      fetchFestivalData(selectedDate);
    }
  }, [selectedDate]);

  const renderItem = ({ item }) => {
    if (!item.name) {
      return null; // Handle empty item gracefully
    }

    const festival = festivalData.find(f => f.name === item.name);

    if (!festival) {
      return null; // If festival is not found, return null or a placeholder
    }

    return (
      <Card>
        <Card.Title>{festival.name}</Card.Title>
        <Card.Divider />
        <Image source={require('../../images/Writer.png')} style={styles.image} />
        <Text>날짜: {festival.date}</Text>
        <Text>위치: {festival.location}</Text>
      </Card>
    );
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDateContainer}>
        <Text style={styles.emptyDateText}>No Festivals</Text>
      </View>
    );
  };

  const rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        rowHasChanged={rowHasChanged}
        onDayPress={onDayPress}
      />
      {selectedDate && (
        <Text style={styles.selectedDateText}>
          선택한 날짜: {selectedDate}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  emptyDateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyDateText: {
    fontSize: 18,
    color: 'gray',
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FestivalScreen;
