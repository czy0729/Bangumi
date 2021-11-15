/*
 * @Author: czy0729
 * @Date: 2020-12-04 16:23:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-15 20:47:53
 */
import React from 'react'
import { observer } from 'mobx-react'
import Portal from '@ant-design/react-native/lib/portal'
import { _, systemStore } from '@stores'
import { IOS } from '@constants'
import { Touchable } from './touchable'

const ScrollToTop = observer(
  ({ scrollTo, scrollToIndex, scrollToLocation, isFocused = true, onPress }) => {
    if ((IOS || !isFocused) && !systemStore.dev) return null

    return (
      <Portal>
        <Touchable
          style={styles.container}
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
                warn('ScrollToTop', 'scrollTo', error)
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
                warn('ScrollToTop', 'scrollToIndex', error)

                try {
                  scrollToLocation({
                    animated: true,
                    itemIndex: 0,
                    sectionIndex: 0,
                    viewOffset: 800,
                    viewPosition: 0
                  })
                } catch (ex) {
                  warn('ScrollToTop', 'scrollToLocation', ex)
                }
              }
            }
          }}
        />
      </Portal>
    )
  }
)

ScrollToTop.scrollToTop = fn => {
  if (fn) {
    try {
      fn({
        animated: true,
        index: 0,
        viewOffset: _.window.height * 2
      })
    } catch (error) {
      warn('ScrollToTop', 'scrollToTop', error)
    }
  }
}

export { ScrollToTop }

const styles = _.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.statusBarHeight + 10
  }
})
