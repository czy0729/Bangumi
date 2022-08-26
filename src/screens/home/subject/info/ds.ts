/*
 * @Author: czy0729
 * @Date: 2022-08-26 00:59:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:01:40
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  styles: {} as ReturnType<typeof memoStyles>,
  subjectId: 0 as $['subjectId'],
  showInfo: true as typeof systemStore.setting.showInfo,
  info: '' as $['info'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
