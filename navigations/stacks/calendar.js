/*
 * @Author: czy0729
 * @Date: 2019-04-24 19:42:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 19:58:14
 */
import { createStackNavigator } from 'react-navigation'
import { Subject } from '@screens'
import CalendarScreen from '../screens/calendar'
import config from './config'

const CalendarStack = createStackNavigator(
  {
    Calendar: CalendarScreen,
    Subject
  },
  {
    initialRouteName: 'Calendar',
    ...config
  }
)

export default CalendarStack
