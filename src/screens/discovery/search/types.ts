/*
 * @Author: czy0729
 * @Date: 2022-07-30 13:08:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-30 13:32:35
 */
import { factory } from '@utils'
import { Navigation, SearchCat } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  type?: SearchCat
  value?: string
  _type?: SearchCat
  _value?: string
}
