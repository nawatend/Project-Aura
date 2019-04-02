import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";
import { withNavigation } from 'react-navigation'

const style = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 5,
    marginTop: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginBottom: 20,
    marginTop: 10,
  }
});

class ArrowButton extends React.Component {
  render() {
    return (
      <TouchableOpacity style={style.container} onPress={() => {this.props.navigation.goBack()}}>
        <Image
          source={require("../../assets/icons/arrow-back.png")}
          fadeDuration={0}
          style={style.icon}
        />
      </TouchableOpacity>
    );
  }
}

export default withNavigation(ArrowButton)
