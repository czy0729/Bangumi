/*
 * @Author: czy0729
 * @Date: 2026-08-31 06:58:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:32:12
 */
import type { ViewStyle } from 'react-native'
import type { CutList } from '../../types'

export type Props = {
  /** 分词列表 */
  list: CutList

  /** 容器宽高 (由上层 observer 传入, 主题变化时随引用更新) */
  container: {
    width: number
    height: number
  }

  /** 词云外间距 */
  style: ViewStyle

  /** 是否用户收藏模式 */
  isCollection: boolean

  /** 词点击回调 */
  onPress: (title: string) => void
}
