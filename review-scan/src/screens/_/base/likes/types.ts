/*
 * @Author: czy0729
 * @Date: 2023-04-05 14:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-13 18:13:05
 */
import { rakuenStore } from '@stores'
import { Fn, Id, ViewStyle } from '@types'

type LikesList = ReturnType<typeof rakuenStore.likesList>

export type Props = {
  style?: ViewStyle

  /** 初始渲染是否显示全部 */
  show?: boolean

  /** 帖子 ID | mainId */
  topicId: Id

  /** 楼层 ID | relatedId */
  id: Id

  /** 操作凭证 */
  formhash?: string

  /** 贴贴类型 */
  likeType: Id

  /** 偏移值 */
  offsets?: {
    recommandPosition?: '' | 'top' | 'bottom'
    x?: number
    y?: number
  }

  /** 点击按钮 */
  onPress?: Fn

  /** 长按按钮 */
  onLongPress?: Fn

  /** Storybook 模拟数据 */
  storybook?: {
    likesList: LikesList
  }
}
