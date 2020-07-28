/*
 * @Author: czy0729
 * @Date: 2019-03-29 10:38:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-28 20:12:10
 */
import React from 'react'
import { View } from 'react-native'
import {
  createAppContainer,
  createStackNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { observer } from 'mobx-react'
import * as Screens from '@screens'
import BottomTabBar from '@components/@/react-navigation-tabs/BottomTabBar'
import { BlurView } from '@screens/_'
import { IOS } from '@constants'
import { _ } from '@stores'
import navigationsParams, { initialHomeTabName } from '@/config'
import HomeScreen from './screens/home'
import config from './stacks/config'

const TarBarComponent = observer(props => {
  const styles = memoStyles()
  if (IOS) {
    return (
      <BlurView style={styles.blurView}>
        <BottomTabBar {...props} style={styles.tabBarComponent} />
      </BlurView>
    )
  }

  return (
    <View style={styles.tarBarView}>
      <BottomTabBar {...props} style={styles.tabBarComponent} />
    </View>
  )
})

const HomeTab = observer(
  createBottomTabNavigator(
    {
      Discovery: Screens.Discovery,
      Timeline: Screens.Timeline,
      Home: HomeScreen,
      Rakuen: Screens.Rakuen,
      User: Screens.User
    },
    {
      initialRouteName: initialHomeTabName,
      tabBarComponent: props => <TarBarComponent {...props} />,
      navigationOptions: ({ navigation, screenProps }) =>
        getActiveChildNavigationOptions(navigation, screenProps),
      animationEnabled: false
      // lazy: false
    }
  )
)

const HomeStack = createStackNavigator(
  {
    ...Screens,
    HomeTab
  },
  {
    ...navigationsParams,
    ...config
  }
)

export default createAppContainer(HomeStack)

const memoStyles = _.memoStyles(_ => ({
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
    backgroundColor: IOS
      ? _.select(_.colorPlain, _._colorDarkModeLevel1)
      : _.select('transparent', _._colorDarkModeLevel1),
    borderTopWidth: IOS ? 0 : _.select(_.hairlineWidth, 0),
    borderTopColor: _.colorBorder
  },
  tabBarComponent: {
    borderTopWidth: 0,
    backgroundColor: 'transparent'
  }
}))
