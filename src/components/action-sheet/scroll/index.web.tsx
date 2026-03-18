/*
 * @Author: czy0729
 * @Date: 2024-11-04 17:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-18 03:46:32
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { BTN_HEIGHT } from '../ds'
import { ScrollView } from '../../scroll-view'
import { memoStyles } from './styles'

function Scroll({ height, scrollEnabled = true, children }) {
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
        contentContainerStyle={_.container.bottom}
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
        }
      ]}
    >
      {children}
    </View>
  )
}

export default observer(Scroll)
