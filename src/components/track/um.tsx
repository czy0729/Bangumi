/*
 * 记录页面的访问开始和结束时间
 *
 * @Author: czy0729
 * @Date: 2019-11-26 20:10:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-11 19:32:08
 */
import React from 'react'
import { NativeModules } from 'react-native'
import { IOS, STORYBOOK } from '@constants'
import { NavigationEvents } from '../navigation/events'

const { UMAnalyticsModule } = NativeModules

type Props = {
  /** 页面的名称 (中文) */
  title: string
}

export function UM({ title = '' }: Props) {
  if (IOS || STORYBOOK || !title) return null

  return (
    <NavigationEvents
      onDidFocus={() => {
        // setTimeout是保证页面开始记录是在上个页面结束之后才执行
        setTimeout(() => UMAnalyticsModule.onPageStart(title), 0)
      }}
      onWillBlur={() => {
        UMAnalyticsModule.onPageEnd(title)
      }}
    />
  )
}
