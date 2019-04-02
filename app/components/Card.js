import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert, AsyncStorage } from 'react-native'
import { LinearGradient, Notifications } from 'expo'
import { getInstance } from '../services/firebase/firebase'

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  cardStyle: {
    width: 300,
    height: '100%',
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    flexShrink: 0,
    marginLeft: 10,
    marginRight: 10,
  },
  view: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  text: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 10,
    fontFamily: 'Montserrat-SemiBold',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10
  }
})

/**
 * Init firebase and some default value arrays
 */
const firebase = getInstance()
const weekDays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const weeks = ['week1', 'week2', 'week3', 'week4']

/**
 * get the current week of the month from day
 * @param {Number} day 
 */
const getWeek = (day) => {
  let week = '';
  if(day > 21) {
    week = weeks[3]
  } else if(day > 14) {
    week = weeks[2]
  } else if(day > 7) {
    week = weeks[1]
  } else {
    week = weeks[0]
  }
  return week
}

/**
 * Cancel the scheduled notification
 */
const cancelNotification = async() => {
  try {
    await Notifications.cancelScheduledNotificationAsync()
  } catch (error) {
    console.log(error)
  }
}

/**
 * Schedule a notification for when people can track their mood again
 * !May or may not work properly on Android (Notifications work, but error screen appeared during dev)
 */
const scheduleNotification = async() => {
  console.log('scheduling notification')
  const newNotif = await Notifications.scheduleLocalNotificationAsync({
    body: 'Check back in to track your mood',
    title: 'Tracking is unlocked!',
  }, {
    time: ((new Date()).getTime() + 3600000)
  })
  await AsyncStorage.setItem('Notification', newNotif)
  console.log('notification scheduled')
}

/**
 * Select and add an emotion to the database
 * @param {Number} rating The value of the emotion
 * @param {*} navigation React Navigations navigate function
 * @param {*} route Route to navigate to
 */
const addEmotion = async(rating, navigation, route) => {
  if(firebase) {
    const notifId = await AsyncStorage.getItem('Notification')
    if(notifId !== null) {
      console.log('removing old notification')
      await cancelNotification(notifId)
    }
    const uid = firebase.auth().currentUser.uid
    const timestamp = new Date()
    const lastActivity = timestamp.getTime()
    const addDay = timestamp.getDay()
    const db = firebase.database()
    const monthDay = timestamp.getDate()
    const week = getWeek(monthDay)
    try {
      const statref = await db.ref(`/users/${uid}/stats`).once('value')
      const stats = statref.val()
      if(stats.lastAddDay === addDay) {
        
        const dailyTaps = stats.amountToday += 1
        const total = stats.totalToday += rating
        const average = ((total / dailyTaps) * 2)
        const dayAverages = {
          ...stats.dailyAverage,
          [weekDays[addDay]]: average,
        }
        const weekAverage = ((Object.values(dayAverages).reduce((a,b) => a + b) / 7) * 2)
        await db.ref(`/users/${uid}`).update({
          lastAddTimestamp: lastActivity,
          stats: {
            amountToday: dailyTaps,
            dailyAverage: {
              ...stats.dailyAverage,
              [weekDays[addDay]]: average,
            },
            weeklyAverage: {
              ...stats.weeklyAverage,
              [week]: weekAverage,
            },
            totalToday: total
          }
        })
        await scheduleNotification()
        navigation(route)

      } else {
        const dailyTaps = 1
        const total = rating
        const average = ((total / dailyTaps) * 2)
        const dayAverages = {
          ...stats.dailyAverage,
          [weekDays[addDay]]: average,
        }
        const weekAverage = ((Object.values(dayAverages).reduce((a,b) => a + b) / 7) * 2)
        await db.ref(`/users/${uid}`).update({
          lastAddTimestamp: lastActivity,
          stats: {
            amountToday: dailyTaps,
            dailyAverage: {
              ...stats.dailyAverage,
              [weekDays[addDay]]: average,
            },
            weeklyAverage: {
              ...stats.weeklyAverage,
              [week]: weekAverage,
            },
            totalToday: total,
            lastAddDay: addDay,
          }
        })
        await scheduleNotification()
        navigation(route)
      }

    } catch (error) {
      Alert.alert(error)
    }
  }
}

const Card = ({ text, value, route, navigation, colorBase, image }) => (
  <TouchableOpacity style={styles.cardStyle} onPress={() => { addEmotion(value, navigation, route) }}>
    <LinearGradient style={styles.card} colors={colorBase}>
      <View style={styles.view}>
        <Image style={styles.image} source={image} />
        <Text style={styles.text}>{text}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
)

export default Card
