/*
 * @Author: czy0729
 * @Date: 2022-07-21 19:50:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-24 10:10:17
 */
import { Rank } from '@stores/tag/types'
import { factory } from '@utils'
import { Navigation, Override } from '@types'
import Store from './store'

const f = factory(Store)

export type StoreType = typeof f

export type Ctx = {
  $: StoreType
  navigation?: Navigation
}

export type ToolBarKeys = 'list' | 'fixed' | 'fixedPagination' | 'collected'

export type StoreRank = Override<
  Rank,
  {
    _filter?: number
  }
>
