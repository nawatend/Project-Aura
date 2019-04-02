import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'
import TaskCard from '../components/TaskCard'
import { exellentCardGradient, okayCardGradient, stressGradient, anxiousGradient } from '../utils/styles'
import { SubTitle } from '../components/textComponents/'
import { ArrowButton } from '../components/buttonComponents/'

import { backGradient } from '../utils/styles'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '100%',
    marginBottom: 40,
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    height: 'auto',
  },
  taskContainer: {
    maxWidth: '80%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
});

class TaskScreen extends Component {
  render() {
    return (
      <LinearGradient colors={backGradient} style={styles.container}>
        <View style={styles.textContainer}>
          <ArrowButton />
          <SubTitle text={'Now we know how you feel, let\'s do something!'} />
        </View>
        <View style={styles.taskContainer}>

          <TaskCard text='Excercise' gradient={okayCardGradient} image={require("../assets/icons/exercise/fysical.png")} navigation={this.props.navigation.navigate} type={'physical'} />
          <TaskCard text='Mind' gradient={stressGradient} image={require("../assets/icons/exercise/mindful.png")} navigation={this.props.navigation.navigate} type={'mindfulness'} />
          <TaskCard text='Chat' gradient={exellentCardGradient} image={require("../assets/icons/exercise/remiChatbot.png")} navigation={this.props.navigation.navigate} type={'chatbot'} />
          <TaskCard text='Quote' gradient={anxiousGradient} image={require("../assets/icons/exercise/quotes.png")} navigation={this.props.navigation.navigate} type={'quote'} />
        </View>
      </LinearGradient>
    );
  }
}

export default TaskScreen
