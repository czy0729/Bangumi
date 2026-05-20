/*
 * @Author: czy0729
 * @Date: 2026-05-21 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-21 01:30:00
 */
import React, { useCallback, useRef } from 'react'
import { findNodeHandle, UIManager, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import Content from '../content'

import type { Props } from './types'

function Main({ userId, avatar, name, filter, menuData, onPress, onSelect }: Props) {
  const viewRef = useRef<View>(null)

  const handleLongPress = useCallback(() => {
    if (!viewRef.current || !menuData) return

    const snapshot = menuData.slice()
    const labels = systemStore.setting.s2t ? snapshot.map((title: string) => s2t(title)) : snapshot

    // @ts-expect-error
    UIManager.showPopupMenu(
      findNodeHandle(viewRef.current),
      labels,
      FROZEN_FN,
      (_event: any, index: number | string) => {
        const i = Number(index)
        if (!Number.isNaN(i)) onSelect(snapshot[i])
      }
    )
  }, [menuData, onSelect])

  const elContent = <Content userId={userId} avatar={avatar} name={name} filter={filter} />

  if (menuData) {
    return (
      <View>
        <View ref={viewRef} pointerEvents='none' />

        <Touchable animate scale={0.9} onPress={onPress} onLongPress={handleLongPress}>
          {elContent}
        </Touchable>
      </View>
    )
  }

  return (
    <Touchable animate scale={0.9} onPress={onPress}>
      {elContent}
    </Touchable>
  )
}

export default observer(Main)
