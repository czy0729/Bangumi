/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:49:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-21 12:34:02
 */
import React, { Suspense, useCallback, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Flex, Portal, Touchable } from '@components'
import { tinygrailStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { USE_NATIVE_DRIVER } from '@constants'
import List from './list'
import { COMPONENT, DRAWER_WITDH } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

function StarsLogs({ navigation, show, onToggle }: Props) {
  r(COMPONENT)

  const x = useRef(new Animated.Value(0))
  const handleHeaderRefresh = useCallback(() => {
    return tinygrailStore.fetchStarLogs(true)
  }, [])
  const handleFooterRefresh = useCallback(() => {
    return tinygrailStore.fetchStarLogs()
  }, [])

  useEffect(() => {
    if (show) {
      if (!tinygrailStore.starLogs._loaded) handleHeaderRefresh()

      Animated.timing(x.current, {
        toValue: 1,
        duration: 160,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
      return
    }

    if (!show) {
      Animated.timing(x.current, {
        toValue: 0,
        duration: 160,
        useNativeDriver: USE_NATIVE_DRIVER
      }).start()
      return
    }
  }, [handleHeaderRefresh, show])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Portal>
        <Suspense>
          <Flex style={styles.logs} pointerEvents={show ? 'auto' : 'none'}>
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
              style={[
                styles.list,
                {
                  transform: [
                    {
                      translateX: x.current.interpolate({
                        inputRange: [0, 1],
                        outputRange: [DRAWER_WITDH, 0]
                      })
                    }
                  ]
                }
              ]}
            >
              <List
                navigation={navigation}
                onToggle={onToggle}
                onHeaderRefresh={handleHeaderRefresh}
                onFooterRefresh={handleFooterRefresh}
              />
            </Animated.View>
          </Flex>
        </Suspense>
      </Portal>
    )
  })
}

export default StarsLogs
