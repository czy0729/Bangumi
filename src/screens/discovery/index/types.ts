/*
 * @Author: czy0729
 * @Date: 2022-09-09 20:13:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-09 20:16:35
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

export type MenuItemType = {
  key: string
  name: string
  text?: string
  icon?: string
  size?: number
}
