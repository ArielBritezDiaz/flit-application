import { useState, useEffect } from "react";
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { StyleSheet, View, FlatList, Text, StatusBar, Settings, Modal, TouchableOpacity, Dimensions, LogBox } from 'react-native';
import { SvgXml } from "react-native-svg";
import { EXPO_IP_HOST, EXPO_PORT } from "@env";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Victory imports
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryTooltip, VictoryLabel, VictoryVoronoiContainer } from "victory-native";

import { FlitTheme } from '../components/FlitTheme';

import moment from 'moment';

export default ChartInterpolation = () => {
    return (
        <View style={styles.container}>

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#2f2f2f',
        height:'100%'
    },
})