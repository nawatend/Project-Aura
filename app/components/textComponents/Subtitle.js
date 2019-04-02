import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'left',
    color: '#ffffff',
    fontFamily: 'Montserrat-Regular',
  }
})

const SubTitle = ({ text }) => (
  <Text style={styles.subtitle}>{text}</Text>
)

export default SubTitle
