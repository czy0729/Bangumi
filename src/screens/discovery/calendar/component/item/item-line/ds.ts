/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-21 16:30:10
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

import type { SubjectId } from '@types'
import type { Ctx } from '../../../types'
import type { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'ItemList')

export const COMPONENT_MAIN = rc(COMPONENT)

type $ = Ctx['$']

export const DEFAULT_PROPS = {
  index: 0 as number,
  styles: {} as ReturnType<typeof memoStyles>,
  hideScore: false as boolean,
  subjectId: 0 as SubjectId,
  name: '' as string,
  desc: '' as string,
  image: '' as string,
  time: '2359' as string,
  prevTime: '' as string,
  expand: false as boolean,
  collection: undefined as string,
  rank: 0 as number,
  score: 0 as number,
  total: 0 as number,
  sites: {} as ReturnType<$['sites']>
}
