/*
 * @Author: czy0729
 * @Date: 2023-04-19 12:14:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 17:15:25
 */
import React from 'react'
import { View } from 'react-native'
import { obc } from '@utils/decorators'
import Component from './in-view'

export const InView = obc(({ children, ...other }, { $ }) => {
  if ($?.state?.visibleBottom === undefined) {
    return <View {...other}>{children}</View>
  }

  return (
    <Component {...other} visibleBottom={$?.state?.visibleBottom}>
      {children}
    </Component>
  )
})
