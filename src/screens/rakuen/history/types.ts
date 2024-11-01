/*
 * @Author: czy0729
 * @Date: 2022-09-29 17:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-01 13:22:31
 */
import { factory } from '@utils'
import { Navigation, TopicId } from '@types'
import Store from './store'
import { DS } from './ds'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Types = (typeof DS)[number]

export type CollectRankItem = {
  topic_id: TopicId
  collect_count: number
}

export type CollectRankSort = '收藏数' | '最近'
