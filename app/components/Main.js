import React, {
  Component
} from 'react'
import {
  Text,
  View
} from 'react-native'
import Routes from '../routes/Routes'

export class Main extends Component {


  state = {
    fontLoaded: false,
  }

  /**
   * Load custom fonts into the app
   */
  async componentDidMount() {
    //load fonts
    await Expo.Font.loadAsync({
      'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
      'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
    }).then(() => {
      this.setState({
        fontLoaded: true
      })
    })
  }


  render() {

    if (this.state.fontLoaded) {
      return (<Routes />)
    } {
      return (

        <Text> Helloooo Loading Fonts</Text>
      )
    }

  }
}

export default Main