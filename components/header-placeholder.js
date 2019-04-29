/*
 * @Author: czy0729
 * @Date: 2019-04-28 17:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-28 21:03:22
 */
import React from 'react'
import { View } from 'react-native'
import { headerHeight, tabsHeight } from '@styles'

const HeaderPlaceholder = ({ style, tabs }) => {
  let height = headerHeight
  if (tabs) {
    height += tabsHeight
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

HeaderPlaceholder.defaultProps = {
  tabs: false // 是否有tabs
}

export default HeaderPlaceholder
