/*
 * @Author: czy0729
 * @Date: 2022-08-25 23:36:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 23:38:49
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showCharacter: true as typeof systemStore.setting.showCharacter,
  subjectId: 0 as $['subjectId'],
  crt: [] as $['crt'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
