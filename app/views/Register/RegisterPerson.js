import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native'
import { SecondarySubtitle, Logo } from '../../components/textComponents';
import { SecondaryButton } from '../../components/buttonComponents';
import { getInstance } from '../../services/firebase/firebase'

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2B1576"
  },
  horizontalButtons: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputField: {
    backgroundColor: '#ffffff',
    opacity: 0.9,
    height: 40,
    width: '100%',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 10
  },
  fullWidth: {
    width: '100%',
  },
  primaryBtn: {
    fontSize: 24,
    fontWeight: '400',
    backgroundColor: '#F50097',
    minWidth: 180,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 22,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#ffffff',
    textAlign: 'center',
  },
})

const firebase = getInstance()

export class RegisterPerson extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
    }
  }

  /**
   * Registers a user and puts his data into db
   */
  addUserDetails = async () => {
    const userDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    }
    const userData = this.props.navigation.getParam('data', null)
    const db = firebase.database()


    if (userDetails.firstName == "" || userDetails.lastName == "") {
      Alert.alert("One or more fields are empty, please check all fields!");
    } else {
      if (firebase) {
        try {
          let user = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password)
          const uid = user.user.uid
          await db.ref(`/users/${uid}`).set({
            uid: uid,
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userData.email,
            lastAddTimestamp: 0,
            lastSessionInHour: null,
            sendEmoteAvailable: true,
            firstEmoteDate: null,
            notification: { notification: true },
            darkMode: { darkMode: true },
            stats: {
              amountToday: 0,
              dailyAverage: {
                mon: 0,
                tue: 0,
                wed: 0,
                thu: 0,
                fri: 0,
                sat: 0,
                sun: 0,
              },
              weeklyAverage: {
                week1: 0,
                week2: 0,
                week3: 0,
                week4: 0,
              }
            }
          })

          await AsyncStorage.setItem('currentUserName', JSON.stringify(userDetails.firstName)).then(() => {
            this.props.navigation.navigate('App')
          })
        } catch (error) {
          Alert.alert(error)
        }
      } else {
        Alert.alert('We are having trouble connecting. Please try again later.')
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Logo />
          <SecondarySubtitle text={'Now we just need some personal information to get you started on your journey.'} />
        </View>
        <View style={styles.fullWidth}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => { this.setState({ firstName: text }) }}
            placeholder={'First Name'}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => { this.setState({ lastName: text }) }}
            placeholder={'Last Name'}
          />
        </View>
        <View>
          <SecondaryButton text={'Cancel'} route={'Login'} navigation={this.props.navigation.navigate} />
          <TouchableOpacity style={styles.primaryBtn} onPress={() => { this.addUserDetails() }}>
            <Text style={styles.btnText}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export default RegisterPerson
