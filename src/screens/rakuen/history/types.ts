/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-01 18:22:39
 */
import type { Topic } from '@stores/rakuen/types'
import type { Override, TopicId, WithNavigation } from '@types'
import type Store from './store'
import type { DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Types = (typeof DS)[number]

export type CollectRankItem = {
  topic_id: TopicId
  collect_count: number
}

export type CollectRankSort = '收藏数' | '最近'

export type TopicItem = Override<
  Topic,
  {
    topicId: TopicId
  }
>
