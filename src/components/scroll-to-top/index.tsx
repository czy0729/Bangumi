/*
 * 安卓用，仿iOS点击头部列表滚动到顶
 * @Author: czy0729
 * @Date: 2020-12-04 16:23:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 15:30:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import Portal from '@ant-design/react-native/lib/portal'
import { _, systemStore } from '@stores'
import { IOS } from '@constants'
import { Touchable } from '../touchable'
import { scrollToTopCallback } from './utils'
import { styles } from './styles'
import { Props as ScrollToToPropsp } from './types'

export { ScrollToToPropsp, scrollToTopCallback }

const ScrollToTop = observer(
  ({
    isFocused = true,
    scrollTo,
    scrollToIndex,
    scrollToLocation,
    onPress
  }: ScrollToToPropsp) => {
    if ((IOS || !isFocused) && !systemStore.dev) return null

    return (
      <Portal>
        <Touchable
          style={styles.container}
          useRN
          highlight
          onPress={() => {
            if (onPress) {
              onPress()
              return
            }

            scrollToTopCallback({
              scrollTo,
              scrollToIndex,
              scrollToLocation
            })
          }}
        />
      </Portal>
    )
  }
)

// @ts-ignore
ScrollToTop.scrollToTop = (
  fn: (arg0: { animated: boolean; index: number; viewOffset: number }) => void
) => {
  if (typeof fn === 'function') {
    try {
      fn({
        animated: true,
        index: 0,
        viewOffset: _.window.height * 2
      })
    } catch (error) {
      console.warn('ScrollToTop', 'scrollToTop', error)
    }
  }
}

export { ScrollToTop }
