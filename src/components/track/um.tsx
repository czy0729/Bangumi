/*
 * @Author: czy0729
 * @Date: 2019-11-26 20:10:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 22:58:11
 */
// import React from 'react'
// import { NativeModules } from 'react-native'
import { IOS, STORYBOOK } from '@constants'
// import { NavigationEvents } from '../navigation/events'
import { UMProps } from './types'

/** @deprecated 记录页面的访问开始和结束时间 */
export function UM({ title = '' }: UMProps) {
  if (IOS || STORYBOOK || !title) return null

  return null

  // return (
  //   <NavigationEvents
  //     onDidFocus={() => {
  //       // setTimeout 是保证页面开始记录是在上个页面结束之后才执行
  //       setTimeout(() => {
  //         NativeModules.UMAnalyticsModule.onPageStart(title)
  //       }, 0)
  //     }}
  //     onWillBlur={() => {
  //       NativeModules.UMAnalyticsModule.onPageEnd(title)
  //     }}
  //   />
  // )
}
