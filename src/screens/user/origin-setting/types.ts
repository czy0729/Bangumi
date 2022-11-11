/*
 * @Author: czy0729
 * @Date: 2022-08-19 07:13:07
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-19 07:13:07
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

export type Keys = 'anime' | 'hanime' | 'manga' | 'wenku' | 'music' | 'game' | 'real'
