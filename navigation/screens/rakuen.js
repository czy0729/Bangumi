/*
 * @Author: czy0729
 * @Date: 2019-04-24 17:59:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-24 23:42:43
 */
import React from 'react'
import { Image } from '@components'
import { Settings } from '@screens'
import { colorMain } from '@styles'

const RakuenScreen = {
  screen: Settings,
  navigationOptions: {
    tabBarIcon: ({ tintColor }) => (
      <Image
        size={22}
        placeholder={false}
        src={
          tintColor === colorMain
            ? require('@assets/images/icon/planet-active.png')
            : require('@assets/images/icon/planet.png')
        }
      />
    ),
    tabBarLabel: '超展开'
  }
}

export default RakuenScreen
