/*
 * @Author: czy0729
 * @Date: 2022-07-19 17:09:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-20 14:33:15
 */
import { rc } from '@utils/dev'
import { Navigation, ViewStyle } from '@types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

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
