import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import styled from "styled-components/native";

const Btn = styled.TouchableOpacity`
    flex: 1; 
    justify-content: center;
    align-items: center;
`;

const Title = styled.Text`
     color: blue;
`;

const Footprints = ({navigation: { navigate }}) => (
    <Btn 
        onPress={() => navigate("Stack", {screen:"Three"})}>
        <Title>
           Footprints
        </Title>
    </Btn>
);

export default Footprints;
