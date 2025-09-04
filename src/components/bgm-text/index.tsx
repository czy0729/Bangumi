/*
 * @Author: czy0729
 * @Date: 2019-08-13 19:46:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-02 20:25:46
 */
import React, { useEffect, useMemo, useState } from 'react'
import { Text } from 'react-native'
import { useObserver } from 'mobx-react'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { BGM_MAP, COMPONENT } from './ds'
import { styles } from './styles'
import { Props as BgmTextProps } from './types'

export { BgmTextProps, BGM_MAP }

/** BGM 表情已通过本地工具转换成一种字体，此组件为封装调用字体 */
export const BgmText = ({
  style,
  index = 0,
  size = 14,
  selectable = false,
  lineHeight,
  children,
  ...other
}: BgmTextProps) => {
  r(COMPONENT)

  // 只在 children 为 string 时使用它，否则用 BGM_MAP[index]
  const raw = useMemo(() => {
    if (typeof children === 'string') return children

    const fallback = BGM_MAP[Number(index)] ?? ''
    return typeof fallback === 'string' ? fallback : ''
  }, [children, index])

  // 把连续的私有区字符拆成帧；不是私有区就当作单帧字符串
  const frames = useMemo(() => {
    const matches = raw.match(/[\ue000-\uf8ff]/g)
    return matches && matches.length > 0 ? matches : [raw]
  }, [raw])

  const [frameIndex, setFrameIndex] = useState(0)

  // 源发生变化时回到第一帧（不会创建定时器）
  useEffect(() => {
    setFrameIndex(0)
  }, [raw])

  // 只有多帧时才启动轮播；单帧情况下这里直接 return，不产生任何定时器
  useEffect(() => {
    if (frames.length <= 1) return

    const id = setInterval(() => {
      setFrameIndex(i => (i + 1) % frames.length)
    }, 200)
    return () => clearInterval(id)
  }, [frames])

  // 如果 children 不是字符串（例如传了 React 节点），就保持原样；否则显示当前帧
  const content = typeof children === 'string' || children == null ? frames[frameIndex] : children

  return useObserver(() => (
    <Text
      style={stl(
        styles.text,
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
  ))
}

export default BgmText
