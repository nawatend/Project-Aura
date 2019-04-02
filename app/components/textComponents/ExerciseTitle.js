import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 25,
    fontWeight: '600',
    textAlign: 'center',
    color: '#ffffff',
  }
})

const ExerciseTitle = ({ text }) => (
  <Text style={styles.subtitle}>{text}</Text>
)

export default ExerciseTitle
