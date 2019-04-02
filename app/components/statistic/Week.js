import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'
import {
    exellentCardGradient, okayCardGradient, stressGradient,
    anxiousGradient, exhaustedGradient
} from '../../utils/styles'


const styles = StyleSheet.create({
    week: {
        width: 40,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: "transparent",
    }
})

/**
 * 
 * @param {averageEmotion} Number from 0 to 200
 */
const Week = ({ averageEmotion }) => {
    let gradientColor = [];
    if (averageEmotion < 40) {
        gradientColor = exhaustedGradient;
    } else if (averageEmotion > 40 && averageEmotion <= 80) {
        gradientColor = anxiousGradient
    } else if (averageEmotion > 80 && averageEmotion <= 120) {
        gradientColor = stressGradient
    } else if (averageEmotion > 120 && averageEmotion <= 160) {
        gradientColor = okayCardGradient
    } else if (averageEmotion > 160 && averageEmotion <= 200) {
        gradientColor = exellentCardGradient
    }

    return (
        <LinearGradient style={[{ height: averageEmotion }, styles.week]} colors={gradientColor}>
        </LinearGradient>
    )
}

export default Week