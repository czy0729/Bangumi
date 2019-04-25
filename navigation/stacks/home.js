/*
 * @Author: czy0729
 * @Date: 2019-04-24 18:03:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 21:18:33
 */
import React from 'react'
import { StyleSheet, Platform } from 'react-native'
import {
  createBottomTabNavigator,
  createStackNavigator
} from 'react-navigation'
import { Constants } from 'expo'
import { Login, Subject } from '@screens'
import { IconMenu } from '@screens/_'
import { colorMain, colorDesc, colorBorder } from '@styles'
import HomeScreen from '../screens/home'
import TimelineScreen from '../screens/timeline'
import RakuenScreen from '../screens/rakuen'
import config from './config'

const HomeTab = createBottomTabNavigator(
  {
    Timeline: TimelineScreen,
    Home: HomeScreen,
    Rakuen: RakuenScreen
  },
  {
    initialRouteName: 'Home',
    navigationOptions: ({ navigation }) => ({
      title: 'Bangumi',
      headerLeft: () => <IconMenu navigation={navigation} />
    }),
    tabBarOptions: {
      activeTintColor: colorMain,
      inactiveTintColor: colorDesc,
      style: {
        borderTopWidth: StyleSheet.hairlineWidth,
        borderTopColor: colorBorder
      },
      ...Platform.select({
        android: { headerStyle: { marginTop: -Constants.statusBarHeight } }
      })
    }
  }
)

const HomeStack = createStackNavigator(
  {
    Login,
    HomeTab,
    Subject
  },
  {
    initialRouteName: 'HomeTab',
    // initialRouteParams: {
    //   subjectId: 204135 // 评论数 [43]248175 [6]204135 [1]18007 [0]273437
    // },
    ...config
  }
)

export default HomeStack
