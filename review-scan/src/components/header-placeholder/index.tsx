/*
 * @Author: czy0729
 * @Date: 2019-04-28 17:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 03:35:15
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { Props as HeaderPlaceholderProps } from './types'

export { HeaderPlaceholderProps }

/** App Header 占位 */
export const HeaderPlaceholder = observer(({ style, tabs = false }: HeaderPlaceholderProps) => {
  r(COMPONENT)

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
})

export default HeaderPlaceholder
