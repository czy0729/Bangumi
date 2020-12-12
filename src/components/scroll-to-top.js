/*
 * @Author: czy0729
 * @Date: 2020-12-04 16:23:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-11 12:13:35
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { Portal } from '@ant-design/react-native'
import { _ } from '@stores'
// import { IOS } from '@constants'
import Touchable from './touchable'

function ScrollToTop({
  scrollTo,
  scrollToIndex,
  scrollToLocation,
  isFocused,
  onPress
}) {
  // if (!IOS) {
  //   return null
  // }
  if (!isFocused) {
    return null
  }
  return (
    <Portal>
      <Touchable
        style={styles.container}
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
              console.log('ScrollToTop', 'scrollTo', error)
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
              console.log('ScrollToTop', 'scrollToIndex', error)

              try {
                scrollToLocation({
                  animated: true,
                  itemIndex: 0,
                  sectionIndex: 0,
                  viewOffset: 800,
                  viewPosition: 0
                })
              } catch (error) {
                console.log('ScrollToTop', 'scrollToLocation', error)
              }
            }
          }
        }}
      />
    </Portal>
  )
}

ScrollToTop.defaultProps = {
  isFocused: true
}

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

export default observer(ScrollToTop)

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
    height: _.statusBarHeight + 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)'
  }
})
