/*
 * @Author: czy0729
 * @Date: 2024-11-04 17:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 18:49:29
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { BTN_HEIGHT } from '../ds'
import { ScrollView } from '../../scroll-view'
import { memoStyles } from './styles'

import type { Props } from '../types'

function Scroll({
  contentContainerStyle,
  height,
  scrollEnabled = true,
  children
}: Pick<Props, 'contentContainerStyle' | 'height' | 'scrollEnabled' | 'children'>) {
  const styles = memoStyles()

  if (scrollEnabled) {
    return (
      <ScrollView
        style={[
          styles.scroll,
          {
            height
          }
        ]}
        contentContainerStyle={stl(_.container.bottom, contentContainerStyle)}
      >
        {children}
      </ScrollView>
    )
  }

  return (
    <View
      style={[
        styles.view,
        {
          height: height - BTN_HEIGHT - _.xs
        },
        contentContainerStyle
      ]}
    >
      {children}
    </View>
  )
}

export default observer(Scroll)
