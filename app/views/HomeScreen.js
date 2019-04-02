import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, AsyncStorage } from 'react-native'
import { LinearGradient, Permissions, Notifications } from 'expo'
import Card from '../components/Card'
import { Title, SubTitle, Body } from '../components/textComponents/'
import { exellentCardGradient, okayCardGradient, stressGradient, anxiousGradient, exhaustedGradient } from '../utils/styles'
import { getInstance } from '../services/firebase/firebase'
import { PrimaryButton } from '../components/buttonComponents'
import { backGradient } from '../utils/styles'

/**
 * All styles for the HomeScreen
 */
const styles = StyleSheet.create({
  container: {
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
  cardContainer: {
    maxHeight: '70%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
});

/**
 * Init firebase and db
 */
const firebase = getInstance()
const db = firebase.database()

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      allowEmotion: false,
      currentUserName: '',
      emoteTimer: '',
    }
  }

  /**
   * Convert timestamp to hours
   */
  getHoursFromDate = (timestamp) => {
    return timestamp / 3600000
  }

  /**
   * Register the current user for notifications
   */
  registerNotifications = async () => {
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
    let finalStatus = status
    console.log(status)
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }

    if (finalStatus !== 'granted') {
      return
    }
    console.log('getting token')
    try {
      let token = await Notifications.getExpoPushTokenAsync()
      let uid = firebase.auth().currentUser.uid
      await db.ref(`/users/${uid}`).update({
        notifications: true,
        expoPushToken: token
      })
    } catch (error) {
      console.log(error)
    }

  }

  /**
   * check if timeout time has passed yet
   */
  checkTime = async () => {
    if (firebase && firebase.auth().currentUser) {
      const uid = firebase.auth().currentUser.uid
      const db = firebase.database()
      const ref = await db.ref(`/users/${uid}`).once('value')
      const refvalue = ref.val()
      const lastTimestamp = refvalue.lastAddTimestamp
      const now = new Date()
      const currentTimestampHours = this.getHoursFromDate(now.getTime())
      const lastTimeStampHours = this.getHoursFromDate(lastTimestamp)
      if ((currentTimestampHours - lastTimeStampHours) < 1) {

        const emoteTimer = (lastTimestamp + 60 * 60 * 1000) - now.getTime()
        let seconds = Math.floor(emoteTimer / 1000);
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        hours %= 24;
        minutes %= 60;
        seconds %= 60;

        this.setState({
          loading: false,
          allowEmotion: false,
          emoteTimer: ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2),
        })

        // Function will only be called again if the hour has not passed yet and a user is logged in
        if (firebase.auth().currentUser) {



          setTimeout(() => {
            this.checkTime()
          }, 1000)
        }
      } else {
        this.setState({
          loading: false,
          allowEmotion: true,
        })
      }
    }
    // } else {
    //   if (this.mounted) {
    //     this.setState({
    //       loading: false,
    //       allowEmotion: false,
    //     })
    //   }
    // }
  }



  componentDidMount() {
    this.checkTime()
    this.registerNotifications()
    //removed, in checkTime zelf is er interval

    setInterval(() => {
      this.checkTime()
    }, 1000)
  }

  componentWillMount = () => {
    this.getUserName()
  }
  /**
   * Initialize current users username
   */
  getUserName = async () => {

    await AsyncStorage.getItem('currentUserName').then((userName) => {
      this.setState({ currentUserName: JSON.parse(userName) })
    })


  }

  /**
   * Render the component depending on state
   */
  render() {
    if (this.state.loading === true) {
      return (
        <LinearGradient colors={backGradient} style={styles.container}>
          <View style={styles.textContainer}>
            <Title text={'HiLow, User'} />
            <SubTitle text={'How are you feeling today?'} />

          </View>
          <View style={styles.cardContainer}>
            <Body text={'loading...'} />
          </View>
        </LinearGradient>
      )
    } else {
      if (this.state.allowEmotion === false) {
        {/* only shows when user already use emotion check  */ }
        return (
          <LinearGradient colors={backGradient} style={styles.container}>
            <View style={styles.textContainer}>
              <Title text={'HiLow, ' + this.state.currentUserName} />
              <SubTitle text={'Come again in'} />

            </View>
            <View style={styles.container}>
              <Title text={this.state.emoteTimer} />
              <Body text={'You have already checked in for this hour. You can go to the exercises or check back later.'} />
              <PrimaryButton text={'Go to exercises'} route={'Details'} navigation={this.props.navigation.navigate} />
            </View>
          </LinearGradient>
        )
      } else {
        return (
          <LinearGradient colors={backGradient} style={styles.container}>
            <View style={styles.textContainer}>
              <Title text={'Hello, ' + this.state.currentUserName} />
              <SubTitle text={'How are you feeling today?'} />
            </View>
            
            <View style={styles.cardContainer}>
              {/* horizontal scroll bar emotion card  */}
              <ScrollView horizontal={true}>
                <Card text={'Excellent'} value={100} route={'Details'} navigation={this.props.navigation.navigate} colorBase={exellentCardGradient} image={require("../assets/icons/card-emotes/excellent.png")} />
                <Card text={'Okay'} value={75} route={'Details'} navigation={this.props.navigation.navigate} colorBase={okayCardGradient} image={require("../assets/icons/card-emotes/okay.png")} />
                <Card text={'Stressed'} value={50} route={'Details'} navigation={this.props.navigation.navigate} colorBase={stressGradient} image={require("../assets/icons/card-emotes/stressed.png")} />
                <Card text={'Exhausted'} value={25} route={'Details'} navigation={this.props.navigation.navigate} colorBase={anxiousGradient} image={require("../assets/icons/card-emotes/exhausted.png")} />
                <Card text={'Anxious'} value={1} route={'Details'} navigation={this.props.navigation.navigate} colorBase={exhaustedGradient} image={require("../assets/icons/card-emotes/anxious.png")} />
              </ScrollView>
            </View>

          </LinearGradient>
        );
      }
    }
  }
}

export default HomeScreen