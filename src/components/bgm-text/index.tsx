/*
 * @Author: czy0729
 * @Date: 2019-08-13 19:46:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-28 22:01:09
 */
import React, { useEffect, useMemo, useState } from 'react'
import { Text } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { subscribeClock } from './clock'
import { getBgmFrames, getBgmMiddleFrame } from './utils'
import { BGM_MAP, COMPONENT } from './ds'
import { styles } from './styles'

export { BGM_MAP }
export { BGM_MAP_DSM, BGM_MAP_CINNAMOR, BGM_MAP_VICKSCARLET, BGM_MAP_WUHANG } from './ds'
export { getBgmMiddleFrame, getBgmFontFamily } from './utils'

import type { Props as BgmTextProps } from './types'
export type { BgmTextProps }

/** BGM 表情已通过本地工具转换成一种字体，此组件为封装调用字体 */
export const BgmText = observer(
  ({
    style,
    index = 0,
    size = 14,
    selectable = false,
    lineHeight,
    animated = false,
    children,
    ...other
  }: BgmTextProps & { animated?: boolean }) => {
    r(COMPONENT)

    // 获取基础字符串 (raw)
    const raw = useMemo(() => {
      if (typeof children === 'string') return children
      const fallback = BGM_MAP[Number(index)] ?? ''
      return typeof fallback === 'string' ? fallback : ''
    }, [children, index])

    // 动画帧数组 (仅在需要动画时生成，节省内存)
    const frames = useMemo(() => {
      if (!animated || !raw) return []
      return getBgmFrames(raw)
    }, [raw, animated])

    // 全局心跳订阅
    const [tick, setTick] = useState(0)
    useEffect(() => {
      if (!animated || frames.length <= 1) return
      return subscribeClock(globalClock => setTick(globalClock))
    }, [animated, frames.length])

    // 内容计算
    const content = useMemo(() => {
      // 修正判断：只有当 children 确实是 React 元素(非空且非字符串)时才返回它
      if (children != null && typeof children !== 'string') return children

      // 静态模式：取中间帧，没有则兜底 raw
      if (!animated) return getBgmMiddleFrame(raw) || raw

      // 动画模式：
      if (frames.length <= 1) return raw

      const frameIndex = tick % frames.length
      return frames[frameIndex] || raw
    }, [children, animated, raw, frames, tick])

    return (
      <Text
        style={stl(
          styles.text,
          Number(index) >= 645 && styles.textMusume,
          Number(index) >= 724 && styles.textBlake,
          size && styles[size],
          lineHeight !== undefined && {
            lineHeight: Math.floor(
              lineHeight <= 2 ? lineHeight * size : lineHeight * _.lineHeightRatio
            )
          },
          style
        )}
        allowFontScaling={false}
        selectable={selectable}
        {...other}
      >
        {content}
      </Text>
    )
  }
)
