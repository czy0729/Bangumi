/*
 * @Author: czy0729
 * @Date: 2019-05-05 02:45:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-09 19:46:47
 */
import React, { useCallback, useRef } from 'react'
import { findNodeHandle, UIManager, View } from 'react-native'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { Touchable } from '../../touchable'
import { styles } from './styles'

import type { Fn } from '@types'

function Popover({
  data = [],
  style,
  hitSlop,
  activateOn = 'tap',
  onSelect = FROZEN_FN,
  onLongPress = FROZEN_FN,
  children
}) {
  const anchorRef = useRef<View>(null)

  const handlePopover = useCallback(
    (evt: any) => {
      const node = findNodeHandle(anchorRef.current)
      if (!node) return

      const snapshot = data.slice()
      const labels = systemStore.setting.s2t ? snapshot.map((item: string) => s2t(item)) : snapshot

      // @ts-expect-error
      UIManager.showPopupMenu(node, labels, FROZEN_FN, (_: any, index: string) => {
        const i = Number(index)
        if (!Number.isNaN(i)) onSelect(snapshot[i], i, evt)
      })
    },
    [data, onSelect]
  )

  let delayPressIn: number | undefined
  let handlePress: Fn | undefined
  let handleLongPress: Fn | undefined

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
