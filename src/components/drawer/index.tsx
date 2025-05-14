/*
 * @Author: czy0729
 * @Date: 2025-05-13 14:39:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-13 14:45:13
 */
import React, { Suspense, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { USE_NATIVE_DRIVER } from '@constants'
import { Flex } from '../flex'
import { Portal } from '../portal'
import { Touchable } from '../touchable'
import { COMPONENT, DRAWER_WITDH } from './ds'
import { memoStyles } from './styles'
import { Props as DrawerProps } from './types'

export { DrawerProps }

export const Drawer = ({ style, show, onToggle, children }: DrawerProps) => {
  r(COMPONENT)

  const x = useRef(new Animated.Value(0))

  useEffect(() => {
    Animated.timing(x.current, {
      toValue: show ? 1 : 0,
      duration: 160,
      useNativeDriver: USE_NATIVE_DRIVER
    }).start()
  }, [show])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Portal>
        <Suspense>
          <Flex style={styles.menu} pointerEvents={show ? 'auto' : 'none'}>
            <Flex.Item />
            <Touchable style={styles.wrap} useRN onPress={onToggle}>
              <Animated.View
                style={[
                  styles.mask,
                  {
                    opacity: x.current
                  }
                ]}
              />
            </Touchable>
            <Animated.View
              style={stl(
                styles.body,
                {
                  transform: [
                    {
                      translateX: x.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [DRAWER_WITDH, 0]
                      })
                    }
                  ]
                },
                style
              )}
            >
              {children}
            </Animated.View>
          </Flex>
        </Suspense>
      </Portal>
    )
  })
}

export default Drawer
