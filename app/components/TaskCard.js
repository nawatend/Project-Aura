import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo";
import { withNavigation } from 'react-navigation'

const styles = StyleSheet.create({
  taskcard: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    margin: 5
  },
  container: {
    width: 130,
    height: 130,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 5
  },
  icon: {
    width: 50,
    height: 50
  }
});

const TaskCard = ({ gradient, image, type, navigation }) => (
  <TouchableOpacity onPress={() => {navigation('TaskDetail', {type: type})}}>
    <LinearGradient colors={gradient} style={styles.container}>
      <View style={styles.taskcard}>
        <Image
          source={image}
          fadeDuration={0}
          style={styles.icon}
        ></Image>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default withNavigation(TaskCard);
