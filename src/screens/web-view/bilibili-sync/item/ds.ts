/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:18:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 15:51:44
 */
import { FROZEN_FN } from '@constants'
import { InferArray, Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const BILIBILI_STATUS = {
  1: '想看',
  2: '在看',
  3: '看过'
} as const

export const HIT_SLOP = {
  top: 4,
  right: 20,
  bottom: 4,
  left: 20
} as const

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  item: {} as InferArray<$['data']>,
  review: {} as ReturnType<$['review']>,
  collection: {} as ReturnType<$['collection']>,
  hideSame: false as $['state']['hideSame'],
  onRefreshCollection: FROZEN_FN as $['onRefreshCollection'],
  onBottom: FROZEN_FN as $['onBottom'],
  onSubmit: FROZEN_FN as $['onSubmit']
}
