import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage } from 'react-native'
import { LinearGradient } from 'expo'
import { Title, SubTitle } from '../components/textComponents/'
import { mainTextColor, highLight } from '../utils/styles'
import DaysContainer from '../components/statistic/DaysContainer'
import WeeksContainer from '../components/statistic/WeeksContainer'
import { backGradient } from '../utils/styles'
import { getInstance } from '../services/firebase/firebase'

const firebase = getInstance()
const styles = StyleSheet.create({
    container: {
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
    options: {
        width: '100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
    options_text: {
        color: mainTextColor,
        fontSize: 18,
        margin: 5,
    },
    options_text_selected: {
        color: highLight,
        fontSize: 24,
        margin: 5,

    }
});

class StatisticScreen extends Component {
    //1 is default value
    state = {
        averages: {
            dailyAverage: {
                mon: 1,
                tue: 1,
                wed: 1,
                thu: 1,
                fri: 1,
                sat: 1,
                sun: 1,
            },
            weeklyAverage: {
                week1: 1,
                week2: 1,
                week3: 1,
                week4: 1,
            }
        },
        weekly: true,
    }

    //this happens before render
    componentWillMount = () => {
        this.loadStatsFromFirebase()
    }

    loadStatsFromFirebase = async () => {
        const currentUserId = firebase.auth().currentUser.uid
        const userStats = firebase.database().ref("users/" + currentUserId + "/stats/");

        userStats.on("value", async (snapshot) => {
            const averages = snapshot.val()
            await AsyncStorage.setItem('averages', JSON.stringify(averages))
            this.setState({ averages: JSON.parse(await AsyncStorage.getItem('averages')) })
        });
    }

    render() {
        if (this.state.weekly) {
            return (
                <LinearGradient colors={backGradient} style={styles.container}>
                    {/* Insert top text here */}
                    <View style={styles.textContainer}>
                        <Title text={"This week's overview"} />
                        <SubTitle text={'A visual summary of your week'} />
                    </View>

                    <View style={styles.options}>
                        <Text onPress={() => {
                            this.setState({
                                weekly: true,
                            })
                        }} style={this.state.weekly ? styles.options_text_selected : styles.options_text}>
                            Week</Text>
                        <Text onPress={() => {
                            this.setState({
                                weekly: false,
                            })
                        }} style={this.state.weekly ? styles.options_text : styles.options_text_selected}>Month</Text>
                    </View>
                    <DaysContainer averages={this.state.averages.dailyAverage} />
                </LinearGradient >
            )
        } else {
            return (
                <LinearGradient colors={backGradient} style={styles.container}>
                    {/* Insert top text here */}
                    <View style={styles.textContainer}>
                        <Title text={"This month's overview"} />
                        <SubTitle text={'A visual summary of your month'} />
                    </View>
                    <View style={styles.options}>
                        <Text onPress={() => {
                            this.setState({
                                weekly: true,
                            })
                        }} style={this.state.weekly ? styles.options_text_selected : styles.options_text}>Week</Text>
                        <Text onPress={() => {
                            this.setState({
                                weekly: false,
                            })
                        }} style={this.state.weekly ? styles.options_text : styles.options_text_selected}>Month</Text>
                    </View>

                    <WeeksContainer averages={this.state.averages.weeklyAverage} />
                    {/* <SubTitle text={'April'} /> */}
                </LinearGradient>
            )
        }
    }
}

export default StatisticScreen
