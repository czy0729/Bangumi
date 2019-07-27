/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-27 16:14:27
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
// import { BlurView } from 'expo-blur'
import { BlurView } from 'expo'
import {
  Anitama,
  Award,
  Calendar,
  Discovery,
  Friends,
  Group,
  Login,
  LoginV2,
  Mono,
  Notify,
  Rakuen,
  RakuenSetting,
  Random,
  Search,
  Setting,
  Subject,
  Tag,
  Timeline,
  Topic,
  User,
  Video,
  WebView,
  Zone
} from '@screens'
import BottomTabBar from '@components/@/react-navigation-tabs/BottomTabBar'
import { IOS } from '@constants'
import _ from '@styles'
import navigationsParams, { initialHomeTabName } from '../navigations'
import HomeScreen from './screens/home'
import config from './stacks/config'

const TabBarComponent = props => <BottomTabBar {...props} />
const HomeTab = createBottomTabNavigator(
  {
    Discovery,
    Timeline,
    Home: HomeScreen,
    Rakuen,
    User
  },
  {
    initialRouteName: initialHomeTabName,
    tabBarComponent: props => {
      if (IOS) {
        return (
          <BlurView tint='default' intensity={100} style={styles.blurView}>
            <TabBarComponent {...props} style={styles.tabBarComponent} />
          </BlurView>
        )
      }
      return (
        <View style={styles.tarBarView}>
          <TabBarComponent {...props} style={styles.tabBarComponent} />
        </View>
      )
    },
    tabBarOptions: {
      activeTintColor: _.colorMain,
      inactiveTintColor: _.colorDesc
    },
    navigationOptions: ({ navigation, screenProps }) =>
      getActiveChildNavigationOptions(navigation, screenProps)
  }
)

const HomeStack = createStackNavigator(
  {
    Anitama,
    Award,
    Calendar,
    Discovery,
    Friends,
    Group,
    HomeTab,
    Login,
    LoginV2,
    Mono,
    Notify,
    RakuenSetting,
    Random,
    Search,
    Setting,
    Subject,
    Tag,
    Topic,
    User,
    Video,
    WebView,
    Zone
  },
  {
    ...navigationsParams,
    ...config
  }
)

export default createAppContainer(HomeStack)

const styles = StyleSheet.create({
  blurView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0
  },
  tarBarView: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.colorPlain
  },
  tabBarComponent: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: _.colorBorder,
    backgroundColor: 'transparent'
  }
})
