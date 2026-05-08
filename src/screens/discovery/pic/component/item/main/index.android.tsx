/*
 * @Author: czy0729
 * @Date: 2025-06-18 03:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 21:16:04
 */
import React, { useCallback, useRef } from 'react'
import { findNodeHandle, Image, UIManager, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

import type { Props } from './types'

function Main({
  width,
  height,
  data,
  image,
  onPress,
  onSelect,
  onError
}: Props) {
  const viewRef = useRef<View>(null)

  const handleLongPress = useCallback(() => {
    if (!viewRef.current) return

    // @ts-ignore
    UIManager.showPopupMenu(
      findNodeHandle(viewRef.current),
      systemStore.setting.s2t
        ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
        : data,
      FROZEN_FN,
      (_event: any, index: number) => onSelect(data[index])
    )
  }, [data, onSelect])

  const handleError = useCallback(() => {
    onError?.()
  }, [onError])

  const styles = memoStyles()

  return (
    <View>
      <View ref={viewRef} style={styles.overflowView} pointerEvents='none' />

      <Touchable
        style={styles.image}
        onPress={onPress}
        onLongPress={handleLongPress}
        withoutFeedback
      >
        <Image
          style={{ width, height }}
          fadeDuration={280}
          source={{ uri: getURI(image) }}
          onError={handleError}
        />
      </Touchable>
    </View>
  )
}

export default observer(Main)
