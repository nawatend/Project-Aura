import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { LinearGradient } from 'expo'
import { SubTitle } from '../components/textComponents/'
import { ArrowButton, SecondaryButton, PrimaryButton } from '../components/buttonComponents/'
import ExerciseDetail from '../components/ExerciseDetail'

import { backGradient } from '../utils/styles'

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {
    width: '100%',
    marginBottom: 40,
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    height: 'auto',
  },
  buttons: {
    marginBottom: '2%'
  },
});


class TaskDetail extends Component {
  /**
   * Render the task according to type
   */
  render() {
    const { navigation } = this.props
    const type = navigation.getParam('type', 'no Type')
    if (type !== 'chatbot') {
      title = 'Here is an exercise to get you started.'
      buttons = (
        <View style={styles.buttons}>
          <PrimaryButton text={'Next exercise'} route={'Details'} navigation={navigation.navigate} />
          <SecondaryButton text={'Finish exercises'} route={'Home'} navigation={navigation.navigate} />
        </View>
      )
    } else {
      title = 'We\'re so sorry. This feature is not yet available.'
      buttons = (
        <View style={styles.buttons}>
          <SecondaryButton text={'Take me back'} route={'Details'} navigation={navigation.navigate} />
        </View>
      )
    }
    return (
      <LinearGradient colors={backGradient} style={styles.container}>
        <View style={styles.textContainer}>
          <ArrowButton />
          <SubTitle text={title} />
        </View>
        <ExerciseDetail type={type} />
        {buttons}
      </LinearGradient>
    )
  }
}

export default TaskDetail