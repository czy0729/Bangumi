/*
 * @Author: czy0729
 * @Date: 2025-06-18 03:19:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:55:42
 */
import { useCallback, useRef } from 'react'
import { findNodeHandle, Image as RNImage, UIManager, View } from 'react-native'
import { observer } from 'mobx-react'
import { Touchable } from '@components'
import { systemStore } from '@stores'
import { s2t } from '@utils/thirdParty/open-cc'
import { FROZEN_FN } from '@constants'
import { getURI } from '../../../utils'
import { styles } from './styles'

import type { Props } from './types'

function Main({ width, height, data, image, onPress, onSelect, onError }: Props) {
  const viewRef = useRef<View>(null)

  const handleLongPress = useCallback(() => {
    if (!viewRef.current) return

    // 部分安卓环境(新架构 / 定制 ROM)没有此 API, 缺失时静默降级, 避免抛 undefined is not a function
    if (typeof UIManager.showPopupMenu !== 'function') return

    UIManager.showPopupMenu(
      findNodeHandle(viewRef.current),
      systemStore.setting.s2t
        ? data.map((item: string) => (typeof item === 'string' ? s2t(item) : item))
        : data,
      FROZEN_FN,
      (_event, index) => {
        const i = Number(index)
        if (!Number.isNaN(i)) onSelect(data[i])
      }
    )
  }, [data, onSelect])

  const handleError = useCallback(() => {
    onError?.()
  }, [onError])

  return (
    <View>
      <View ref={viewRef} style={styles.overflowView} pointerEvents='none' />
      <Touchable
        style={styles.image}
        onPress={onPress}
        onLongPress={handleLongPress}
        withoutFeedback
      >
        <RNImage
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
