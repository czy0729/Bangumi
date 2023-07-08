/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 09:48:52
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import Component from './in-view'

export const InView = obc(({ index, children, ...other }, { $ }) => {
  // 若页面没有管理的 y 轴数值, 或者传递了 index
  if (
    STORYBOOK ||
    $?.state?.visibleBottom === undefined ||
    (typeof index === 'number' && index < 10)
  ) {
    return <View {...other}>{children}</View>
  }

  return (
    <Component {...other} visibleBottom={$?.state?.visibleBottom}>
      {children}
    </Component>
  )
})
