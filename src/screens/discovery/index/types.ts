/*
 * @Author: czy0729
 * @Date: 2022-09-09 20:13:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 18:46:06
 */
import { factory } from '@utils'
import { IconfontNames, Navigation, Paths } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type MenuItemType = {
  key: Paths | 'Open' | 'Netabare' | 'Link'
  name: string
  text?: string
  icon?: IconfontNames
  size?: number
  web?: boolean
  ios?: boolean
  login?: boolean
}

export type MenuMapType = Partial<Record<MenuItemType['key'], MenuItemType>>
