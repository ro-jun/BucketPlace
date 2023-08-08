import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from 'react-native-web-swiper';
import styled from "styled-components/native";

const Container = styled.ScrollView``;

const View = styled.View`
    flex: 1;
`;

const Loader = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;    
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

function Home(props) {
    const [loading, setLoading] = useState(false);
    const [nowPlaying, setNowPlaying] = useState([]);

    const getNowPlaying = async () => {
        const response = await fetch(
            `http://api.kcisa.kr/openapi/service/rest/convergence/conver8?serviceKey=62ea79a6-20ab-4104-8aac-570a60fc5704`
        );
        const data = await response.json();
        setNowPlaying(data.results);
        setLoading(false);
    };

    useEffect(() => {
        getNowPlaying();
    }, []);

    return loading ? (
        <Loader>
            <ActivityIndicator />
        </Loader>
    ) : (
        <Container>
            <Swiper
                loop
                timeout={3.5}
                controlsEnabled={false}
                containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}>
                <View style={{ backgroundColor: "red" }}></View>
                <View style={{ backgroundColor: "blue" }}></View>
                <View style={{ backgroundColor: "red" }}></View>
                <View style={{ backgroundColor: "blue" }}></View>
            </Swiper>
        </Container>
    );
}

export default Home;
