/*
 * @Author: czy0729
 * @Date: 2022-08-26 11:22:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-15 18:33:00
 */
import { systemStore } from '@stores'
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'
type $ = Ctx['$']

export const COMPONENT = rc(PARENT, 'Ep')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  watchedEps: '0' as $['state']['watchedEps'],
  totalEps: '0' as $['subjectFormHTML']['totalEps'],
  onAirCustom: {} as $['onAirCustom'],
  status: {
    name: '未收藏'
  } as $['collection']['status'],
  isDoing: false as boolean,
  showEpInput: true as typeof systemStore.setting.showEpInput,
  showCustomOnair: true as typeof systemStore.setting.showCustomOnair,
  focusOrigin: false as typeof systemStore.setting.focusOrigin,
  onChangeText: FROZEN_FN as $['changeText'],
  onScrollIntoViewIfNeeded: FROZEN_FN as (y: number) => any,
  doUpdateSubjectEp: FROZEN_FN as $['doUpdateSubjectEp']
}

export const WEEK_DAY_DS = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'] as const

export const WEEK_DAY_MAP = {
  0: '周日',
  1: '周一',
  2: '周二',
  3: '周三',
  4: '周四',
  5: '周五',
  6: '周六',
  7: '周日'
} as const

export const HOUR_DS = [
  '20',
  '21',
  '22',
  '23',
  '00',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19'
] as const

export const MINUTE_DS = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55'
] as const
