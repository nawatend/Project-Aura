import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  SecondarySubtitle,
  Logo,
} from "../../components/textComponents";
import { highLight, mainTextColor } from "../../utils/styles/";
import { SecondaryButton } from "../../components/buttonComponents";

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
  inputField: {
    backgroundColor: mainTextColor,
    opacity: 0.9,
    height: 40,
    width: "100%",
    borderRadius: 20,
    paddingLeft: 10,
    marginTop: 10
  },
  fullWidth: {
    width: "100%"
  },
  primaryBtn: {
    fontSize: 24,
    fontWeight: "400",
    backgroundColor: highLight,
    minWidth: 180,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 22,
    marginTop: 20
  },
  btnText: {
    fontSize: 18,
    fontWeight: "400",
    color: "#ffffff",
    textAlign: "center"
  }
});

export class RegisterBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pass2: ""
    };
  }

  /**
   * Gathers user data from fields and sends it to the next view
   */
  createUser = () => {
    const userdata = {
      email: this.state.email,
      password: this.state.password,
      pass2: this.state.pass2
    };
    /**
     * TextField validation
     */
    if (userdata.email != "") {
      if (userdata.password == "" || userdata.pass2 == "") {
        Alert.alert("One or more fields are empty, please check all fields!");
      } else {
        if (userdata.password === userdata.pass2) {
          this.props.navigation.navigate("Person", { data: userdata });
        } else {
          Alert.alert("Passwords do not match!");
        }
      }
    } else {
      Alert.alert("Please choose a correct email adress");
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Logo />
          <SecondarySubtitle
            text={
              "As a first stap towards your account, we will need your email address and password"
            }
          />
        </View>
        <View style={styles.fullWidth}>
          <TextInput
            style={styles.inputField}
            onChangeText={text => {
              this.setState({ email: text });
            }}
            placeholder={"E-mail"}
            keyboardType={"email-address"}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            placeholder={"Password"}
            secureTextEntry={true}
          />
          <TextInput
            style={styles.inputField}
            onChangeText={text => {
              this.setState({ pass2: text });
            }}
            placeholder={"Confirm Password"}
            secureTextEntry={true}
          />
        </View>
        <View>
          <SecondaryButton
            text={"Cancel"}
            route={"Login"}
            navigation={this.props.navigation.navigate}
          />
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              this.createUser();
            }}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default RegisterBase;
