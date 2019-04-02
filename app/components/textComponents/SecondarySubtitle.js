import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 20,
    fontWeight: '300',
    textAlign: 'center',
    color: '#ffffff',
  }
})

const SecondarySubtitle = ({ text }) => (
  <Text style={styles.subtitle}>{text}</Text>
)

export default SecondarySubtitle
