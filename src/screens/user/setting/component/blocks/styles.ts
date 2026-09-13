/*
 * @Author: czy0729
 * @Date: 2023-12-11 19:57:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 00:26:59
 */
import { _ } from '@stores'

/**
 * 面板内容容器
 *  - 卡片自身两翼是 wind, 面板内收窄到 _._wind, 让卡片不贴面板边缘
 *  - 分组标题 (Tip) 的水平内边距是 wind + _wind, 抵消后正好与卡片内行文字对齐
 * */
export const memoStyles = _.memoStyles(() => ({
  container: {
    marginHorizontal: -(_.wind - _._wind)
  }
}))
