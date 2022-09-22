/*
 * @Author: czy0729
 * @Date: 2022-09-11 16:37:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 23:05:50
 */
import { factory } from '@utils'
import { Navigation } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type OTAItemType = {
  id: number
  mid: number
  title: string
  image: string
  score: number
  rank: number
  total: number
  sub: string
  ep: string
  author: string
  status: string
  cates: string
  publish: string
  update: string
  mScore: number
  mTotal: number
  subscribe: number
  favor: number
  read: number
  hot: number
}
