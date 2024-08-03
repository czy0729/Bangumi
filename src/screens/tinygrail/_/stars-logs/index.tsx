/*
 * @Author: czy0729
 * @Date: 2024-03-10 03:49:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 12:52:36
 */
import React, { Suspense, useCallback, useEffect, useRef } from 'react'
import { Animated } from 'react-native'
import { Flex, Portal, Touchable } from '@components'
import { tinygrailStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { Fn } from '@types'
import List from './list'
import { COMPONENT, DRAWER_WITDH } from './ds'
import { memoStyles } from './styles'

function StarsLogs({ show, onToggle }: { show: boolean; onToggle: Fn }) {
  r(COMPONENT)

  const x = useRef(new Animated.Value(0))
  const onHeaderRefresh = useCallback(() => {
    return tinygrailStore.fetchStarLogs(1, 100)
  }, [])

  useEffect(() => {
    if (show) {
      if (!tinygrailStore.starLogs._loaded) onHeaderRefresh()

      Animated.timing(x.current, {
        toValue: 1,
        duration: 160,
        useNativeDriver: true
      }).start()
      return
    }

    if (!show) {
      Animated.timing(x.current, {
        toValue: 0,
        duration: 160,
        useNativeDriver: true
      }).start()
      return
    }
  }, [show])

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
              <List onHeaderRefresh={onHeaderRefresh} onToggle={onToggle} />
            </Animated.View>
          </Flex>
        </Suspense>
      </Portal>
    )
  })
}

export default StarsLogs
