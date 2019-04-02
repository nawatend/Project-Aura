import React, { Component } from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
  container: {
    fontSize: 24,
    fontWeight: '400',
    backgroundColor: '#ffffff',
    opacity: 0.5,
    minWidth: 180,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 22,
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  }
})

const SecondaryButton = ({text, navigation, route}) => (
    <TouchableOpacity onPress={() => {navigation(route)}} style={styles.container}>
      <Text style={styles.text}>{ text }</Text>
    </TouchableOpacity>
)

export default SecondaryButton
