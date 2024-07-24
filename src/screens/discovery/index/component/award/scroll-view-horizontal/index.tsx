/*
 * @Author: czy0729
 * @Date: 2023-11-08 00:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 14:30:41
 */
import React from 'react'
import { ScrollView } from 'react-native'
import { ob } from '@utils/decorators'
import { SCROLL_VIEW_RESET_PROPS } from '@constants'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function ScrollViewHorizontal({ children, ...other }) {
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

export default ob(ScrollViewHorizontal, COMPONENT)
