import React, { Component } from "react"
import { Text, View, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native"
import { LinearGradient } from "expo"
import {
    Title,
    SubTitle,
    SecondarySubtitle
} from "../components/textComponents/"
import { Logo } from "../components/textComponents/"
import { midPurple, backGradient, grey, highLight, mainTextColor } from "../utils/styles/"
import { getInstance } from "../services/firebase/firebase"

const firebase = getInstance()

import ToggleSwitch from "toggle-switch-react-native"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: "100%"
    },
    wrapper: {
        width: "80%",
        height: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: "10%"
    },
    section_wrapper: {
        flex: 1,
        height: "auto",
        width: "100%",
        alignItems: "flex-start",
        justifyContent: "flex-start"
    },
    section_container: {
        flex: 1,
        height: 100,
        width: "100%",
        backgroundColor: midPurple,
        alignItems: "flex-start",
        justifyContent: "center",
        borderRadius: 30,
        marginTop: 10,
        padding: 20
    },
    loginBtn: {
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
        color: mainTextColor,
        textAlign: "center"
    },
    logo: {
        flex: 1,
        justifyContent: "center"
    },
    toggleSwitch: {
        marginTop: 7,
        marginBottom: 7,
        justifyContent: "center"
    }
})

class ProfileScreen extends Component {


    constructor(props) {
        super(props)
        this.state = {
            darkMode: true,
            notification: true,
            currentUserName: "",
            lastSession: "",
        }
    }

    /**
     * Convert timestamp to hours
     */
    getHoursFromDate = (timestamp) => {
        return timestamp / 3600000
    }

    /**
     * Logs out the current user and clears AsyncStorage
     */
    signOutUser = async () => {
        try {
            await firebase.auth().signOut()
                .then(() => {
                    this.props.navigation.navigate('Login')
                    console.log("Navigate succesful")
                    AsyncStorage.clear()
                })
        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Toggle the users desire to receive notifications
     */
    toggleNotification = async () => {
        try {
            const currentUserId = firebase.auth().currentUser.uid
            const refNotification = firebase
                .database()
                .ref("users/" + currentUserId + "/notification")

            console.log(this.state.notification)
            if (this.state.notification) {
                refNotification.set({ notification: false })
                this.userSetting()
            } else {
                refNotification.set({ notification: true })
                this.userSetting()
            }
        } catch (e) {
            Alert.alert(e.code + ': ' + e.message)
        }
    }


    toggleDarkMode = async () => {
        try {
            const currentUserId = firebase.auth().currentUser.uid

            const refDarkMode = firebase
                .database()
                .ref("users/" + currentUserId + "/darkMode")

            if (this.state.darkMode) {
                refDarkMode.set({ darkMode: false })
                this.userSetting()
            } else {
                refDarkMode.set({ darkMode: true })
                this.userSetting()
            }

        } catch (e) {
            Alert.alert(e.code + ': ' + e.message)
        }
    }




    userSetting = async () => {
        try {
            const currentUserId = firebase.auth().currentUser.uid
            const refNotification = firebase
                .database()
                .ref("users/" + currentUserId + "/notification")
            const refDarkMode = firebase
                .database()
                .ref("users/" + currentUserId + "/darkMode")

            refNotification.on("value", async (snapshot) => {
                if (snapshot.val().notification) {
                    this.setState({ notification: true })
                } else {
                    this.setState({ notification: false })



                }
            });

            refDarkMode.on("value", async (snapshot) => {
                if (snapshot.val().darkMode) {
                    this.setState({ darkMode: true })
                } else {
                    this.setState({ darkMode: false })

                }
            });

        } catch (e) {
            Alert.alert(e.code + ': ' + e.message)
        }

    }
    componentWillMount = () => {
        this.getUserName()
        this.getLastSession()
        this.userSetting()
    }



    getUserName = async () => {
        await AsyncStorage.getItem('currentUserName').then((userName) => {
            this.setState({ currentUserName: JSON.parse(userName) })
        })
    }

    /**
     * Get the last session time from the db
     */
    getLastSession = async () => {

        try {
            const currentUserId = firebase.auth().currentUser.uid
            const ref = firebase.database().ref("users/" + currentUserId + "/lastAddTimestamp")


            ref.on("value", async (lastTimestamp) => {
                const now = new Date()
                const currentTimestampHours = this.getHoursFromDate(now.getTime())
                const lastTimeStampHours = this.getHoursFromDate(lastTimestamp.val())
                const lastSessionHours = currentTimestampHours - lastTimeStampHours

                if (lastTimestamp === 0) {
                    if (lastSessionHours >= 0) {
                        this.setState({ lastSession: parseInt(lastSessionHours, 10) })
                        console.log('More= than 0')
                    } else if (lastSessionHours < 0) {
                        console.log('less than 0')
                        this.setState({ lastSession: 0 })
                    }
                } else {
                    this.setState({ lastSession: 0 })
                }

            })


        } catch (e) {
            console.log(e)
        }

    }


    render() {
        return (
            <LinearGradient colors={backGradient} style={styles.container}>
                <View style={styles.wrapper}>
                    <View style={styles.logo}>
                        <Logo />
                    </View>
                    <View style={styles.section_wrapper}>
                        <Title text={"PROFILE"} />
                        <View style={styles.section_container}>
                            <SubTitle text={this.state.currentUserName} />
                            <SecondarySubtitle text={"Last session " + this.state.lastSession + " hours ago"} />
                        </View>
                    </View>
                    <View style={styles.section_wrapper}>
                        <Title text={"SETTINGS"} />
                        <View style={styles.section_container}>
                            <View style={styles.toggleSwitch}>
                                <ToggleSwitch
                                    isOn={this.state.darkMode}
                                    onColor={highLight}
                                    offColor={grey}
                                    label="Dark mode"
                                    labelStyle={{
                                        color: "white",
                                        fontWeight: "300",
                                        fontSize: 20,
                                        paddingRight: "30%",
                                        width: 180
                                    }}
                                    size="medium"
                                    onToggle={() => { this.toggleDarkMode() }
                                    }
                                />
                            </View>
                            <View style={styles.toggleSwitch}>
                                <ToggleSwitch
                                    isOn={this.state.notification}
                                    onColor={highLight}
                                    offColor={grey}
                                    label="Notification"
                                    labelStyle={{
                                        color: "white",
                                        fontWeight: "300",
                                        fontSize: 20,
                                        paddingRight: "30%",
                                        width: 180
                                    }}
                                    size="medium"
                                    onToggle={() => { this.toggleNotification() }}
                                />
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity
                        style={styles.loginBtn}
                        onPress={() => {
                            this.signOutUser()
                        }}
                    >
                        <Text style={styles.btnText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
        )
    }
}

export default ProfileScreen