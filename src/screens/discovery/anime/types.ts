/*
 * @Author: czy0729
 * @Date: 2022-09-10 16:47:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-04 22:14:58
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

export type Params = {
  _tags?: string[] | string
}

export type TitleType = 'Anime' | '文库' | 'Manga' | '游戏' | 'ADV' | 'Hentai'
