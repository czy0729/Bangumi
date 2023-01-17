/*
 * @Author: czy0729
 * @Date: 2022-08-26 01:32:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-18 02:26:55
 */
import { systemStore } from '@stores'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showSummary: true as typeof systemStore.setting.showSummary,
  translateResult: [] as $['state']['translateResult'],
  content: '' as $['summary'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
