/*
 * @Author: czy0729
 * @Date: 2022-07-18 17:25:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-03 15:06:08
 */
import { factory } from '@utils'
import { Navigation, TopicId, UserId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  topicId: TopicId
  _title?: string
  _avatar?: string
  _userId?: UserId
  _userName?: string
  _desc?: string
  _group?: string
  _groupThumb?: string
  _url?: string
  _noFetch?: boolean
  _replies?: string
}

export type FilterType = '' | 'likes' | 'me' | 'friends'
