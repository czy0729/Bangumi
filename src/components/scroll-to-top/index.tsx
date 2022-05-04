/*
 * 安卓用，仿iOS点击头部列表滚动到顶
 * @Author: czy0729
 * @Date: 2020-12-04 16:23:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-04 16:22:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import Portal from '@ant-design/react-native/lib/portal'
import { _, systemStore } from '@stores'
import { IOS } from '@constants'
import { Touchable } from '../touchable'
import { styles } from './styles'

type Props = {
  isFocused?: boolean
  scrollTo?: (arg0?: any) => any
  scrollToIndex?: (arg0?: any) => any
  scrollToLocation?: (arg0?: any) => any
  onPress?: (arg0?: any) => any
}

const ScrollToTop = observer(
  ({ isFocused = true, scrollTo, scrollToIndex, scrollToLocation, onPress }: Props) => {
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

            if (scrollTo) {
              try {
                scrollTo({
                  x: 0,
                  y: 0,
                  animated: true
                })
              } catch (error) {
                console.warn('ScrollToTop', 'scrollTo', error)
              }
              return
            }

            if (scrollToIndex) {
              try {
                scrollToIndex({
                  animated: true,
                  index: 0,
                  viewOffset: 8000
                })
              } catch (error) {
                console.warn('ScrollToTop', 'scrollToIndex', error)

                try {
                  scrollToLocation({
                    animated: true,
                    itemIndex: 0,
                    sectionIndex: 0,
                    viewOffset: 800,
                    viewPosition: 0
                  })
                } catch (ex) {
                  console.warn('ScrollToTop', 'scrollToLocation', ex)
                }
              }
            }
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
