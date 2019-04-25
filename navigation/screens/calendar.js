/*
 * @Author: czy0729
 * @Date: 2019-04-24 19:57:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 19:57:53
 */
import React from 'react'
import { Calendar } from '@screens'
import { IconMenu } from '@screens/_'

const CalendarScreen = {
  screen: Calendar,
  navigationOptions: ({ navigation }) => ({
    title: '每日放送',
    headerLeft: () => <IconMenu navigation={navigation} />
  })
}

export default CalendarScreen
