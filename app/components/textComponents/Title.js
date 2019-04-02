import React, { Component } from 'react'
import { Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'left',
    color: 'white',
    marginTop: 30,
    fontFamily: 'Montserrat-SemiBold',
  }
})

const Title = ({ text }) => (
  <Text style={styles.title}>{text}</Text>
)

export default Title
