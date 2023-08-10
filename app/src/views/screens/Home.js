import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';

const festivalData = [
  {
    id: '1',
    name: '서울국제작가축제',
    date: '2023-09-08',
    location: '서울 용산구',
    image: require('../../images/Writer.png'),
  },
  // Add more festival data here
];

const FestivalScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const renderItem = ({ item }) => (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <Image source={item.image} style={styles.image} />
      <Text>날짜: {item.date}</Text>
      <Text>위치: {item.location}</Text>
    </Card>
  );

  const onDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={onDayPress}
        style={styles.calendar}
        // You can customize the appearance of the calendar here
        // For example:
        // theme={{
        //   selectedDayBackgroundColor: 'blue',
        //   selectedDayTextColor: 'white',
        // }}
      />
      <Text style={styles.selectedDateText}>
        선택한 날짜: {selectedDate ? selectedDate : '날짜를 선택하세요'}
      </Text>
      <FlatList
        data={festivalData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
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
  calendar: {
    marginBottom: 10,
  },
  selectedDateText: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FestivalScreen;
