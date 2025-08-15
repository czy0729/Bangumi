/*
 * @Author: czy0729
 * @Date: 2019-07-14 14:12:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 02:21:59
 */
import React from 'react'
import { Component } from '@components'
import { useObserver } from '@utils/hooks'
import { NavigationProps } from '@types'
import Scroll from './component/scroll'
import Header from './header'
import { useRakuenSettingPage } from './hooks'

/** 超展开设置 */
const RakuenSetting = ({ navigation }: NavigationProps) => {
  useRakuenSettingPage()

  return useObserver(() => (
    <Component id='screen-rakuen-setting'>
      <Scroll navigation={navigation} />
      <Header />
    </Component>
  ))
}

export default RakuenSetting
