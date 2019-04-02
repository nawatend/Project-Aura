import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { mainTextColor } from '../../utils/styles'
import Day from './Week'

const styles = StyleSheet.create({
    days_container: {
        marginTop: 10,
        width: '70%',
        height: 'auto',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        color: 'white',
    },
    statisticContainer: {
        maxHeight: '40%',
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        width: '70%',
    },
    text: {
        color: mainTextColor,
    }
    , wholeWeekcontainer: {
        marginTop: 100,
        flex: 1,
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: 220,
        maxHeight: 220,
    }
});

const WeeksContainer = ({ averages }) => (
    <View style={styles.wholeWeekcontainer}>
        <View style={styles.statisticContainer}>
            <Day averageEmotion={averages.week1} ></Day>
            <Day averageEmotion={averages.week2}></Day>
            <Day averageEmotion={averages.week3}></Day>
            <Day averageEmotion={averages.week4}></Day>
        </View>
        <View style={styles.days_container}>
            <Text style={styles.text}>Week 1</Text>
            <Text style={styles.text}>Week 2</Text>
            <Text style={styles.text}>Week 3</Text>
            <Text style={styles.text}>Week 4</Text>
        </View>
    </View>
)

export default WeeksContainer