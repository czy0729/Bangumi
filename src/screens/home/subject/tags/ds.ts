/*
 * @Author: czy0729
 * @Date: 2022-08-26 10:38:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 10:40:04
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  subjectType: '' as $['subjectType'],
  showTags: true as typeof systemStore.setting.showTags,
  tag: [] as $['collection']['tag'],
  tags: [] as $['tags'],
  animeTags: '' as $['animeInfo']['tags'],
  hentaiTags: [] as $['hentaiInfo']['tags'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
