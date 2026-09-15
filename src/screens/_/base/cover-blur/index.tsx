/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 00:00:00
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { LinearGradient } from 'expo-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view'
import { _ } from '@stores'
import { r } from '@utils/dev'
import BlurImage from './blur-image'
import {
  ambientColorDark,
  ambientColorLight,
  ambientLocations,
  BLUR_RADIUS,
  COMPONENT,
  getBlurSrc,
  linearColor,
  maskColor,
  maskLocations,
  scrimColorDark,
  scrimColorLight,
  USE_MASK
} from './ds'
import { useCoverBlur } from './hooks'
import { styles } from './styles'

import type { Props } from './types'

/**
 * 封面底部的氛围色场
 *  - 用封面自身的颜色做出一团"颜色云", 得到 App Store 卡片底部颜色向下扩散的观感
 *  - 色场与封面同尺寸并按底部对齐后放大 (见 ds.BLUR_SCALE), 只露出卡片底部区域
 *  - 顶部由 MaskedView + 非线性渐变遮罩羽化消失 (USE_MASK, WEB 无实现时跳过), 融入上方清晰封面
 *  - 色场之上再叠「氛围层(更轻更高, 抹掉色场起止线)」与「文字黑罩(只在文字处压黑)」
 *  - 无封面或缩略图加载失败时, 回落到历史使用的纯黑渐变
 *  - 结构: 色场图的平台差异见 blur-image.*, 三层高度与兜底判定见 utils, 状态见 hooks
 * */
export const CoverBlur = observer(
  ({ src, cdn, width, height, blurHeight, scrimHeight, blurRadius = BLUR_RADIUS }: Props) => {
    r(COMPONENT)

    const { blurUri, handleError, layout } = useCoverBlur({
      src,
      blurSrc: getBlurSrc(src, cdn),
      height,
      blurHeight,
      scrimHeight
    })

    // 兜底: 无封面或色场图加载失败, 保持历史效果
    if (!blurUri) {
      return (
        <LinearGradient
          style={[styles.linear, { height: layout.scrim }]}
          colors={linearColor}
          pointerEvents='none'
        />
      )
    }

    const elBlur = (
      <BlurImage
        src={src}
        cdn={cdn}
        width={width}
        height={height}
        blurRadius={blurRadius}
        onError={handleError}
      />
    )

    return (
      <>
        <View style={[styles.blur, { height: layout.blur }]} pointerEvents='none'>
          {USE_MASK ? (
            <MaskedView
              style={styles.blurMask}
              maskElement={
                <LinearGradient
                  style={styles.blurFill}
                  colors={maskColor}
                  locations={maskLocations}
                />
              }
            >
              {elBlur}
            </MaskedView>
          ) : (
            elBlur
          )}
        </View>
        <LinearGradient
          style={[styles.ambient, { height: layout.ambient }]}
          colors={_.select(ambientColorLight, ambientColorDark)}
          locations={ambientLocations}
          pointerEvents='none'
        />
        <LinearGradient
          style={[styles.scrim, { height: layout.scrim }]}
          colors={_.select(scrimColorLight, scrimColorDark)}
          pointerEvents='none'
        />
      </>
    )
  }
)

export default CoverBlur
