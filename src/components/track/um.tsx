/*
 * 记录页面的访问开始和结束时间
 *
 * @Author: czy0729
 * @Date: 2019-11-26 20:10:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-07 13:01:23
 */
import React from 'react'
import { NativeModules } from 'react-native'
import { IOS } from '@constants'
import { NavigationEvents } from '../navigation/events'

// const { UMAnalyticsModule } = NativeModules

type Props = {
  /** 页面的名称 (中文) */
  title: string
}

export function UM({ title = '' }: Props) {
  return null
}
