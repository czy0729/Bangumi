/*
 * @Author: czy0729
 * @Date: 2021-12-25 03:23:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 19:51:40
 */
import React, { useState, useEffect } from 'react'
import { Animated, View } from 'react-native'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import { Portal } from './portal'
import { ScrollView } from './scroll-view'
import { Touchable } from './touchable'

export const ActionSheet = ({ show = false, height = 400, onClose, children }) => {
  const [y] = useState(new Animated.Value(0))
  const [_show, _setShow] = useState(show)

  useEffect(() => {
    if (show) {
      _setShow(true)
      setTimeout(() => {
        Animated.timing(y, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true
        }).start()
      }, 0)
      return
    }

    if (_show) {
      onClose()
      Animated.timing(y, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true
      }).start()
      setTimeout(() => {
        _setShow(false)
      }, 240)
    }
  }, [_show, onClose, show, y])

  return useObserver(() => {
    if (!_show) return null

    const styles = memoStyles()
    const h = height || _.window.height * 0.4
    return (
      <Portal>
        <View style={styles.actionSheet}>
          <Touchable style={styles.wrap} useRN onPress={onClose}>
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
                height: h,
                transform: [
                  {
                    translateY: y.interpolate({
                      inputRange: [0, 1],
                      outputRange: [h, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <ScrollView
              style={[
                styles.body,
                {
                  height
                }
              ]}
              contentContainerStyle={_.container.bottom}
            >
              {children}
            </ScrollView>
          </Animated.View>
        </View>
      </Portal>
    )
  })
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
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
  },
  content: {
    position: 'absolute',
    zIndex: 4,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderTopRightRadius: _.radiusLg,
    borderTopLeftRadius: _.radiusLg,
    overflow: 'hidden'
  },
  body: {
    paddingVertical: _.md,
    paddingHorizontal: _.wind - _._wind
  }
}))
