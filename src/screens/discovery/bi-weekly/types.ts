/*
 * @Author: czy0729
 * @Date: 2024-05-14 06:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-19 22:48:52
 */
import { factory } from '@utils'
import { Navigation, TopicId } from '@types'
import Store from './store'

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
