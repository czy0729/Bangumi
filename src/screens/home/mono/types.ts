/*
 * @Author: czy0729
 * @Date: 2022-07-19 15:51:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-21 02:01:20
 */
import { factory } from '@utils'
import { Navigation, MonoId } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  monoId: MonoId
  _name: string
  _jp: string
  _image: string
}
