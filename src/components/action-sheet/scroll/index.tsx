/*
 * @Author: czy0729
 * @Date: 2024-11-04 17:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:11:42
 */
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { BTN_HEIGHT } from '../ds'
import { ScrollView } from '../../scroll-view'
import { memoStyles } from './styles'

export const Scroll = ({ height, scrollEnabled = true, onScroll, children }) => {
  const { bottom } = useSafeAreaInsets()

  return useObserver(() => {
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
          onScroll={onScroll}
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
            height: height - (bottom || 0) - BTN_HEIGHT
          }
        ]}
      >
        {children}
      </View>
    )
  })
}

export default Scroll
