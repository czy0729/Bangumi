/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:07:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-14 03:13:41
 */
import type { BlogId, Fn, Override, TopicId, ViewStyle } from '@types'
import type { Props as ComponentProps } from '../types'

export type Props = Override<
  Required<Pick<ComponentProps, 'erase' | 'id' | 'replySub' | 'userId' | 'userName' | 'onJumpTo'>>,
  {
    style: ViewStyle
    formhash: string
    likeType: string
    message?: ComponentProps['message']
    msg: string
    topicId: TopicId | BlogId
    onShowFixedTextare?: Fn
  }
>

export type Ctx = {
  $: {
    showFixedTextarea: Fn
    showFixedTextareaEdit: Fn
    doDeleteReply: Fn
    doTranslateFloor: Fn
  }
}
