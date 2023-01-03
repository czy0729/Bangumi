/*
 * @Author: czy0729
 * @Date: 2022-08-25 23:36:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-03 19:59:53
 */
import { systemStore } from '@stores'
import { Navigation } from '@types'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  navigation: {} as Navigation,
  showCharacter: true as typeof systemStore.setting.showCharacter,
  subjectId: 0 as $['subjectId'],
  crt: [] as $['crt'],
  crtCounts: {} as Record<string, number>,
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
