/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-30 13:56:16
 */
import React from 'react'
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from 'react-navigation'
import { Icon } from '@components'
import Home from '@screens/home'
import Calendar from '@screens/calendar'
import Settings from '@screens/SettingsScreen'
import Subject from '@screens/subject'
import { colorMain } from '@styles'

const TabNav = createBottomTabNavigator(
  {
    HomeTab: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-heart-empty' size={26} style={{ color: tintColor }} />
        ),
        tabBarLabel: '进度'
      },
      screen: Home
    },
    CalendarTab: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-calendar' size={26} style={{ color: tintColor }} />
        ),
        tabBarLabel: '发现'
      },
      screen: Calendar
    },
    SettingsTab: {
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name='ios-timer' size={26} style={{ color: tintColor }} />
        ),
        tabBarLabel: '时光机'
      },
      screen: Settings
    }
  },
  {
    tabBarOptions: {
      activeTintColor: colorMain
    }
  }
)

// TabNav.navigationOptions = ({ navigation, screenProps }) => {
//   const childOptions = getActiveChildNavigationOptions(navigation, screenProps)
//   return {
//     title: childOptions.title
//   }
// }

export default createAppContainer(
  createSwitchNavigator(
    {
      Subject: {
        navigationOptions: ({ navigation }) => ({
          // title: `${navigation.state.params.name}'s Profile!`
          title: '条目'
        }),
        screen: Subject
      },
      Root: {
        screen: TabNav
      }
    },
    {
      initialRouteName: 'Root',
      // initialRouteParams: '',
      // mode: Platform.OS === 'ios' ? 'modal' : 'card',
      headerMode: 'screen'
    }
  )
)
