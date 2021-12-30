/*
 * @Author: czy0729
 * @Date: 2021-12-25 03:23:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-30 08:20:48
 */
import React, { useState, useCallback } from 'react'
import { Animated, View } from 'react-native'
import { _ } from '@stores'
import { Portal } from './portal'
import { Touchable } from './touchable'

export const ActionSheet = ({ children }) => {
  const [show, setShow] = useState(false)
  const [y] = useState(new Animated.Value(0))
  const close = useCallback(() => {
    Animated.timing(y, {
      toValue: 0,
      duration: 160,
      useNativeDriver: true
    }).start()
  }, [y])
  const open = useCallback(() => {
    Animated.timing(y, {
      toValue: 1,
      duration: 160,
      useNativeDriver: true
    }).start()
  }, [y])
  const toggleShow = useCallback(() => {
    setShow(!show)
    if (show) {
      close()
    } else {
      open()
    }
  }, [close, open, show])

  const styles = memoStyles()
  return (
    <Portal>
      <View style={styles.actionSheet} pointerEvents={show ? 'auto' : 'none'}>
        <Touchable style={styles.wrap} useRN onPress={toggleShow}>
          <Animated.View
            style={[
              styles.mask,
              {
                opacity: y
              }
            ]}
          />
        </Touchable>
        <Animated.View
          style={[
            styles.content,
            {
              transform: [
                {
                  translateY: y.interpolate({
                    inputRange: [0, 1],
                    outputRange: [_.window.height * 0.4, 0]
                  })
                }
              ]
            }
          ]}
        >
          <View style={styles.body}>{children}</View>
        </Animated.View>
      </View>
    </Portal>
  )
}

const memoStyles = _.memoStyles(() => ({
  actionSheet: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  wrap: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  mask: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  content: {
    position: 'absolute',
    zIndex: 4,
    right: 0,
    bottom: 0,
    left: 0,
    minHeight: _.window.height * 0.4,
    backgroundColor: _.colorTinygrailContainer,
    borderTopRightRadius: _.radiusLg,
    borderTopLeftRadius: _.radiusLg,
    overflow: 'hidden'
  },
  body: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind
  }
}))
