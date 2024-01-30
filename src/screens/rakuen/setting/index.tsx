/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-30 16:25:36
 */
import React from 'react'
import { Component, Header } from '@components'
import { TapListener } from '@_'
import { useObserver } from '@utils/hooks'
import Scroll from './component/scroll'
import { useRakuenSettingPage } from './hooks'

const RakuenSetting = ({ navigation }) => {
  useRakuenSettingPage()

  return useObserver(() => (
    <Component id='screen-rakuen-setting'>
      <Header title='超展开设置' hm={['rakuen/settings', 'RakuenSetting']} />
      <TapListener>
        <Scroll navigation={navigation} />
      </TapListener>
    </Component>
  ))
}

export default RakuenSetting
