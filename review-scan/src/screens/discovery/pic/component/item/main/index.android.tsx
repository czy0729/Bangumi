/*
 * @Author: czy0729
 * @Date: 2025-06-18 03:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 03:23:09
 */
import React, { useCallback, useRef } from 'react'
import { findNodeHandle, Image, UIManager, View } from 'react-native'
import { Touchable } from '@components'
import { systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { getURI } from '../../../utils'
import { memoStyles } from './styles'

function Main({ width, height, data, image, onPress, onSelect }) {
  return useObserver(() => {
    const styles = memoStyles()
    const viewRef = useRef<View>(null)
    const handleLongPress = useCallback(() => {
      // @ts-expect-error
      UIManager.showPopupMenu(
        findNodeHandle(viewRef.current),
        systemStore.setting.s2t
          ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
          : data,
        FROZEN_FN,
        (_event: any, index: number) => onSelect(data[index])
      )
    }, [])
    return (
      <View>
        <View ref={viewRef} style={styles.overflowView} pointerEvents='none' />
        <Touchable style={styles.image} onPress={onPress} onLongPress={handleLongPress}>
          <Image
            width={width}
            height={height}
            fadeDuration={280}
            source={{
              uri: getURI(image)
            }}
          />
        </Touchable>
      </View>
    )
  })
}

export default Main
