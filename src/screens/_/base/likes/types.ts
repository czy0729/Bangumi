/*
 * @Author: czy0729
 * @Date: 2023-04-05 14:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-02 05:53:24
 */
import { rakuenStore } from '@stores'
import { Fn, ViewStyle } from '@types'

type LikesList = ReturnType<typeof rakuenStore.likesList>

export type Props = {
  style?: ViewStyle

  /** 初始渲染是否显示全部 */
  show?: boolean

  /** 帖子 ID | mainId */
  topicId: string

  /** 楼层 ID | relatedId */
  id: string

  /** 操作凭证 */
  formhash: string

  /** 贴贴类型 */
  likeType: string

  /** 长按按钮 */
  onLongPress?: Fn

  /** Storybook 模拟数据 */
  storybook?: {
    likesList: LikesList
  }
}
