/*
 * App Header 占位
 * @Author: czy0729
 * @Date: 2019-04-28 17:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 04:27:44
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Props as HeaderPlaceholderProps } from './types'

export { HeaderPlaceholderProps }

export const HeaderPlaceholder = observer(
  ({ style, tabs = false }: HeaderPlaceholderProps) => {
    let height = _.headerHeight
    if (tabs) height += _.tabsHeight
    return (
      <View
        style={stl(
          {
            height
          },
          style
        )}
      />
    )
  }
)
