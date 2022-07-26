/*
 * @Author: czy0729
 * @Date: 2022-07-25 22:05:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-26 05:38:02
 */
import { Images, Navigation, SubjectId } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  hideScore: false as boolean,
  subjectId: 0 as SubjectId,
  name: '' as string,
  desc: '' as string,
  images: {} as Images,
  air: '' as string,
  timeCN: '2359' as string,
  expand: false as boolean,
  collection: undefined as string,
  score: 0 as number,
  onToggleExpand: (() => {}) as $['onToggleExpand'],
  onShowManageModal: (() => {}) as $['onShowManageModal']
}
