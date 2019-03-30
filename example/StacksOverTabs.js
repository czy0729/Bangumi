/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import { ScrollView, StatusBar } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  createBottomTabNavigator,
  createStackNavigator,
  getActiveChildNavigationOptions,
  SafeAreaView
} from 'react-navigation'

const MyNavScreen = ({ navigation, banner }) => (
  <ScrollView>
    <SafeAreaView forceInset={{ horizontal: 'always', vertical: 'never' }} />
    <StatusBar barStyle='default' />
  </ScrollView>
)

const MyHomeScreen = ({ navigation }) => (
  <MyNavScreen banner='Home Screen' navigation={navigation} />
)

const MyProfileScreen = ({ navigation }) => (
  <MyNavScreen
    banner={`${navigation.state.params.name}s Profile`}
    navigation={navigation}
  />
)

const MyNotificationsSettingsScreen = ({ navigation }) => (
  <MyNavScreen banner='Notifications Screen' navigation={navigation} />
)

const MySettingsScreen = ({ navigation }) => (
  <MyNavScreen banner='Settings Screen' navigation={navigation} />
)

const TabNav = createBottomTabNavigator(
  {
    MainTab: {
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-home' : 'ios-home'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
        tabBarLabel: 'Home',
        title: 'Welcome'
      },
      path: '/',
      screen: MyHomeScreen
    },
    SettingsTab: {
      navigationOptions: {
        tabBarIcon: ({ tintColor, focused }) => (
          <Ionicons
            name={focused ? 'ios-settings' : 'ios-settings'}
            size={26}
            style={{ color: tintColor }}
          />
        ),
        title: 'Settings'
      },
      path: '/settings',
      screen: MySettingsScreen
    }
  },
  {
    animationEnabled: false,
    swipeEnabled: false,
    tabBarPosition: 'bottom'
  }
)

TabNav.navigationOptions = ({ navigation, screenProps }) => {
  const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
  return {
    title: childOptions.title
  }
}

const StacksOverTabs = createStackNavigator({
  NotifSettings: {
    navigationOptions: {
      title: 'Notifications'
    },
    screen: MyNotificationsSettingsScreen
  },
  Profile: {
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}'s Profile!`
    }),
    path: '/people/:name',
    screen: MyProfileScreen
  },
  Root: {
    screen: TabNav
  }
})

export default StacksOverTabs
