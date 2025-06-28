/*
 * @Author: czy0729
 * @Date: 2022-09-09 20:13:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 18:46:06
 */
import { IconfontNames, Paths, WithNavigation } from '@types'
import Store from './store'

export type Ctx = WithNavigation<{
  $: InstanceType<typeof Store>
}>

export type MenuItemType = {
  key: Paths | 'Open' | 'Netabare' | 'Split' | 'Link' | 'Cancel' | 'Save'
  name: string
  text?: string
  icon?: IconfontNames
  size?: number
  web?: boolean
  ios?: boolean
  login?: boolean
}

export type MenuMapType = Partial<Record<MenuItemType['key'], MenuItemType>>
