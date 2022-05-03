/*
 * App Header占位
 * @Author: czy0729
 * @Date: 2019-04-28 17:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 18:45:55
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { ViewStyle } from '@types'

type Props = {
  style?: ViewStyle

  /** 是否有tabs */
  tabs?: boolean
}

export const HeaderPlaceholder = observer(({ style, tabs = false }: Props) => {
  let height = _.headerHeight
  if (tabs) height += _.tabsHeight
  return (
    <View
      style={[
        {
          height
        },
        style
      ]}
    />
  )
})
