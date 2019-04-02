import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { mainTextColor } from '../../utils/styles'
import Day from './Day'

const styles = StyleSheet.create({
    textContainer: {
        width: '100%',
        marginBottom: 40,
        marginTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        height: 'auto',
    },
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
    },
    wholeWeekcontainer: {
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

const DaysContainer = ({ averages }) => (
    <View style={styles.wholeWeekcontainer}>
        <View style={styles.statisticContainer}>
            <Day averageEmotion={averages.mon} ></Day>
            <Day averageEmotion={averages.tue}></Day>
            <Day averageEmotion={averages.wed}></Day>
            <Day averageEmotion={averages.thu}></Day>
            <Day averageEmotion={averages.fri}></Day>
            <Day averageEmotion={averages.sat}></Day>
            <Day averageEmotion={averages.sun}></Day>
        </View>
        <View style={styles.days_container}>
            <Text style={styles.text}>Mon</Text>
            <Text style={styles.text}>Tue</Text>
            <Text style={styles.text}>Wed</Text>
            <Text style={styles.text}>Thu</Text>
            <Text style={styles.text}>Fri</Text>
            <Text style={styles.text}>Sat</Text>
            <Text style={styles.text}>Sun</Text>
        </View>
    </View>
)

export default DaysContainer