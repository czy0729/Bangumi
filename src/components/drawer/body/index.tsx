/*
 * @Author: czy0729
 * @Date: 2026-11-13 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-13 12:00:00
 */
import { Animated, View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { DRAWER_WITDH } from '../ds'
import { useDrawerSwipe } from '../hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { BodyProps } from '../types'

/** 抽屉主体, 按方向从侧边滑入 */
function Body({
  style,
  progress,
  position = 'right',
  show,
  swipeToClose,
  onToggle,
  children
}: BodyProps) {
  r(COMPONENT)

  const styles = memoStyles()

  const swipeHandlers = useDrawerSwipe({ progress, show, position, onToggle, swipeToClose })

  return (
    <Animated.View
      style={stl(
        styles.body,
        {
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [position === 'left' ? -DRAWER_WITDH : DRAWER_WITDH, 0]
              })
            }
          ]
        },
        style
      )}
    >
      {children}
      {!!swipeHandlers && (
        <View
          style={stl(styles.swipe, position === 'left' ? styles.swipeRight : styles.swipeLeft)}
          {...swipeHandlers}
        >
          <View
            style={stl(
              styles.swipeHandle,
              position === 'left' ? styles.swipeHandleRight : styles.swipeHandleLeft
            )}
          />
        </View>
      )}
    </Animated.View>
  )
}

export default observer(Body)
