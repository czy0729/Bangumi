/*
 * @Author: czy0729
 * @Date: 2023-04-05 14:59:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-05 15:03:45
 */
import { rakuenStore } from '@stores'
import { TopicId } from '@types'

type LikesList = ReturnType<typeof rakuenStore.likesList>

export type Props = {
  /** 初始渲染是否显示全部 */
  show?: boolean

  /** 帖子 ID */
  topicId: TopicId

  /** 楼层 ID */
  id: string | number

  /** 操作凭证 */
  formhash: string

  /** 贴贴类型 */
  likeType: string

  /** Storybook 模拟数据 */
  storybook?: {
    likesList: LikesList
  }
}
