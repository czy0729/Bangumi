/*
 * @Author: czy0729
 * @Date: 2022-08-03 10:31:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-16 13:50:12
 */
import { systemStore } from '@stores'
import { StoreType as $ } from '../types'
import { memoStyles } from './styles'

export const DEFAULT_PROPS = {
  styles: {} as ReturnType<typeof memoStyles>,
  showComment: true as typeof systemStore.setting.showComment,
  commentLength: 0 as $['commentLength'],
  onSwitchBlock: (() => {}) as $['onSwitchBlock']
}
