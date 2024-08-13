/*
 * @Author: czy0729
 * @Date: 2021-12-25 03:23:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-13 16:11:28
 */
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { useBackHandler } from '@utils/hooks'
import { IOS, USE_NATIVE_DRIVER } from '@constants'
import { Component } from '../component'
import { Flex } from '../flex'
import { Mask } from '../mask'
import { Portal } from '../portal'
import { SafeAreaBottom } from '../safe-area-bottom'
import { ScrollView } from '../scroll-view'
import { Text } from '../text'
import { Touchable } from '../touchable'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ActionSheetProps } from './types'

export { ActionSheetProps }

/** 动作面板 */
export const ActionSheet = ({
  show = false,
  height = 440,
  title = '',
  onClose,
  children
}: ActionSheetProps) => {
  r(COMPONENT)

  const y = useRef(new Animated.Value(0))
  const [_show, _setShow] = useState(show)

  const _onShow = useCallback(() => {
    _setShow(true)
    setTimeout(() => {
      Animated.timing(y.current, {
        toValue: 1,
        duration: 240,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
    }, 0)
  }, [])
  const _onClose = useCallback(() => {
    if (_show) {
      onClose()
      Animated.timing(y.current, {
        toValue: 0,
        duration: 240,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
      setTimeout(() => {
        _setShow(false)
      }, 240)
    }
  }, [_show, onClose])

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
    const h = Math.min(height || _.window.height * 0.5, _.window.height * 0.88)
    return (
      <Portal>
        <Suspense>
          <Component id='component-action-sheet' style={styles.actionSheet}>
            <Mask
              style={{
                opacity: y.current
              }}
              onPress={onClose}
            />
            <Animated.View
              style={[
                styles.content,
                {
                  height: h,
                  transform: [
                    {
                      translateY: y.current.interpolate({
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
                {typeof title === 'string'
                  ? !!title && (
                      <Text style={_.mb.sm} size={12} bold type='sub' align='center'>
                        {title}
                      </Text>
                    )
                  : title}
                {children}
              </ScrollView>
              <Touchable style={styles.close} onPress={onClose}>
                <SafeAreaBottom
                  style={_.ios(styles.btnContainer, undefined)}
                  type={_.ios('height', 'paddingBottom')}
                >
                  <Flex style={styles.btn} justify='center'>
                    <Text size={15} bold type='sub'>
                      收起
                    </Text>
                  </Flex>
                </SafeAreaBottom>
              </Touchable>
            </Animated.View>
          </Component>
        </Suspense>
      </Portal>
    )
  })
}

export default ActionSheet
