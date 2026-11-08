/*
 * @Author: czy0729
 * @Date: 2022-10-17 00:02:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-07 20:30:00
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import type { InferArray, Navigation } from '@types'
import { COMPONENT as PARENT } from '../ds'
import type { memoStyles } from './styles'

import type { Ctx } from '../../types'

export const COMPONENT = rc(PARENT, 'Item')

export const BILIBILI_STATUS: Record<number, '想看' | '在看' | '看过'> = {
  1: '想看',
  2: '在看',
  3: '看过'
}

export const HIT_SLOP = {
  top: 4,
  right: 20,
  bottom: 4,
  left: 20
} as const

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  item: {} as InferArray<$['data']>,
  collection: {} as ReturnType<$['collection']>,
  totalEps: '' as string,
  hideSame: false as $['state']['hideSame'],
  noCommentUseCreateDate: false as $['state']['noCommentUseCreateDate'],
  scoreMinuesOne: false as $['state']['scoreMinuesOne'],
  onRefreshCollection: FROZEN_FN as $['onRefreshCollection'],
  onBottom: FROZEN_FN as $['onBottom'],
  onSubmit: FROZEN_FN as $['onSubmit']
}
