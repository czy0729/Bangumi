/*
 * @Author: czy0729
 * @Date: 2019-04-28 17:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-04 21:34:17
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { Props as HeaderPlaceholderProps } from './types'

export { HeaderPlaceholderProps }

/** App Header 占位 */
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
