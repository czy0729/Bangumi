/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 20:39:26
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { observer } from 'mobx-react'
import { r } from '@utils/dev'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { ScrollViewProps } from '@components'

function ScrollViewHorizontal({ children, ...other }: ScrollViewProps) {
  r(COMPONENT)

  const styles = memoStyles()

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainerStyle}
      scrollEventThrottle={16}
      {...SCROLL_VIEW_RESET_PROPS}
      {...other}
      horizontal
    >
      {children}
    </ScrollView>
  )
}

export default observer(ScrollViewHorizontal)
