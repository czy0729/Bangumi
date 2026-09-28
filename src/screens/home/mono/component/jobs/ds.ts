/*
 * @Author: czy0729
 * @Date: 2022-07-19 17:09:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-28 21:45:59
 *
 * 参与制作区块常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { Navigation, ViewStyle } from '@types'
import type { Ctx } from '../../types'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Jobs')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as ViewStyle,
  jobs: [] as $['jobs']
}

export const EVENT = {
  id: '人物.跳转',
  data: {
    from: '出演'
  }
} as const
