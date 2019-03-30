/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:44:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-30 18:07:25
 */
import React from 'react'
import { Platform } from 'react-native'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '@components/TabBarIcon'
// import LinksScreen from '@screens/LinksScreen'
import SettingsScreen from '@screens/SettingsScreen'
import Home from '@screens/home'
import Calendar from '@screens/calendar'
import Subject from '@screens/subject'

const HomeStack = createStackNavigator({
  Home,
  Subject
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  )
}

const CalendarStack = createStackNavigator({
  Calendar,
  Subject
})

CalendarStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}
    />
  )
}

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}
    />
  )
}

export default createBottomTabNavigator(
  {
    HomeStack,
    CalendarStack,
    SettingsStack
  },
  {
    initialRouteName: 'HomeStack'
  }
)
