/*
 * @Author: czy0729
 * @Date: 2022-08-25 19:14:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-10 04:28:48
 */
import { rc } from '@utils/dev'
import { Navigation, ViewStyle } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

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
