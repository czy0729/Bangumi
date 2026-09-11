/*
 * @Author: czy0729
 * @Date: 2026-03-18 05:09:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-11 00:00:00
 */
import { WEB } from '@constants'
import { FLEX_MAP } from './ds'

import type { ViewStyle } from 'react-native'
import type { FlexItemStyleParams, FlexStyleParams } from './types'

export const getFlexValue = (val: string | undefined) => (val ? FLEX_MAP[val] || val : val)

/**
 * Flex 布局样式
 *  - 业务层可直接展开到任意组件的 style 上, 避免为了写 flex 多套一层 View
 *  - WEB 差异 (zIndex / wrap 时的 maxWidth) 内部处理, 业务层不出现平台判断
 * */
export function flexStyle({
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  align = 'center'
}: FlexStyleParams = {}): ViewStyle {
  const style: ViewStyle = {
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: getFlexValue(justify) as ViewStyle['justifyContent'],
    alignItems: getFlexValue(align) as ViewStyle['alignItems']
  }

  if (WEB) {
    // @ts-ignore: WEB 环境下的特殊兼容
    style.zIndex = 'unset'
    if (wrap === 'wrap') style.maxWidth = '100%'
  }

  return style
}

/** Flex.Item 样式 (WEB 差异内部处理) */
export function flexItemStyle({ flex = 1 }: FlexItemStyleParams = {}): ViewStyle {
  const style: ViewStyle = { flex }

  if (WEB) {
    // @ts-ignore: WEB 环境下的特殊兼容
    style.width = '100%'
  }

  return style
}
