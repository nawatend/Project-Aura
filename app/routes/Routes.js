import {
  createSwitchNavigator,
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import TaskScreen from '../views/TaskScreen'
import HomeScreen from '../views/HomeScreen'
import ProfileScreen from '../views/ProfileScreen'
import StatisticScreen from '../views/StatisticScreen'
import LoginScreen from '../views/LoginScreen'
import TaskDetail from '../views/TaskDetail'
import { StyleSheet } from 'react-native';
import { highLight } from '../utils/styles/'
import { getTabBarIcon } from '../components/IconWithBadge'
import { RegisterBase, RegisterPerson } from '../views/Register/'

const styles = StyleSheet.create({
  nav: {
    maxHeight: 70,
    height: 70,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
    backgroundColor: '#2B1576',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
})
/**
 * stack navigation from home page
 */
const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Details: {
    screen: TaskScreen,
  },
  TaskDetail: {
    screen: TaskDetail,
  }
}, {

    initialRouteName: 'Home',
    headerMode: 'none',
  })


/**
* bottom tab navigation start from home
*/
const TabNavigator = createBottomTabNavigator({
  'Profile': {
    screen: ProfileScreen
  },
  'Home': {
    screen: HomeStack
  },
  'Statistic': {
    screen: StatisticScreen
  },
}, {
    defaultNavigationOptions: ({
      navigation
    }) => ({
      tabBarIcon: ({
        focused,
        tintColor
      }) =>
        getTabBarIcon(navigation, focused, tintColor),
    }),
    animationEnabled: 'true',
    tabBarOptions: {
      activeTintColor: highLight,
      inactiveTintColor: 'white',
      style: styles.nav,
      showLabel: false,
    },
    initialRouteName: 'Home',
  })

const RegisterStack = createStackNavigator({
  'Base': {
    screen: RegisterBase,
  },
  'Person': {
    screen: RegisterPerson,
  }
}, {
    initialRouteName: 'Base',
    headerMode: 'none',
  })

/**
 * App started : starting page
 */
const AuthStack = createStackNavigator({
  'Login': LoginScreen
});

const switchNavigator = createSwitchNavigator({
  Login: LoginScreen,
  Register: RegisterStack,
  App: TabNavigator,
  Auth: AuthStack,
}, {
    initialRouteName: 'Login',
  })

export default createAppContainer(switchNavigator)