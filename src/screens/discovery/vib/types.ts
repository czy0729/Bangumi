/*
 * @Author: czy0729
 * @Date: 2024-05-04 18:23:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-02 10:22:09
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

export type ItemNew = {
  id: string
  title: string
  rating?: string
  value1?: string
  value2?: string
}

export type ItemTrend = {
  id: string
  title: string
  value?: string
}

export type Data = {
  title: string
  desc: string
  data: {
    title: string
    data: (ItemNew | ItemTrend)[]
  }[]
}[]
