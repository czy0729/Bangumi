/*
 * @Author: czy0729
 * @Date: 2019-04-24 17:56:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-18 00:21:35
 */
import React from 'react'
import {
  createSwitchNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { Home, Auth } from '@screens'
import { IconTabBar } from '@screens/_'

const HomeSwitch = createSwitchNavigator(
  {
    Auth,
    Home
  },
  {
    initialRouteName: 'Auth',

    // @notice 下面是防止首屏不是进度的时候, tabBar没配置
    defaultNavigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <IconTabBar name='heart' tintColor={tintColor} />
      ),
      tabBarLabel: '进度'
    }
  }
)

const HomeScreen = {
  screen: HomeSwitch,
  navigationOptions: ({ navigation, screenProps }) =>
    getActiveChildNavigationOptions(navigation, screenProps)
}

export default HomeScreen
