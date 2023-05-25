/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-24 17:02:04
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import { STORYBOOK } from '@constants'
import Component from './in-view'

export const InView = obc(({ children, ...other }, { $ }) => {
  if (STORYBOOK || $?.state?.visibleBottom === undefined) {
    return <View {...other}>{children}</View>
  }

  return (
    <Component {...other} visibleBottom={$?.state?.visibleBottom}>
      {children}
    </Component>
  )
})
