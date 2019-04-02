import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text, TextInput, AsyncStorage, Alert } from "react-native"
import { SecondaryButton } from "../components/buttonComponents/"
import { SecondarySubtitle } from "../components/textComponents/"
import { Logo } from "../components/textComponents/"
import { getInstance } from '../services/firebase/firebase'
import { midPurple, backGradient, grey, highLight, mainTextColor } from "../utils/styles/";

const firebase = getInstance()

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    padding: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2B1576"
  },
  view: {
    width: "100%",
    height: "30%",
    alignItems: 'center'
  },
  center: {
    textAlign: "center"
  },
  loginBtn: {
    fontSize: 24,
    fontWeight: '400',
    backgroundColor: highLight,
    minWidth: 180,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 22,
    marginTop: 20,
  },
  btnText: {
    fontSize: 18,
    fontWeight: '400',
    color: mainTextColor,
    textAlign: 'center',
  },
  inputField: {
    backgroundColor: mainTextColor,
    opacity: 0.9,
    height: 40,
    width: '100%',
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 10
  }
});

class LoginScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loggedIn: false,
      user: null,
      emailField: '',
      passField: '',
    }
  }

  /**
   * Logs in a user and set currentUserName in AsyncStorage
   */
  loginUser = async () => {
    await AsyncStorage.setItem('isLoggedIn', 'true')
    const user = {
      email: this.state.emailField,
      pass: this.state.passField,
    }
    firebase.auth().signInWithEmailAndPassword(user.email, user.pass)
      .then(() => {

        const currentUser = firebase.database().ref("users/" + firebase.auth().currentUser.uid);
        currentUser.on("value", async (snapshot) => {
          const currentUserName = snapshot.val().firstName
          await AsyncStorage.setItem('currentUserName', JSON.stringify(currentUserName)).then(() => {
            this.props.navigation.navigate('App')

          })
          console.log(JSON.parse(await AsyncStorage.getItem('currentUserName')))
        });
      })
      .catch(error => {
        Alert.alert(error.code + ': ' + error.message)
      })
  }

  render() {
    return (

      <View style={styles.container}>
        <View style={styles.view}>
          <Logo />
          <SecondarySubtitle
            text={"Don't be pushed around by the fears in your mind. Be led by the dreams in your heart."}
            style={styles.center}
          />
        </View>
        <View style={styles.view}>
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => { this.setState({ emailField: text }) }}
            placeholder={'E-mail'}
            keyboardType={'email-address'}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={(text) => { this.setState({ passField: text }) }}
            placeholder={'Password'}
            autocomplete={'password'}
            secureTextEntry={true}
          />
        </View>
        <View>
          <TouchableOpacity style={styles.loginBtn} onPress={() => { this.loginUser() }} >
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
          <SecondaryButton text={"Register"} route={"Register"} navigation={this.props.navigation.navigate} />
        </View>
      </View>

    );
  }
}

export default LoginScreen;
