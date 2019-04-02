import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import {
    anxiousBarGradient,
    exhaustedBarGradient,
    stressedBarGradient,
    okayBarGradient,
    exellentBarGradient
} from "../../utils/styles";

const styles = StyleSheet.create({
    day: {
        width: 20,
        borderWidth: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: "transparent"
    },
});

/**
 *
 * @param {averageEmotion} Number from 1 to 10
 */

const Day = ({ averageEmotion }) => {
    let gradientColor = [];
    if (averageEmotion < 40) {
        gradientColor = exhaustedBarGradient;
    } else if (averageEmotion > 40 && averageEmotion <= 80) {
        gradientColor = anxiousBarGradient;
    } else if (averageEmotion > 80 && averageEmotion <= 120) {
        gradientColor = stressedBarGradient;
    } else if (averageEmotion > 120 && averageEmotion <= 160) {
        gradientColor = okayBarGradient;
    } else if (averageEmotion > 160 && averageEmotion <= 200) {
        gradientColor = exellentBarGradient;
    }

    return (
        <LinearGradient
            style={[{ height: averageEmotion }, styles.day]}
            colors={gradientColor}
        />
    );
};

export default Day;
