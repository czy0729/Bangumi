/*
 * App Header占位
 * @Author: czy0729
 * @Date: 2019-04-28 17:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-09 11:15:12
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'

export const HeaderPlaceholder = observer(
  ({
    style,
    tabs = false // 是否有tabs
  }) => {
    let height = _.headerHeight
    if (tabs) {
      height += _.tabsHeight
    }
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
  }
)
