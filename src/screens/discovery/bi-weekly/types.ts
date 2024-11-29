/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-30 04:05:28
 */
import { factory } from '@utils'
import { Navigation, TopicId } from '@types'
import Store from './store'
import { TYPE_DS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Data = {
  topicId: TopicId
  title: string
  desc?: string
  cover: string
}[]

export type Type = (typeof TYPE_DS)[number]
