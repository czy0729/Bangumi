/*
 * @Author: czy0729
 * @Date: 2019-04-24 18:03:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-18 00:17:46
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import {
  createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs'
import { BlurView } from 'expo'
import {
  Login,
  Subject,
  Search,
  Mono,
  Rakuen,
  Timeline,
  Topic,
  Zone
} from '@screens'
import { IOS } from '@constants'
import { colorMain, colorPlain, colorDesc, colorBorder } from '@styles'
import HomeScreen from '../screens/home'
import config from './config'

const TabBarComponent = props => <BottomTabBar {...props} />
const HomeTab = createBottomTabNavigator(
  {
    Timeline,
    Home: HomeScreen,
    Rakuen
  },
  {
    initialRouteName: 'Home',
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
      activeTintColor: colorMain,
      inactiveTintColor: colorDesc
    },
    navigationOptions: ({ navigation, screenProps }) =>
      getActiveChildNavigationOptions(navigation, screenProps)
  }
)

const HomeStack = createStackNavigator(
  {
    HomeTab,
    Login,
    Mono,
    Search,
    Subject,
    Topic,
    Zone
  },
  {
    initialRouteName: 'HomeTab',
    // initialRouteParams: {
    //   subjectId: 100444, // 100444 204135 评论数 [43]248175 [6]204135 [1]18007 [0]273437
    //   topicId: 'ep/805584',
    //   userId: 419012,
    //   monoId: 'person/538' // character/706 person/538
    // },
    ...config
  }
)

export default HomeStack

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
    backgroundColor: colorPlain
  },
  tabBarComponent: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colorBorder,
    backgroundColor: 'transparent'
  }
})
