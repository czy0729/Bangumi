/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:32:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:33:56
 */
import { systemStore } from '@stores'
import { StoreType as $ } from '../types'

export const DEFAULT_PROPS = {
  showSummary: true as typeof systemStore.setting.showSummary,
  translateResult: [] as $['state']['translateResult'],
  content: '' as $['summary'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
