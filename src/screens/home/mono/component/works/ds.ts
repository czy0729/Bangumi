/*
 * @Author: czy0729
 * @Date: 2022-08-25 19:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 21:46:43
 *
 * 相关作品区块常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Navigation, ViewStyle } from '@types'
import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Works')

export const COMPONENT_MAIN = rc(COMPONENT)

export const EVENT = {
  id: '人物.跳转',
  data: {
    from: '最近参与'
  }
} as const

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as ViewStyle,
  works: [] as $['works']
}
