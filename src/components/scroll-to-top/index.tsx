/*
 * 安卓用，仿 iOS 点击头部列表滚动到顶
 * @Author: czy0729
 * @Date: 2020-12-04 16:23:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-10 18:04:34
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import Portal from '@ant-design/react-native/lib/portal'
import { _, systemStore } from '@stores'
import { IOS, STORYBOOK, WSA } from '@constants'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { Iconfont } from '../iconfont'
import { scrollToTopCallback } from './utils'
import { memoStyles } from './styles'
import { Props as ScrollToToProps } from './types'

export { ScrollToToProps, scrollToTopCallback }

const ScrollToTop = observer(
  ({
    isFocused = true,
    scrollTo,
    scrollToIndex,
    scrollToLocation,
    onPress
  }: ScrollToToProps) => {
    if (IOS || STORYBOOK) return null
    if ((IOS || !isFocused) && !systemStore.dev) return null

    const styles = memoStyles()

    // 子系统使用右下方固定位置按钮代替顶部点击
    if (WSA) {
      return (
        <View style={styles.scrollToTop}>
          <Touchable
            style={styles.touch}
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
          >
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='md-vertical-align-top' color={_.colorSub} size={20} />
            </Flex>
          </Touchable>
        </View>
      )
    }

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

// @ts-expect-error
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
