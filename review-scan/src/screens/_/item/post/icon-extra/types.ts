/*
 * @Author: czy0729
 * @Date: 2024-11-16 09:07:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 05:01:25
 */
import { AnyObject, BlogId, DeepPartial, Fn, TopicId } from '@types'

export type Props = AnyObject<{
  topicId: TopicId | BlogId
}>

export type Ctx = DeepPartial<{
  $: {
    showFixedTextarea: Fn
    showFixedTextareaEdit: Fn
    doDeleteReply: Fn
    doTranslateFloor: Fn
  }
}>
