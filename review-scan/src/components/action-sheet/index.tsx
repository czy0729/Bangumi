/*
 * @Author: czy0729
 * @Date: 2021-12-25 03:23:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:11:06
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
import { Iconfont } from '../iconfont'
import { Mask } from '../mask'
import { Portal } from '../portal'
import { Text } from '../text'
import Btn from './btn'
import Scroll from './scroll'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as ActionSheetProps } from './types'

export { ActionSheetProps }

/** 动作面板 */
export const ActionSheet = ({
  show = false,
  height = 440,
  title = '',
  titleLeft,
  scrollEnabled = true,
  usePortal = true,
  onTitlePress,
  onClose,
  onScroll,
  children
}: ActionSheetProps) => {
  r(COMPONENT)

  const y = useRef(new Animated.Value(show ? 1 : 0))
  const [showValue, setShow] = useState(show)

  const handleShow = useCallback(() => {
    setShow(true)
    setTimeout(() => {
      Animated.timing(y.current, {
        toValue: 1,
        duration: 240,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
    }, 0)
  }, [])
  const handleClose = useCallback(() => {
    if (showValue) {
      onClose()
      Animated.timing(y.current, {
        toValue: 0,
        duration: 240,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
      setTimeout(() => {
        setShow(false)
      }, 240)
    }
  }, [showValue, onClose])

  useEffect(() => {
    if (show) {
      handleShow()
      return
    }

    if (showValue) {
      handleClose()
    }
  }, [handleClose, handleShow, showValue, show])

  useBackHandler(() => {
    if (IOS || !showValue) return false

    handleClose()
    return true
  })

  return useObserver(() => {
    if (!showValue) return null

    const styles = memoStyles()
    const calcHeight = Math.min(
      height || _.window.height * 0.5,
      _.window.height * _.web(0.92, 0.88)
    )
    let elTitle =
      typeof title === 'string'
        ? !!title && (
            <Text size={12} bold type='sub' align='center' onPress={onTitlePress}>
              {title}
            </Text>
          )
        : title

    if (titleLeft) {
      elTitle = (
        <Flex justify='center'>
          {titleLeft}
          {elTitle}
        </Flex>
      )
    }

    const elContent = (
      <>
        {!!elTitle && (
          <Flex style={_.mb.sm} justify='center'>
            {elTitle}
            {!!onTitlePress && <Iconfont name='md-navigate-next' size={18} />}
          </Flex>
        )}
        {children}
      </>
    )

    const el = (
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
                height: calcHeight,
                transform: [
                  {
                    translateY: y.current.interpolate({
                      inputRange: [0, 1],
                      outputRange: [calcHeight, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <Scroll height={calcHeight} scrollEnabled={scrollEnabled} onScroll={onScroll}>
              {elContent}
            </Scroll>
            <Btn onClose={onClose} />
          </Animated.View>
        </Component>
      </Suspense>
    )

    return usePortal ? <Portal>{el}</Portal> : el
  })
}

export default ActionSheet
