import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  inputField: {
    backgroundColor: '#ffffff',
    opacity: 0.9,
    height: 40,
    width: '100%',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 10
  }
})

const UserInfo = ({ placeholder }) => (
    <TextInput
      style={styles.inputField}
      onc
      placeholder={placeholder}
    />
);

export default UserInfo


