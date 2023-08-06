import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const PrintStart = () => {
  return (
    <View style={styles.container}>
      <Text>PrintStart 컴포넌트</Text>
      {/* 원하는 내용을 추가하여 기록 시작 페이지를 꾸밀 수 있습니다. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PrintStart;
