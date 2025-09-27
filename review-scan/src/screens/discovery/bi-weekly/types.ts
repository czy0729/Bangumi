/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 06:50:45
 */
import { TopicId, WithNavigation } from '@types'
import Store from './store'
import { TYPE_DS } from './ds'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type Data = {
  topicId: TopicId
  title: string
  desc?: string
  cover: string
}[]

export type Type = (typeof TYPE_DS)[number]
