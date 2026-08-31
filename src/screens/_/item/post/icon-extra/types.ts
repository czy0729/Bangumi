/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:07:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 04:09:13
 */
import type { BlogId, Id, Override, TopicId, ViewStyle } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Pick<ComponentProps, 'erase' | 'id' | 'replySub' | 'userId' | 'userName' | 'onJumpTo'>,
  {
    style: ViewStyle
    formhash: string
    likeType: string
    message?: ComponentProps['message']
    msg: string
    topicId: TopicId | BlogId
    onShowFixedTextare?: () => void
  }
>

export type Ctx = {
  $: {
    showFixedTextarea: (
      username: string,
      replySub: string,
      message: string,
      msg?: string
    ) => unknown
    showFixedTextareaEdit: (postId: Id, callback?: () => void, onJumpTo?: () => void) => unknown
    doDeleteReply: (url: string) => unknown
    doTranslateFloor: (floorId: Id, msg: string) => unknown
  }
}
