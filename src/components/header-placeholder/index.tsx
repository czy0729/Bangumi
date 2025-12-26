/*
 * @Author: czy0729
 * @Date: 2019-04-28 17:04:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-23 05:17:15
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets } from '@utils/hooks'
import { COMPONENT } from './ds'

import type { Props as HeaderPlaceholderProps } from './types'

export type { HeaderPlaceholderProps }

/** 客户端通用顶部高度占位 */
export const HeaderPlaceholder = observer(({ style, tabs = false }: HeaderPlaceholderProps) => {
  r(COMPONENT)

  const { headerHeight } = useInsets()

  let height = headerHeight
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
