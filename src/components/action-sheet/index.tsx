/*
 * @Author: czy0729
 * @Date: 2021-12-25 03:23:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-03 15:27:47
 */
import React, { useState, useEffect, useCallback } from 'react'
import { Animated, View, StatusBar } from 'react-native'
import { _ } from '@stores'
import { useObserver, useBackHandler } from '@utils/hooks'
import { IOS } from '@constants'
import { ReactNode } from '@types'
import { Portal } from '../portal'
import { ScrollView } from '../scroll-view'
import { Touchable } from '../touchable'
import { memoStyles } from './styles'

type Props = {
  /** 是否显示 */
  show?: boolean

  /** 高度，不会超过屏幕高度的88% */
  height?: number

  /** 关闭回调函数 */
  onClose?: () => any

  /** 内容 */
  children: ReactNode
}

export const ActionSheet = ({
  show = false,
  height = 400,
  onClose,
  children
}: Props) => {
  const [y] = useState(new Animated.Value(0))
  const [_show, _setShow] = useState(show)

  const _onShow = useCallback(() => {
    _setShow(true)

    if (!IOS && !_.isDark) {
      // 去除StatusBar的灰色背景
      StatusBar.setBackgroundColor('rgba(255, 255, 255, 0)', false)
    }

    setTimeout(() => {
      Animated.timing(y, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true
      }).start()
    }, 0)
  }, [y])
  const _onClose = useCallback(() => {
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
  }, [_show, onClose, y])

  useEffect(() => {
    if (show) {
      _onShow()
      return
    }

    if (_show) {
      _onClose()
    }
  }, [_onClose, _onShow, _show, show])

  useBackHandler(() => {
    if (IOS || !_show) return false

    _onClose()
    return true
  })

  return useObserver(() => {
    if (!_show) return null

    const styles = memoStyles()
    const h = Math.min(height || _.window.height * 0.4, _.window.height * 0.88)
    return (
      <Portal>
        <View style={styles.actionSheet}>
          <Touchable style={styles.wrap} useRN ripple={false} onPress={onClose}>
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
