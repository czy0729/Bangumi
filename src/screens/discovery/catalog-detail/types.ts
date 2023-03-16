/*
 * @Author: czy0729
 * @Date: 2022-08-26 14:15:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 15:49:25
 */
import { CatalogDetail } from '@stores/discovery/types'
import { factory } from '@utils'
import { Id, InferArray, Navigation, Override } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type Params = {
  catalogId: Id
  _hideScore?: boolean
}

export type ListItem = Override<
  InferArray<CatalogDetail['list']>,
  {
    score?: number | string
    rank?: number | string
    total?: number | string
  }
>

export type List = ListItem[]
