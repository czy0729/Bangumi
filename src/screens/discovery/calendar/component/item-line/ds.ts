/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:59:22
 */
import { rc } from '@utils/dev'
import { FROZEN_FN } from '@constants'
import { SubjectId } from '@types'
import { StoreType as $ } from '../../types'
import { COMPONENT as PARENT } from '../ds'
import { memoStyles } from './styles'

export const COMPONENT = rc(PARENT, 'ItemList')

export const COMPONENT_MAIN = rc(COMPONENT)

export const DEFAULT_PROPS = {
  section: 0 as number,
  index: 0 as number,
  styles: {} as ReturnType<typeof memoStyles>,
  hideScore: false as boolean,
  subjectId: 0 as SubjectId,
  name: '' as string,
  desc: '' as string,
  image: '' as string,
  // air: '' as string,
  time: '2359' as string,
  prevTime: '' as string,
  expand: false as boolean,
  collection: undefined as string,
  rank: 0 as number,
  score: 0 as number,
  total: 0 as number,
  sites: {} as ReturnType<$['sites']>,
  onToggleExpand: FROZEN_FN as $['onToggleExpand']
}
