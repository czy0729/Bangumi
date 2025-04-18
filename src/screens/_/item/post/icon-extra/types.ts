/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:07:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-16 09:16:32
 */
import { AnyObject, DeepPartial, Fn, TopicId } from '@types'

export type Props = AnyObject<{
  topicId: TopicId
}>

export type Ctx = DeepPartial<{
  $: {
    showFixedTextarea: Fn
    showFixedTextareaEdit: Fn
    doDeleteReply: Fn
    doTranslateFloor: Fn
  }
}>
