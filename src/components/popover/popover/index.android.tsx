/*
 * @Author: czy0729
 * @Date: 2019-05-05 02:45:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 03:38:26
 */
import React, { useCallback, useRef } from 'react'
import { findNodeHandle, UIManager, View } from 'react-native'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { Touchable } from '../../touchable'
import { styles } from './styles'

import type { GestureResponderEvent, TouchableWithoutFeedbackProps } from 'react-native'
import type { ViewStyle } from '@types'
import type { TouchableHandlePress, TouchablePressEvent } from '../../touchable'

function Popover({
  data = [],
  style,
  hitSlop,
  activateOn = 'tap',
  onSelect = FROZEN_FN,
  onLongPress = FROZEN_FN,
  children
}: {
  data?: string[]
  style?: ViewStyle
  hitSlop?: Record<'top' | 'right' | 'bottom' | 'left', number>
  activateOn?: 'tap' | 'hold'
  onSelect?: (title?: string, index?: number, evt?: { pageX?: number; pageY?: number }) => void
  onLongPress?: TouchableWithoutFeedbackProps['onLongPress']
  children?: React.ReactNode
}) {
  const anchorRef = useRef<View>(null)

  const handlePopover = useCallback(
    (evt: GestureResponderEvent | TouchablePressEvent) => {
      const node = findNodeHandle(anchorRef.current)
      if (!node) return

      const snapshot = data.slice()
      const labels = systemStore.setting.s2t ? snapshot.map((item: string) => s2t(item)) : snapshot

      /**
       * RN 类型定义缺失的 Android 原生弹窗 API
       * https://github.com/facebook/react-native/blob/main/Libraries/ReactNative/UIManager.js
       * */
      const UIManagerWithPopupMenu = UIManager as typeof UIManager & {
        showPopupMenu: (
          tag: number,
          items: string[],
          error: () => void,
          success: (item: string, index: number | string) => void
        ) => void
      }
      UIManagerWithPopupMenu.showPopupMenu(node, labels, FROZEN_FN, (_, index) => {
        const i = Number(index)
        if (!Number.isNaN(i)) onSelect(snapshot[i], i, evt as { pageX?: number; pageY?: number })
      })
    },
    [data, onSelect]
  )

  let delayPressIn: number | undefined
  let handlePress: TouchableHandlePress | undefined
  let handleLongPress: TouchableWithoutFeedbackProps['onLongPress']

  if (activateOn === 'hold') {
    handleLongPress = handlePopover
  } else {
    delayPressIn = 1600
    handlePress = handlePopover
    handleLongPress = onLongPress
  }

  return (
    <View>
      <View ref={anchorRef} style={styles.anchor} pointerEvents='none' />
      <Touchable
        style={style}
        hitSlop={hitSlop}
        delayPressIn={delayPressIn}
        onPress={handlePress}
        onLongPress={handleLongPress}
      >
        {children}
      </Touchable>
    </View>
  )
}

export default Popover
