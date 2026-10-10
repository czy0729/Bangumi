/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-10 11:00:00
 *
 * 页面上下文与数据模型
 */
import type { TopicId, WithNavigation } from '@types'
import type Store from './store'
import type { TYPE_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type DataItem = {
  /** 帖子 Id */
  topicId: TopicId

  /** 标题 */
  title: string

  /** 描述 */
  desc?: string

  /** 封面 */
  cover: string
}

export type Data = DataItem[]

export type Type = (typeof TYPE_DS)[number]
