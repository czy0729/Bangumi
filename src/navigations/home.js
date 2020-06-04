/*
 * @Author: czy0729
 * @Date: 2020-06-04 15:40:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-04 16:14:08
 */
import {
  createSwitchNavigator,
  getActiveChildNavigationOptions
} from 'react-navigation'
import { Auth } from '@screens'
import Home from '@/src/screens/home/index/index'

const HomeSwitch = createSwitchNavigator(
  {
    Auth,
    Home
  },
  {
    initialRouteName: 'Home'
  }
)

const HomeScreen = {
  screen: HomeSwitch,
  navigationOptions: ({ navigation, screenProps }) =>
    getActiveChildNavigationOptions(navigation, screenProps)
}

export default HomeScreen
