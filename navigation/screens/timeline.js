/*
 * @Author: czy0729
 * @Date: 2019-04-24 17:54:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 23:42:26
 */
import React from 'react'
import { Image } from '@components'
import { Timeline } from '@screens'
import { colorMain } from '@styles'

const TimelineScreen = {
  screen: Timeline,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Image
        size={22}
        placeholder={false}
        src={
          tintColor === colorMain
            ? require('@assets/images/icon/time-active.png')
            : require('@assets/images/icon/time.png')
        }
      />
    ),
    tabBarLabel: '时间胶囊'
  }
}

export default TimelineScreen
