/*
 * @Author: czy0729
 * @Date: 2022-08-26 09:22:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 09:29:22
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  subjectId: 0 as $['subjectId'],
  showRecent: true as typeof systemStore.setting.showRecent,
  who: [] as $['subjectFormHTML']['who'],
  hideScore: false as $['hideScore'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
