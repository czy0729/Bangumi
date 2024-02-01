/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-01 18:27:21
 */
import React from 'react'
import { Component } from '@components'
import { TapListener } from '@_'
import { useObserver } from '@utils/hooks'
import Scroll from './component/scroll'
import Header from './header'
import { useRakuenSettingPage } from './hooks'

const RakuenSetting = ({ navigation }) => {
  useRakuenSettingPage()

  return useObserver(() => (
    <Component id='screen-rakuen-setting'>
      <Header />
      <TapListener>
        <Scroll navigation={navigation} />
      </TapListener>
    </Component>
  ))
}

export default RakuenSetting
