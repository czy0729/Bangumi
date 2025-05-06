/*
 * @Author: czy0729
 * @Date: 2022-09-10 08:07:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 15:49:34
 */
import { rc } from '@utils/dev'
import { Ctx } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'Today')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULTP_ROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  todayBangumi: [] as $['todayBangumi']
}
