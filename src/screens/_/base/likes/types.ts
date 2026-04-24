/*
 * @Author: czy0729
 * @Date: 2023-04-05 14:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-23 22:12:27
 */
import type { rakuenStore } from '@stores'
import type { BlogId, Fn, Id, SubjectId, TopicId, ViewStyle } from '@types'

type LikesList = ReturnType<typeof rakuenStore.likesList>

export type Props = {
  style?: ViewStyle

  /** 初始渲染是否显示全部 */
  show?: boolean

  /** 是否显示创建贴贴的按钮 */
  showCreate?: boolean

  /** 帖子 ID | mainId */
  topicId: TopicId | BlogId | SubjectId

  /** 楼层 ID | relatedId */
  id: Id

  /** 操作凭证 */
  formhash?: string

  /** 贴贴类型 */
  likeType: Id

  /** 默认显示贴贴数量 */
  limit?: number

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
