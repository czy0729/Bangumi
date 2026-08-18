/*
 * @Author: czy0729
 * @Date: 2026-06-06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 22:18:55
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { IOS, PAD } from '@constants'
import MaskGradient from './gradient'
import { getMaskWidthValue } from './utils'
import { DEFAULT_MASK_WIDTH } from './ds'
import { styles } from './styles'

export { useMask } from './use-mask'

import type { Props } from './types'

/** 左右滚动遮罩容器 */
function Mask({
  showMask = true,
  maskWidth = DEFAULT_MASK_WIDTH,
  maskColors,
  leftMaskStyle,
  rightMaskStyle,
  onLayout,
  children
}: Props) {
  const maskWidthValue = getMaskWidthValue(maskWidth, {
    isPad: _.isPad,
    wind: _.wind,
    contentWind: _._wind,
    padMultiplier: PAD,
    isIOS: IOS
  })

  return (
    <View onLayout={onLayout}>
      {children}

      {showMask && (
        <>
          <MaskGradient
            positionStyle={styles.leftMask}
            animatedStyle={leftMaskStyle}
            colors={maskColors}
            width={maskWidthValue}
          />
          <MaskGradient
            positionStyle={styles.rightMask}
            animatedStyle={rightMaskStyle}
            colors={maskColors}
            width={maskWidthValue}
            reverse
          />
        </>
      )}
    </View>
  )
}

export default observer(Mask)
