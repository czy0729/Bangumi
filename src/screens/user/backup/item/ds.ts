/*
 * @Author: czy0729
 * @Date: 2022-09-29 19:18:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-08 14:31:01
 */
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
  imports: [] as $['state']['imports'],
  review: {} as ReturnType<$['review']>,
  collection: {} as ReturnType<$['collection']>,
  hideSame: false as $['state']['hideSame'],
  onRefreshCollection: (() => {}) as $['onRefreshCollection'],
  onBottom: (() => {}) as $['onBottom'],
  onSubmit: (() => {}) as unknown as $['onSubmit']
}
