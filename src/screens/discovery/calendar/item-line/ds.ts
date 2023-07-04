/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 14:18:53
 */
import { Images, Navigation, SubjectId } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  section: 0 as number,
  index: 0 as number,
  styles: {} as ReturnType<typeof memoStyles>,
  hideScore: false as boolean,
  subjectId: 0 as SubjectId,
  name: '' as string,
  desc: '' as string,
  images: {} as Images,
  air: '' as string,
  time: '2359' as string,
  expand: false as boolean,
  collection: undefined as string,
  rank: 0 as number,
  score: 0 as number,
  total: 0 as number,
  sites: {} as ReturnType<$['sites']>,
  onToggleExpand: (() => {}) as $['onToggleExpand']
}
