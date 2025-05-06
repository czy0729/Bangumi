/*
 * @Author: czy0729
 * @Date: 2022-09-09 21:53:58
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-04 15:41:45
 */
import { _ } from '@stores'
import { rc } from '@utils/dev'
import { SubjectType, ViewStyle } from '@types'
import { Ctx } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'ListItem')

export const COMPONENT_MAIN = rc(COMPONENT)

export const INITIAL_RENDER_NUMS_SM = _.device(Math.floor(_.window.contentWidth / 140) + 1, 0)

export const ITEM_HEIGHT = 800

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  style: {} as ViewStyle,
  index: 0 as number,
  type: 'anime' as SubjectType,
  list: [] as any[],
  friendsChannel: [] as ReturnType<$['friendsChannel']>
}
